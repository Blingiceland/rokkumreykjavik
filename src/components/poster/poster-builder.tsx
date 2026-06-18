import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import {
  POSTER_SIZES,
  POSTER_VARIANTS,
  type PosterVariant,
  type PosterFormat,
  type PosterTheme,
} from "./band-poster";

export type PosterValues = { variant: PosterVariant; format: PosterFormat; theme: PosterTheme };

/** Parse + clamp the shared poster query params. `defaultVariant` sets the
 * look when none is in the URL (e.g. the front poster leads with the full bill). */
export function coercePosterValues(
  search: { utgafa?: string; snid?: string; thema?: string },
  defaultVariant: PosterVariant = "mynd"
): PosterValues {
  const variant: PosterVariant = (["mynd", "typo", "klassik"] as const).includes(search.utgafa as PosterVariant)
    ? (search.utgafa as PosterVariant)
    : defaultVariant;
  const format: PosterFormat = (["a3", "story", "square"] as const).includes(search.snid as PosterFormat)
    ? (search.snid as PosterFormat)
    : "a3";
  const theme: PosterTheme = search.thema === "svart" ? "svart" : "bleikt";
  return { variant, format, theme };
}

function Pill({ base, current, param, value, label }: {
  base: Record<string, string>; current: string; param: string; value: string; label: string;
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
      className="inline-flex items-center gap-2 border-2 border-bone bg-bone px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:rgb(var(--c-base))] transition-colors hover:border-neon hover:bg-neon"
    >
      <Download size={13} /> {label}
    </a>
  );
}

/**
 * Shared poster builder chrome: controls (variant/format/theme), download
 * buttons (PDF/JPEG/PNG) and a slot for the scaled preview. Works for band,
 * day and front-page posters — only the title, download base and preview differ.
 */
export function PosterBuilder({
  title,
  subtitle,
  values,
  downloadBase,
  shareNote,
  preview,
}: {
  title: string;
  subtitle: string;
  values: PosterValues;
  /** e.g. "/api/plakat?kind=band&id=vintage-caravan" — ext is appended. */
  downloadBase: string;
  shareNote: string;
  preview: React.ReactNode;
}) {
  const { variant, format, theme } = values;
  const base = { utgafa: variant, snid: format, thema: theme } as Record<string, string>;
  const dl = (ext: string) => `${downloadBase}&utgafa=${variant}&snid=${format}&thema=${theme}&ext=${ext}`;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/#dagskra" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-dim hover:text-neon">
          <ArrowLeft size={14} /> Dagskrá
        </Link>

        <h1 className="mt-4 font-display text-4xl uppercase leading-none text-bone sm:text-6xl">{title}</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-bone-dim">{subtitle}</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto]">
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
            <p className="max-w-xs font-mono text-[11px] leading-relaxed text-bone-faint">{shareNote}</p>
          </div>

          <div className="flex justify-center lg:justify-end">{preview}</div>
        </div>
      </div>
    </main>
  );
}

/** A true-size poster scaled down to fit the preview column. */
export function PosterPreview({ format, children }: { format: PosterFormat; children: React.ReactNode }) {
  const size = POSTER_SIZES[format];
  const previewW = 360;
  const scale = previewW / size.w;
  return (
    <div className="shrink-0 border-2 border-bone" style={{ width: size.w * scale, height: size.h * scale }}>
      <div style={{ width: size.w, height: size.h, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
