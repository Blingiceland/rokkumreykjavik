/**
 * Front-page poster — the whole festival on one sheet: four Saturdays, every
 * band, the Thule presenter lockup. Same capture pipeline as the other posters.
 */
import * as React from "react";
import { events, getEventArtists } from "@/data/events";
import { artists } from "@/data/artists";
import { venue, presenterPartner, site, EVENT_YEAR } from "@/data/site";
import { getEventDays } from "@/data/events";
import { PosterFilters, PosterGrain, PosterHalftone, plate, xerox } from "./poster-filters";
import { PosterSponsorTop, PosterSponsorBottom } from "./poster-sponsors";
import type { PosterVariant, PosterFormat, PosterTheme } from "./band-poster";
import { POSTER_SIZES } from "./band-poster";

function hasPhoto(image: string): boolean {
  return Boolean(image) && !image.includes("placeholder");
}

export function FrontPoster({
  variant = "typo",
  format = "a3",
  theme = "bleikt",
}: {
  variant?: PosterVariant;
  format?: PosterFormat;
  theme?: PosterTheme;
}) {
  const size = POSTER_SIZES[format];
  return (
    <div
      data-poster
      data-look={theme === "svart" ? "svart" : undefined}
      className="relative flex flex-col overflow-hidden bg-base text-bone"
      style={{ width: size.w, height: size.h, containerType: "size" }}
    >
      <PosterFilters />
      <PosterSponsorTop />
      <div className="relative flex-1 overflow-hidden">
        {variant === "mynd" && <MyndFront />}
        {variant === "typo" && <TypoFront />}
        {variant === "klassik" && <AllBandsFront format={format} />}
      </div>
      <PosterSponsorBottom />
      <PosterHalftone className="z-40 opacity-[0.16]" />
      <PosterGrain />
    </div>
  );
}

/* Shared bits ------------------------------------------------------- */

function TitleBlock({ small = false }: { small?: boolean }) {
  return (
    <div className="flex flex-col gap-[1.5cqw]">
      <p className="font-mono uppercase leading-none tracking-[0.2em] text-bone-dim" style={{ fontSize: "1.9cqw" }}>
        {site.presenter} í samstarfi við {presenterPartner} kynna
      </p>
      <h1 className="font-display uppercase leading-[0.82]" style={{ fontSize: small ? "11cqw" : "13cqw" }}>
        <span className="-rotate-1 inline-block bg-bone px-[1.6cqw] text-[color:rgb(var(--c-base))]" style={plate("rgb(var(--c-neon))")}>
          Rokk
        </span>{" "}
        <span className="rotate-1 inline-block bg-neon px-[1.6cqw] text-[color:rgb(var(--c-base))]" style={plate("rgb(var(--c-neon-cyan))")}>
          í
        </span>{" "}
        <span className="-rotate-1 inline-block border-[0.4cqw] border-bone px-[1.6cqw]" style={xerox}>
          Reykjavík
        </span>
      </h1>
    </div>
  );
}

function DatesStrip() {
  return (
    <div className="flex flex-wrap items-center gap-[2cqw]">
      <span className="-rotate-1 bg-amber px-[2cqw] py-[1cqw] font-display uppercase leading-none text-[color:rgb(var(--c-base))]" style={{ ...xerox, fontSize: "3.4cqw" }}>
        {getEventDays().join("·")} júlí {EVENT_YEAR}
      </span>
      <span className="rotate-1 bg-neon px-[2cqw] py-[1cqw] font-display uppercase leading-none text-[color:rgb(var(--c-base))]" style={{ ...plate("rgb(var(--c-bone))"), fontSize: "3.4cqw" }}>
        Ókeypis inn
      </span>
    </div>
  );
}

