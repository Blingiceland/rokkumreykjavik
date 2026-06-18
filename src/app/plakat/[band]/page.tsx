import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { getArtistBySlug, artists } from "@/data/artists";
import {
  BandPoster,
  POSTER_SIZES,
  POSTER_VARIANTS,
  type PosterVariant,
  type PosterFormat,
  type PosterTheme,
} from "@/components/poster/band-poster";

export function generateStaticParams() {
  return artists.map((a) => ({ band: a.slug }));
}

type Search = { utgafa?: string; snid?: string; thema?: string };

function coerce(search: Search) {
  const variant: PosterVariant = (["mynd", "typo", "klassik"] as const).includes(search.utgafa as PosterVariant)
    ? (search.utgafa as PosterVariant)
    : "mynd";
  const format: PosterFormat = (["a3", "story", "square"] as const).includes(search.snid as PosterFormat)
    ? (search.snid as PosterFormat)
    : "a3";
  const theme: PosterTheme = search.thema === "svart" ? "svart" : "bleikt";
  return { variant, format, theme };
}

/** A control pill that swaps one query param while preserving the rest. */
function Pill({
  base,
  current,
  param,
  value,
  label,
}: {
  base: Record<string, string>;
  current: string;
  param: string;
  value: string;
  label: string;
}) {
  const qs = new URLSearchParams({ ...base, [param]: value }).toString();
  const active = current === value;
  return (
    <Link
      href={`?${qs}`}
      scroll={false}
      className={
        "border-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors " +
        (active ? "border-neon bg-neon text-[color:rgb(var(--c-base))]" : "border-bone text-bone hover:bg-base-card")
      }
    >
      {label}
    </Link>
  );
}

export default function BandPosterPage({
  params,
  searchParams,
}: {
  params: { band: string };
  searchParams: Search;
}) {
  const artist = getArtistBySlug(params.band);
  if (!artist) notFound();

  const { variant, format, theme } = coerce(searchParams);
  const base = { utgafa: variant, snid: format, thema: theme } as Record<string, string>;
  const size = POSTER_SIZES[format];

  // Scale the true-size poster down to fit the preview column.
  const previewW = 360;
  const scale = previewW / size.w;

  const dl = (ext: string) =>
    `/api/plakat?band=${artist.slug}&utgafa=${variant}&snid=${format}&thema=${theme}&ext=${ext}`;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/#dagskra" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-dim hover:text-neon">
          <ArrowLeft size={14} /> Dagskrá
        </Link>

        <h1 className={"mt-4 font-display text-4xl leading-none text-bone sm:text-6xl " + (artist.keepCase ? "normal-case" : "uppercase")}>
          Plakat — {artist.name}
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-bone-dim">
          {artist.displayDate} · Veldu útgáfu, snið og þema — sæktu svo sem PDF, JPEG eða PNG.
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto]">
          {/* Controls */}
          <div className="flex flex-col gap-6">
            <Control label="Útgáfa">
              {(Object.keys(POSTER_VARIANTS) as PosterVariant[]).map((v) => (
                <Pill key={v} base={base} current={variant} param="utgafa" value={v} label={POSTER_VARIANTS[v]} />
              ))}
            </Control>

            <Control label="Snið">
              {(Object.keys(POSTER_SIZES) as PosterFormat[]).map((f) => (
                <Pill key={f} base={base} current={format} param="snid" value={f} label={POSTER_SIZES[f].label} />
              ))}
            </Control>

            <Control label="Þema">
              <Pill base={base} current={theme} param="thema" value="bleikt" label="Bleikt" />
              <Pill base={base} current={theme} param="thema" value="svart" label="Svart" />
            </Control>

            <Control label="Sækja">
              <DownloadLink href={dl("pdf")} label="PDF" />
              <DownloadLink href={dl("jpeg")} label="JPEG" />
              <DownloadLink href={dl("png")} label="PNG" />
            </Control>

            <p className="max-w-xs font-mono text-[11px] leading-relaxed text-bone-faint">
              Hlekkurinn á þessa síðu er deilanlegur — sendu hann á bandið og þau geta sótt sitt eigið plakat.
            </p>
          </div>

          {/* Preview */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="shrink-0 border-2 border-bone"
              style={{ width: size.w * scale, height: size.h * scale }}
            >
              <div style={{ width: size.w, height: size.h, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <BandPoster artist={artist} variant={variant} format={format} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neon">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function DownloadLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 border-2 border-bone bg-bone px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:rgb(var(--c-base))] transition-colors hover:bg-neon hover:border-neon"
    >
      <Download size={13} /> {label}
    </a>
  );
}
