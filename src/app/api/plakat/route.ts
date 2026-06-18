import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getArtistBySlug } from "@/data/artists";
import { POSTER_SIZES, type PosterFormat } from "@/components/poster/band-poster";

// Puppeteer needs the Node runtime; never cache (params drive the output).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VARIANTS = ["mynd", "typo", "klassik"] as const;
const FORMATS = ["a3", "story", "square"] as const;
const EXTS = { pdf: "application/pdf", jpeg: "image/jpeg", png: "image/png" } as const;

type Ext = keyof typeof EXTS;

function pick<T extends readonly string[]>(list: T, v: string | null, fallback: T[number]): T[number] {
  return (list as readonly string[]).includes(v ?? "") ? (v as T[number]) : fallback;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("band") ?? "";
  const artist = getArtistBySlug(slug);
  if (!artist) return NextResponse.json({ error: "Óþekkt band" }, { status: 404 });

  const variant = pick(VARIANTS, url.searchParams.get("utgafa"), "mynd");
  const format = pick(FORMATS, url.searchParams.get("snid"), "a3") as PosterFormat;
  const theme = url.searchParams.get("thema") === "svart" ? "svart" : "bleikt";
  const ext = pick(Object.keys(EXTS) as Ext[], url.searchParams.get("ext"), "pdf") as Ext;

  const size = POSTER_SIZES[format];
  // High DPI for print/raster; vector PDF is resolution-independent.
  const scaleFactor = format === "a3" ? 3 : 2;

  const rawUrl = `${url.origin}/plakat/${artist.slug}/raw?utgafa=${variant}&snid=${format}&thema=${theme}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: scaleFactor });
    await page.goto(rawUrl, { waitUntil: "networkidle0", timeout: 30_000 });
    // Make sure web fonts and the band photo have painted.
    await page.evaluate(async () => {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })))
      );
    });

    const fileBase = `rokk-${artist.slug}-${variant}-${format}`;
    let body: Uint8Array<ArrayBuffer>;

    if (ext === "pdf") {
      body = new Uint8Array(
        await page.pdf({
          width: `${size.w}px`,
          height: `${size.h}px`,
          printBackground: true,
          pageRanges: "1",
        })
      );
    } else {
      const el = await page.$("[data-poster]");
      const shot = await (el ?? page).screenshot({
        type: ext,
        ...(ext === "jpeg" ? { quality: 92 } : {}),
      });
      body = new Uint8Array(shot);
    }

    return new NextResponse(body, {
      headers: {
        "Content-Type": EXTS[ext],
        "Content-Disposition": `attachment; filename="${fileBase}.${ext}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[plakat] export failed", err);
    return NextResponse.json({ error: "Tókst ekki að búa til plakat" }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