function DayColumn({ idx }: { idx: number }) {
  const event = events[idx];
  const date = event.displayDate.replace("Laugardagur ", "");
  const lineup = getEventArtists(event);
  return (
    <div className="flex flex-col gap-[1cqw] border-t-[0.4cqw] border-bone pt-[1.4cqw]">
      <p className="font-mono uppercase leading-none tracking-[0.15em] text-neon" style={{ fontSize: "1.9cqw" }}>
        Dagur {idx + 1} · {date}
      </p>
      <ul className="flex flex-col gap-[0.5cqw]">
        {lineup.map((a, i) => (
          <li
            key={a.id}
            className={"font-display leading-[0.95] " + (a.keepCase ? "normal-case" : "uppercase")}
            style={{ fontSize: i === 0 ? "4.6cqw" : "3cqw" }}
          >
            {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Variant 1 — photo grid of the four headliners -------------------- */

function MyndFront() {
  const headliners = events.map((e) => getEventArtists(e)[0]);
  return (
    <div className="absolute inset-0">
      <div className="grid h-full w-full grid-cols-2 grid-rows-2">
        {headliners.map((a, i) => (
          <div key={i} className="relative overflow-hidden">
            {a && hasPhoto(a.image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.image} alt="" className="h-full w-full object-cover opacity-90" style={{ objectPosition: a.imagePosition }} />
            ) : (
              <div className="h-full w-full bg-base-deep" />
            )}
          </div>
        ))}
      </div>
      <span aria-hidden className="absolute inset-0 bg-base/55" />
      <div className="absolute inset-0 flex flex-col justify-between p-[6cqw]">
        <TitleBlock />
        <DatesStrip />
        <div className="grid grid-cols-2 gap-x-[4cqw] gap-y-[3cqw]">
          {events.map((_, i) => (
            <DayColumn key={i} idx={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Variant 2 — type-led full bill ----------------------------------- */

function TypoFront() {
  return (
    <div className="absolute inset-0 flex flex-col gap-[4cqw] p-[6cqw]">
      <PosterHalftone className="z-0 opacity-[0.2]" />
      <div className="relative z-10">
        <TitleBlock />
      </div>
      <div className="relative z-10">
        <DatesStrip />
      </div>
      <div className="relative z-10 grid flex-1 grid-cols-2 gap-x-[5cqw] gap-y-[3cqw] content-start">
        {events.map((_, i) => (
          <DayColumn key={i} idx={i} />
        ))}
      </div>
      <p className="relative z-10 font-mono uppercase leading-none tracking-[0.18em] text-bone-dim" style={{ fontSize: "1.9cqw" }}>
        {venue.name} · {venue.streetAddress} · {site.domain}
      </p>
    </div>
  );
}

/* Variant 3 — every band billed equally (all headliners) ----------- */

/** The wall scales with the format's aspect ratio: cqw is width-based, but it is
 * vertical room (17 names) that runs out first, so taller formats can go bigger. */
const WALL_FS: Record<PosterFormat, number> = { a3: 5.7, p45: 5.0, story: 6.6, square: 3.9 };

function AllBandsFront({ format }: { format: PosterFormat }) {
  const fs = WALL_FS[format];
  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqw] p-[6cqw]">
      <PosterHalftone className="z-0 opacity-[0.2]" />
      <div className="relative z-10 flex flex-col gap-[2cqw]">
        <TitleBlock />
        <DatesStrip />
      </div>

      {/* Wall of names — no hierarchy, everyone billed the same size. */}
      <div className="relative z-10 flex flex-1 flex-wrap content-center items-baseline gap-x-[2.5cqw] gap-y-[0.5cqw]">
        {artists.map((a, i) => (
          <span key={a.id} className="inline-flex items-baseline gap-x-[2.5cqw]">
            <span
              className={"font-display leading-[0.86] " + (a.keepCase ? "normal-case" : "uppercase")}
              style={{ fontSize: `${fs}cqw` }}
            >
              {a.name}
            </span>
            {i < artists.length - 1 && (
              <span className="font-display leading-[0.86] text-neon" style={{ fontSize: `${fs}cqw` }}>
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      <p className="relative z-10 font-mono uppercase leading-none tracking-[0.18em] text-bone-dim" style={{ fontSize: "1.9cqw" }}>
        {venue.name} · {venue.streetAddress} · Ókeypis inn · {site.domain}
      </p>
    </div>
  );
}
