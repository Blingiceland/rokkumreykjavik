/**
 * Band poster — a shareable, downloadable gig poster for a single act, in the
 * site's silkscreen language. Rendered as real DOM (fonts + SVG filters +
 * blend modes) so headless Chrome can capture it pixel-perfect.
 *
 * Everything sizes in container-query units (cqw/cqh) so one layout adapts to
 * every format. The poster root sets `container-type: size`.
 */
import * as React from "react";
import type { Artist } from "@/data/artists";
import { getEventByDate, getScheduleTime, dayNumberForDate } from "@/data/events";
import { venue, presenterPartner, site, EVENT_YEAR } from "@/data/site";
import { PosterFilters, PosterGrain, PosterHalftone, plate, xerox } from "./poster-filters";

export type PosterVariant = "mynd" | "typo" | "klassik";
export type PosterFormat = "a3" | "story" | "square";
export type PosterTheme = "bleikt" | "svart";

/** Display pixel sizes. Headless capture multiplies these via deviceScaleFactor
 * for print resolution, so these stay screen-friendly. */
export const POSTER_SIZES: Record<PosterFormat, { w: number; h: number; label: string }> = {
  a3: { w: 794, h: 1123, label: "A3 · prent (2:3)" },
  story: { w: 720, h: 1280, label: "Story · 9:16" },
  square: { w: 1080, h: 1080, label: "Square · 1:1" },
};

export const POSTER_VARIANTS: Record<PosterVariant, string> = {
  mynd: "Mynd-þung",
  typo: "Týpó-þung",
  klassik: "Klassík plakat",
};

function hasPhoto(image: string): boolean {
  return Boolean(image) && !image.includes("placeholder");
}

function nameCase(a: Artist): string {
  return a.keepCase ? "normal-case" : "uppercase";
}

/** Largest cqw font size at which the longest word still fits the poster width.
 * Archivo Black is wide (~0.82em/char caps); 80 leaves room for box padding. */
function fitSize(name: string, maxCqw: number): number {
  const longest = Math.max(...name.split(/\s+/).map((w) => w.length), 1);
  return Math.min(maxCqw, Math.floor(80 / (longest * 0.82)));
}

/** Festival facts derived for one band. */
function useBandFacts(artist: Artist) {
  const event = getEventByDate(artist.date);
  const time = event ? getScheduleTime(event, artist.id) : "";
  const dayNum = dayNumberForDate(artist.date);
  return { time, dayNum, displayDate: artist.displayDate };
}

