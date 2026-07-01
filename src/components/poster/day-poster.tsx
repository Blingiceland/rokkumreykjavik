/**
 * Day poster — the full bill for one Saturday, in the site's silkscreen
 * language. Same capture pipeline as the band poster (full DOM → headless
 * Chrome). Sizes in container-query units so one layout fits every format.
 */
import * as React from "react";
import type { RokkEvent } from "@/data/events";
import { getEventArtists, getScheduleTime, dayNumberForDate } from "@/data/events";
import { venue, presenterPartner, site, EVENT_YEAR } from "@/data/site";
import { PosterFilters, PosterGrain, PosterHalftone, plate, xerox } from "./poster-filters";
import { PosterSponsorTop, PosterSponsorBottom } from "./poster-sponsors";
import type { PosterVariant, PosterFormat, PosterTheme } from "./band-poster";
import { POSTER_SIZES, posterLook } from "./band-poster";

function hasPhoto(image: string): boolean {
  return Boolean(image) && !image.includes("placeholder");
}

/** Font size (cqw) so the longest band name fits one bill line. The divisor
 * leaves room for the time column + gap on the line (else long names clip). */
function billNameSize(names: string[]): number {
  const longest = Math.max(...names.map((n) => n.length), 1);
  return Math.min(9, Math.floor(60 / (longest * 0.62)));
}

export function DayPoster({
  event,
  variant = "mynd",
  format = "a3",
  theme = "bleikt",
}: {
  event: RokkEvent;
  variant?: PosterVariant;
  format?: PosterFormat;
  theme?: PosterTheme;
}) {
  const size = POSTER_SIZES[format];
  return (
    <div
      data-poster
      data-look={posterLook(theme)}
      className="relative flex flex-col overflow-hidden bg-base text-bone"
      style={{ width: size.w, height: size.h, containerType: "size" }}
    >
      <PosterFilters />
      <PosterSponsorTop theme={theme} />
      <div className="relative flex-1 overflow-hidden">
        {variant === "mynd" && <MyndDay event={event} />}
        {variant === "typo" && <TypoDay event={event} />}
        {variant === "klassik" && <KlassikDay event={event} />}
      </div>
      <PosterSponsorBottom theme={theme} />
      <PosterHalftone className="z-40 opacity-[0.16]" />
      <PosterGrain />
    </div>
  );
}

/* Shared header + bill bits ----------------------------------------- */

function DayHead({ event }: { event: RokkEvent }) {
  const n = dayNumberForDate(event.date);
  const date = event.displayDate.replace("Laugardagur ", "");
  return (
    <div className="flex items-start justify-between">
      <p className="font-display uppercase leading-none tracking-tight" style={{ fontSize: "3.1cqw" }}>
        {site.name} <span className="text-neon">{EVENT_YEAR}</span>
      </p>
      <p className="text-right font-mono uppercase leading-tight tracking-[0.15em]" style={{ fontSize: "2.3cqw" }}>
        Dagur {n}
        <br />
        {date} {EVENT_YEAR}
      </p>
    </div>
  );
}

