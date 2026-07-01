import Link from "next/link";
import { Download } from "lucide-react";
import { BackLink } from "./back-link";
import {
  POSTER_SIZES,
  POSTER_VARIANTS,
  POSTER_THEMES,
  PORTRAIT_FORMATS,
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
  const format: PosterFormat = Object.prototype.hasOwnProperty.call(POSTER_SIZES, search.snid ?? "")
    ? (search.snid as PosterFormat)
    : "a3";
  const theme: PosterTheme = Object.prototype.hasOwnProperty.call(POSTER_THEMES, search.thema ?? "")
    ? (search.thema as PosterTheme)
    : "bleikt";
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
  variantLabels = POSTER_VARIANTS,
  formats = PORTRAIT_FORMATS,
}: {
  title: string;
  subtitle: string;
  values: PosterValues;
  /** e.g. "/api/plakat?kind=band&id=the-vintage-caravan" — ext is appended. */
  downloadBase: string;
  shareNote: string;
  preview: React.ReactNode;
  /** Per-poster variant labels (the front poster names them differently). */
  variantLabels?: Record<PosterVariant, string>;
  /** Which size pills to offer (front adds the landscape fb* formats). */
  formats?: PosterFormat[];
}) {
  const { variant, format, theme } = values;
  const base = { utgafa: variant, snid: format, thema: theme } as Record<string, string>;
  const dl = (ext: string) => `${downloadBase}&utgafa=${variant}&snid=${format}&thema=${theme}&ext=${ext}`;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <BackLink />

        <h1 className="mt-4 font-display text-4xl uppercase leading-none text-bone sm:text-6xl">{title}</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-bone-dim">{subtitle}</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            <Control label="Útgáfa">
              {(Object.keys(variantLabels) as PosterVariant[]).map((v) => (
                <Pill key={v} base={base} current={variant} param="utgafa" value={v} label={variantLabels[v]} />
              ))}
            </Control>
            <Control label="Snið">
              {formats.map((f) => (
                <Pill key={f} base={base} current={format} param="snid" value={f} label={POSTER_SIZES[f].label} />
              ))}
            </Control>
            <Control label="Þema">
              {(Object.keys(POSTER_THEMES) as PosterTheme[]).map((t) => (
                <Pill key={t} base={base} current={theme} param="thema" value={t} label={POSTER_THEMES[t]} />
              ))}
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
