import { NextResponse } from "next/server";
import { getPosterBrowser } from "@/lib/poster-browser";
import { getArtistBySlug } from "@/data/artists";
import { events } from "@/data/events";
import { POSTER_SIZES, type PosterFormat } from "@/components/poster/band-poster";

// Puppeteer needs the Node runtime; never cache (params drive the output).
// maxDuration gives headless Chrome room to cold-start on Vercel (Pro+; Hobby
// caps at 10s, which can be tight for the first render).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const KINDS = ["band", "dagur", "forsida"] as const;
const VARIANTS = ["mynd", "typo", "klassik"] as const;
const FORMATS = ["a3", "p45", "story", "square", "fbcover", "fbpage"] as const;
const EXTS = { pdf: "application/pdf", jpeg: "image/jpeg", png: "image/png" } as const;

type Kind = (typeof KINDS)[number];
type Ext = keyof typeof EXTS;

function pick<T extends readonly string[]>(list: T, v: string | null, fallback: T[number]): T[number] {
  return (list as readonly string[]).includes(v ?? "") ? (v as T[number]) : fallback;
}

/** Resolve the bare capture route + download filename for a poster request. */
function resolveTarget(kind: Kind, id: string): { rawPath: string; fileBase: string } | null {
  if (kind === "forsida") return { rawPath: "/plakat/forsida/raw", fileBase: "rokk-forsida" };
  if (kind === "dagur") {
    const n = Number(id);
    if (!Number.isInteger(n) || n < 1 || n > events.length) return null;
    return { rawPath: `/plakat/dagur/${n}/raw`, fileBase: `rokk-dagur-${n}` };
  }
  const artist = getArtistBySlug(id);
  if (!artist) return null;
  return { rawPath: `/plakat/${artist.slug}/raw`, fileBase: `rokk-${artist.slug}` };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const kind = pick(KINDS, url.searchParams.get("kind"), "band") as Kind;
  const id = url.searchParams.get("id") ?? url.searchParams.get("band") ?? "";
  const variant = pick(VARIANTS, url.searchParams.get("utgafa"), kind === "forsida" ? "typo" : "mynd");
  const format = pick(FORMATS, url.searchParams.get("snid"), "a3") as PosterFormat;
  const theme = url.searchParams.get("thema") === "svart" ? "svart" : "bleikt";
  const ext = pick(Object.keys(EXTS) as Ext[], url.searchParams.get("ext"), "pdf") as Ext;

  const target = resolveTarget(kind, id);
  if (!target) return NextResponse.json({ error: "Óþekkt plakat" }, { status: 404 });

  const size = POSTER_SIZES[format];
  // Print formats upscale for DPI; the large landscape FB formats capture at
  // native size (already 1640–1920px wide). PDF is vector regardless.
  const scaleFactor = size.w > size.h ? 1 : format === "a3" ? 3 : 2;

  const rawUrl = `${url.origin}${target.rawPath}?utgafa=${variant}&snid=${format}&thema=${theme}`;

  let browser;
  try {
    browser = await getPosterBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: scaleFactor });
    await page.goto(rawUrl, { waitUntil: "networkidle0", timeout: 30_000 });
    // Ensure web fonts and any photos have painted before capture.
    await page.evaluate(async () => {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      const imgs = Array.from(document.images);
      await Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    });

    let body: Uint8Array<ArrayBuffer>;
    if (ext === "pdf") {
      body = new Uint8Array(
        await page.pdf({ width: `${size.w}px`, height: `${size.h}px`, printBackground: true, pageRanges: "1" })
      );
    } else {
      const el = await page.$("[data-poster]");
      const shot = await (el ?? page).screenshot({ type: ext, ...(ext === "jpeg" ? { quality: 92 } : {}) });
      body = new Uint8Array(shot);
    }

    return new NextResponse(body, {
      headers: {
        "Content-Type": EXTS[ext],
        "Content-Disposition": `attachment; filename="${target.fileBase}-${variant}-${format}.${ext}"`,
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