function BillList({ event, accent = false }: { event: RokkEvent; accent?: boolean }) {
  const lineup = getEventArtists(event);
  const fs = billNameSize(lineup.map((a) => a.name));
  return (
    <ul className="flex flex-col gap-[1.6cqw]">
      {lineup.map((a, i) => (
        <li key={a.id} className="flex items-baseline gap-[2.5cqw]">
          <span
            className={"shrink-0 font-display tabular-nums leading-none " + (accent && i === 0 ? "text-neon" : "")}
            style={{ fontSize: `${fs * 0.85}cqw` }}
          >
            {getScheduleTime(event, a.id)}
          </span>
          <span
            className={"font-display leading-none " + (a.keepCase ? "normal-case" : "uppercase")}
            style={{ fontSize: `${fs}cqw` }}
          >
            {a.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FooterFacts() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-[2cqw]">
      <p className="font-mono uppercase leading-none tracking-[0.18em]" style={{ fontSize: "2cqw" }}>
        {venue.name} · Ókeypis inn · Klukkutími á milli banda
      </p>
      <p className="font-mono uppercase leading-none tracking-[0.18em] text-bone-dim" style={{ fontSize: "1.8cqw" }}>
        {site.presenter} í samstarfi við {presenterPartner}
      </p>
    </div>
  );
}

/* Variant 1 — headliner photo + bill ------------------------------- */

function MyndDay({ event }: { event: RokkEvent }) {
  const headliner = getEventArtists(event)[0];
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative h-[46%] overflow-hidden">
        {headliner && hasPhoto(headliner.image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={headliner.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: headliner.imagePosition }} />
        ) : (
          <div className="h-full w-full bg-base-deep" />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-base/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-[5cqw]">
          <DayHead event={event} />
          <span
            className="-rotate-1 self-start bg-neon px-[2cqw] py-[1cqw] font-display uppercase leading-none text-[color:rgb(var(--c-base))]"
            style={{ ...plate("rgb(var(--c-bone))"), fontSize: "5cqw" }}
          >
            Dagur {dayNumberForDate(event.date)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-[5cqw]">
        <BillList event={event} accent />
        <div className="border-t-[0.4cqw] border-bone pt-[2.4cqw]">
          <FooterFacts />
        </div>
      </div>
    </div>
  );
}

/* Variant 2 — type-led bill ---------------------------------------- */

function TypoDay({ event }: { event: RokkEvent }) {
  const n = dayNumberForDate(event.date);
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-[6cqw]">
      <PosterHalftone className="z-0 opacity-[0.22]" />
      <div className="relative z-10">
        <DayHead event={event} />
      </div>

      <h1 className="relative z-10 font-display uppercase leading-[0.82]" style={{ fontSize: "21cqw" }}>
        <span className="-rotate-1 inline-block bg-bone px-[2cqw] text-[color:rgb(var(--c-base))]" style={plate("rgb(var(--c-neon))")}>
          Dagur {n}
        </span>
      </h1>

      <div className="relative z-10">
        <BillList event={event} accent />
      </div>

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-[3cqw]">
        <span
          className="-rotate-1 bg-neon px-[2cqw] py-[1cqw] font-display uppercase leading-none text-[color:rgb(var(--c-base))]"
          style={{ ...plate("rgb(var(--c-amber))"), fontSize: "3cqw" }}
        >
          {venue.shortName} · Ókeypis inn
        </span>
        <p className="text-right font-mono uppercase leading-none tracking-[0.18em] text-bone-dim" style={{ fontSize: "1.8cqw" }}>
          {site.presenter}
          <br />í samstarfi við {presenterPartner}
        </p>
      </div>
    </div>
  );
}

/* Variant 3 — framed bill ------------------------------------------ */

function KlassikDay({ event }: { event: RokkEvent }) {
  const headliner = getEventArtists(event)[0];
  const date = event.displayDate.replace("Laugardagur ", "");
  return (
    <div className="absolute inset-[3cqw] flex flex-col border-[0.6cqw] border-bone">
      <div className="flex items-center justify-between border-b-[0.4cqw] border-bone bg-bone px-[3cqw] py-[2cqw] text-[color:rgb(var(--c-base))]">
        <p className="font-display uppercase leading-none tracking-tight" style={{ fontSize: "3.4cqw" }}>
          {site.name} {EVENT_YEAR}
        </p>
        <p className="font-mono uppercase tracking-[0.15em]" style={{ fontSize: "2cqw" }}>
          Dagur {dayNumberForDate(event.date)} · {date}
        </p>
      </div>

      <div className="relative h-[38%] overflow-hidden border-b-[0.4cqw] border-bone">
        {headliner && hasPhoto(headliner.image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={headliner.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: headliner.imagePosition }} />
        ) : (
          <div className="h-full w-full bg-base-deep" />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between px-[3cqw] py-[3cqw]">
        <BillList event={event} accent />
        <div className="border-t-[0.4cqw] border-bone pt-[2cqw]">
          <FooterFacts />
        </div>
      </div>
    </div>
  );
}