export function BandPoster({
  artist,
  variant = "mynd",
  format = "a3",
  theme = "bleikt",
}: {
  artist: Artist;
  variant?: PosterVariant;
  format?: PosterFormat;
  theme?: PosterTheme;
}) {
  const size = POSTER_SIZES[format];
  return (
    <div
      data-poster
      data-look={theme === "svart" ? "svart" : undefined}
      className="relative overflow-hidden bg-base text-bone"
      style={{ width: size.w, height: size.h, containerType: "size" }}
    >
      <PosterFilters />
      {variant === "mynd" && <MyndPoster artist={artist} />}
      {variant === "typo" && <TypoPoster artist={artist} />}
      {variant === "klassik" && <KlassikPoster artist={artist} />}
      <PosterHalftone className="z-40 opacity-[0.18]" />
      <PosterGrain />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function FestivalKicker() {
  return (
    <p className="font-display uppercase leading-none tracking-tight" style={{ fontSize: "3.1cqw" }}>
      {site.name} <span className="text-neon">{EVENT_YEAR}</span>
    </p>
  );
}

function FactStrip({ artist }: { artist: Artist }) {
  const { time, dayNum, displayDate } = useBandFacts(artist);
  return (
    <p className="font-mono uppercase leading-none tracking-[0.15em]" style={{ fontSize: "2.3cqw" }}>
      Dagur {dayNum} · {displayDate} {EVENT_YEAR} · kl. {time} · {venue.shortName} · Ókeypis inn
    </p>
  );
}

function PresenterLine() {
  return (
    <p className="font-mono uppercase leading-none tracking-[0.2em] text-bone-dim" style={{ fontSize: "1.9cqw" }}>
      {site.presenter} í samstarfi við {presenterPartner}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Variant 1 — Mynd-þung (photo-led)                                   */
/* ------------------------------------------------------------------ */

function MyndPoster({ artist }: { artist: Artist }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        {hasPhoto(artist.image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artist.image}
            alt={artist.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: artist.imagePosition }}
          />
        ) : (
          <div className="h-full w-full bg-base-deep" />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-base/10" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-base/80 to-transparent" />
      </div>

      {/* Top kicker */}
      <div className="relative z-10 flex items-start justify-between p-[5cqw]">
        <FestivalKicker />
        <span
          className="rotate-2 bg-neon px-[1.6cqw] py-[1cqw] font-display uppercase leading-none text-[color:rgb(var(--c-base))]"
          style={{ ...plate("rgb(var(--c-bone))"), fontSize: "2.4cqw" }}
        >
          Ókeypis
        </span>
      </div>

      {/* Name + facts pinned bottom */}
      <div className="relative z-10 mt-auto flex flex-col gap-[2.5cqw] p-[5cqw]">
        <span
          className="-rotate-1 self-start bg-bone px-[2cqw] py-[1cqw] font-mono uppercase leading-none tracking-[0.2em] text-[color:rgb(var(--c-base))]"
          style={{ ...xerox, fontSize: "2.2cqw" }}
        >
          spilar á
        </span>
        <h1
          className={"font-display leading-[0.82] " + nameCase(artist)}
          style={{ fontSize: `${fitSize(artist.name, 20)}cqw` }}
        >
          {artist.name}
        </h1>
        <div className="mt-[1cqw] flex flex-col gap-[1.4cqw] border-t-[0.4cqw] border-bone pt-[2.4cqw]">
          <FactStrip artist={artist} />
          <PresenterLine />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Variant 2 — Týpó-þung (type-led, paper ground)                      */
/* ------------------------------------------------------------------ */

function TypoPoster({ artist }: { artist: Artist }) {
  const { time, displayDate, dayNum } = useBandFacts(artist);
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-[6cqw]">
      <PosterHalftone className="z-0 opacity-[0.25]" />

      <div className="relative z-10 flex items-start justify-between">
        <FestivalKicker />
        <p className="text-right font-mono uppercase leading-tight tracking-[0.15em]" style={{ fontSize: "2.3cqw" }}>
          Dagur {dayNum}
          <br />
          {displayDate} {EVENT_YEAR}
        </p>
      </div>

      {/* Giant ransom-note name */}
      <h1 className={"relative z-10 font-display leading-[0.8] " + nameCase(artist)} style={{ fontSize: `${fitSize(artist.name, 24)}cqw` }}>
        <span className="-rotate-1 inline-block bg-bone px-[2cqw] text-[color:rgb(var(--c-base))]" style={plate("rgb(var(--c-neon))")}>
          {artist.name}
        </span>
      </h1>

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-[3cqw]">
        <div className="flex flex-col gap-[1.6cqw]">
          <span
            className="rotate-1 self-start bg-neon px-[2cqw] py-[1cqw] font-display uppercase leading-none text-[color:rgb(var(--c-base))]"
            style={{ ...plate("rgb(var(--c-amber))"), fontSize: "3.4cqw" }}
          >
            kl. {time} · {venue.shortName}
          </span>
          <PresenterLine />
        </div>
        <span
          className="-rotate-2 border-[0.4cqw] border-bone px-[2cqw] py-[1cqw] font-display uppercase leading-none"
          style={{ ...xerox, fontSize: "3.4cqw" }}
        >
          Ókeypis inn
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Variant 3 — Klassík plakat (framed bill)                            */
/* ------------------------------------------------------------------ */

function KlassikPoster({ artist }: { artist: Artist }) {
  return (
    <div className="absolute inset-[3cqw] flex flex-col border-[0.6cqw] border-bone">
      {/* Header band */}
      <div className="flex items-center justify-between border-b-[0.4cqw] border-bone bg-bone px-[3cqw] py-[2cqw] text-[color:rgb(var(--c-base))]">
        <p className="font-display uppercase leading-none tracking-tight" style={{ fontSize: "3.4cqw" }}>
          {site.name} {EVENT_YEAR}
        </p>
        <p className="font-mono uppercase tracking-[0.15em]" style={{ fontSize: "2cqw" }}>
          Ókeypis inn
        </p>
      </div>

      {/* Photo */}
      <div className="relative flex-1 overflow-hidden">
        {hasPhoto(artist.image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artist.image}
            alt={artist.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: artist.imagePosition }}
          />
        ) : (
          <div className="h-full w-full bg-base-deep" />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
        <span
          className="absolute bottom-[2cqw] left-[2cqw] rotate-1 bg-neon px-[1.6cqw] py-[0.8cqw] font-mono uppercase leading-none tracking-[0.2em] text-[color:rgb(var(--c-base))]"
          style={{ fontSize: "2cqw" }}
        >
          spilar á
        </span>
      </div>

      {/* Name + facts footer */}
      <div className="flex flex-col gap-[2cqw] border-t-[0.4cqw] border-bone px-[3cqw] py-[3cqw]">
        <h1
          className={"font-display leading-[0.82] " + nameCase(artist)}
          style={{ fontSize: `${fitSize(artist.name, 14)}cqw` }}
        >
          {artist.name}
        </h1>
        <FactStrip artist={artist} />
        <PresenterLine />
      </div>
    </div>
  );
}
