"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { venue, EVENT_YEAR } from "@/data/site";
import { artists } from "@/data/artists";
import { getEventDays, dayNumberForDate } from "@/data/events";
import type { ThuleVariant } from "@/data/thule-variants";

const EMPHASIS_EXTRA = new Set(["petur-ben", "krummi-og-bjarni", "mur"]);
const isEmphasis = (a: (typeof artists)[number]) => a.headliner || EMPHASIS_EXTRA.has(a.id);

const TOP_BILL = ["the-vintage-caravan", "brain-police", "mur"];
const heroBill = [
  ...TOP_BILL.map((id) => artists.find((a) => a.id === id)).filter(
    (a): a is (typeof artists)[number] => Boolean(a)
  ),
  ...artists.filter((a) => !TOP_BILL.includes(a.id)),
];
const days = getEventDays();

const PAPER = "text-[color:rgb(var(--c-base))]";
const xerox = { filter: "url(#xerox-thule)" } as const;
const plate = (ink: string) => ({ filter: "url(#xerox-thule)", boxShadow: `0.05em 0.06em 0 ${ink}` });

const glassSrc: Record<ThuleVariant["glass"], string> = {
  clean: "/images/thule/glas-clean.png",
  "frost-1": "/images/thule/glas-frost-1.png",
  "frost-2": "/images/thule/glas-frost-2.png",
};

/**
 * Thule wordmark with its product tagline ("alltaf léttur") locked directly
 * underneath — the tagline belongs to Thule (the new light beer), not the
 * festival, so it always travels with the mark.
 */
function ThuleLockup({ logo, className = "" }: { logo: ThuleVariant["logo"]; className?: string }) {
  // Never use the tagline-version artwork here — it bakes "ALLTAF LÉTTUR" in
  // ABOVE the wordmark. We render the tagline ourselves, below the mark.
  const mark = logo === "thule-tagline" ? "thule-outline" : logo;
  return (
    <span className={"inline-flex flex-col items-start leading-none " + className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/thule/${mark}.png`} alt="Thule" className="h-9 w-auto sm:h-12" style={xerox} />
      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-bone-dim sm:text-[10px]">
        alltaf léttur
      </span>
    </span>
  );
}

/**
 * Page-wide background treatment, fixed behind the whole takeover (z-0). The
 * content sections are transparent, so this shows through between the cards —
 * the flag / cold glass stays put as you scroll. Only rendered for the
 * background-swap variants.
 */
export function ThulePageBackground({ variant }: { variant: ThuleVariant }) {
  if (variant.bg === "glass-wall") {
    return (
      <div aria-hidden="true" className="fixed inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={glassSrc[variant.glass]} alt="" className="h-full w-full object-cover object-center" />
        {/* Navy scrim — light enough that the cold beer still shows through, dark
            enough that the cards and ransom note read on top. */}
        <div className="absolute inset-0 bg-[color:rgb(var(--c-base))] opacity-[0.74]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:rgb(var(--c-base-deep))]/70 via-transparent to-[color:rgb(var(--c-base-deep))]/85" />
      </div>
    );
  }
  if (variant.bg === "flag-wall") {
    // Off-centre Nordic cross — white fimbriation under a red cross, full bleed.
    return (
      <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-y-0 left-[30%] w-[15vw] bg-[color:rgb(var(--c-bone))]" />
        <div className="absolute inset-x-0 top-[36%] h-[15vw] bg-[color:rgb(var(--c-bone))]" />
        <div className="absolute inset-y-0 left-[33.5%] w-[8vw] bg-neon" />
        <div className="absolute inset-x-0 top-[39.5%] h-[8vw] bg-neon" />
        {/* Faint darken so the floating cards separate from the flag. */}
        <div className="absolute inset-0 bg-[color:rgb(var(--c-base-deep))] opacity-[0.2]" />
      </div>
    );
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * RANSOM — the original cut-up note, in flag inks.                     *
 * ------------------------------------------------------------------ */
function RansomLayout({ variant }: { variant: ThuleVariant }) {
  const reduce = useReducedMotion();
  const tiltClass = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

  return (
    <>
      {variant.showCross && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.16]">
          <div className="absolute inset-y-0 left-[34%] w-[8vw] bg-[color:rgb(var(--c-bone))]" />
          <div className="absolute inset-x-0 top-[42%] h-[8vw] bg-[color:rgb(var(--c-bone))]" />
          <div className="absolute inset-y-0 left-[36%] w-[5vw] bg-neon" />
          <div className="absolute inset-x-0 top-[44%] h-[5vw] bg-neon" />
        </div>
      )}

      <div
        aria-hidden="true"
        className={`halftone pointer-events-none absolute inset-0 ${variant.grit ? "opacity-[0.28]" : "opacity-[0.12]"}`}
      />

      {variant.showGlass && (
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: 0.1 }}
          // eslint-disable-next-line @next/next/no-img-element
          src={glassSrc[variant.glass]}
          alt="Ísköld Thule"
          className="pointer-events-none absolute -right-4 bottom-0 z-0 hidden h-[88vh] w-auto max-w-[44vw] object-contain drop-shadow-2xl md:block"
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p
            className={`inline-flex items-center gap-x-2 -rotate-1 bg-bone px-4 py-2.5 font-display text-sm uppercase leading-none tracking-tight sm:text-lg ${PAPER}`}
            style={plate("rgb(var(--c-neon))")}
          >
            Dillon og Rás 2 í samstarfi við
          </p>
          <ThuleLockup logo={variant.logo} className="rotate-1" />
          <span className="font-display text-sm uppercase leading-none tracking-tight text-bone sm:text-lg">kynna</span>
        </div>

        <h1 className="flex flex-wrap items-center gap-2 font-display uppercase leading-none sm:gap-3">
          <span className={`-rotate-2 bg-bone px-3 py-1 text-[13.5vw] sm:text-[9rem] ${PAPER}`} style={plate("rgb(var(--c-neon))")}>
            Rokk
          </span>
          <span className={`rotate-3 bg-neon px-3 py-1 text-[11vw] sm:text-[7rem] ${PAPER}`} style={plate("rgb(var(--c-neon-cyan))")}>
            í
          </span>
          <span
            className="rotate-1 border-[3px] border-bone bg-amber px-3 py-1 text-[13.5vw] text-bone sm:text-[9rem]"
            style={plate("rgb(var(--c-neon))")}
          >
            Reykja
          </span>
          <span className={`-rotate-1 bg-bone px-3 py-1 text-[13.5vw] sm:text-[9rem] ${PAPER}`} style={plate("rgb(var(--c-amber))")}>
            vík
          </span>
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span
            className={`rotate-1 bg-neon px-3 py-1.5 font-display text-lg uppercase tracking-tight sm:text-2xl ${PAPER}`}
            style={plate("rgb(var(--c-bone))")}
          >
            Alltaf frítt inn!!
          </span>
          <span className="-rotate-1 border-2 border-bone px-3 py-1 font-display text-lg uppercase text-bone sm:text-2xl" style={xerox}>
            {days.join("·")} júlí {EVENT_YEAR}
          </span>
        </div>

        <ul className="mt-8 flex max-w-3xl flex-wrap items-end gap-2.5 sm:gap-3">
          {heroBill.map((a, i) => (
            <li key={a.id}>
              <a
                href={`#dagur-${dayNumberForDate(a.date)}`}
                className={
                  "block border-2 border-bone bg-amber px-3 py-1.5 font-display leading-none text-bone transition-transform hover:-translate-y-0.5 " +
                  (isEmphasis(a) ? "px-4 py-2 text-2xl sm:text-5xl " : "text-base sm:text-2xl ") +
                  (a.keepCase ? "normal-case " : "uppercase ") +
                  tiltClass[i % tiltClass.length]
                }
                style={xerox}
              >
                {a.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "primary" }) + " -rotate-1 !rounded-none"}>
            Sjá dagskrá
          </a>
          <span className="font-mono text-xs uppercase tracking-widest text-bone-dim">
            {venue.shortName} · {artists.length} bönd
          </span>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * CAN — beer-can label. Centred, symmetric, reads top-to-bottom like  *
 * a label; lineup runs as an "ingredients" list.                      *
 * ------------------------------------------------------------------ */
function CanLayout({ variant }: { variant: ThuleVariant }) {
  const reduce = useReducedMotion();

  return (
    <>
      {variant.showGlass && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={glassSrc[variant.glass]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-2 z-0 hidden h-[80vh] w-auto -rotate-6 object-contain opacity-90 drop-shadow-2xl lg:block"
            style={xerox}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={glassSrc[variant.glass]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-2 z-0 hidden h-[80vh] w-auto rotate-6 object-contain opacity-90 drop-shadow-2xl lg:block"
            style={xerox}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
        className="relative z-10 mx-auto w-full max-w-xl"
      >
        {/* The label panel — framed, centred, double-ruled top and bottom. */}
        <div className="border-x-2 border-bone bg-base px-6 py-8 text-center" style={xerox}>
          <div className="mx-auto mb-5 h-1 w-full bg-bone" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/thule/${variant.logo}.png`} alt="Thule" className="mx-auto h-12 w-auto sm:h-16" style={xerox} />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.4em] text-bone-dim">
            Kaloríusnautt · Glútenlaust · Alltaf léttur
          </p>

          <div className="my-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-bone-faint" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">Dillon og Rás 2 í samstarfi við Thule kynna</span>
            <span className="h-px w-10 bg-bone-faint" />
          </div>

          <h1 className="font-display uppercase leading-[0.85] text-bone">
            <span className="block text-[13vw] sm:text-[5rem]">Rokk í</span>
            <span className="mt-1 block bg-neon px-2 py-1 text-[12vw] text-[color:rgb(var(--c-base))] sm:text-[5rem]" style={xerox}>
              Reykjavík
            </span>
          </h1>

          <p className="mt-5 inline-block border-2 border-bone px-4 py-1.5 font-display text-lg uppercase tracking-tight text-bone sm:text-2xl">
            {days.join(" · ")} júlí {EVENT_YEAR} · frítt inn
          </p>

          {/* Lineup as an ingredients list. */}
          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone-faint">Innihald — 17 bönd</p>
            <p className="mx-auto mt-3 max-w-md font-display text-sm uppercase leading-snug tracking-wide text-bone sm:text-base">
              {heroBill.map((a) => a.name).join("  ·  ")}
            </p>
          </div>

          <div className="mx-auto mt-7 h-1 w-full bg-bone" />
          <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "primary" }) + " mt-6 !rounded-none"}>
            Sjá dagskrá
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * XEROX — cut-up punk zine. Overlapping, distorted, photocopied.       *
 * ------------------------------------------------------------------ */
function XeroxLayout({ variant }: { variant: ThuleVariant }) {
  const reduce = useReducedMotion();
  const tilt = ["rotate-2", "-rotate-3", "rotate-1", "-rotate-2", "rotate-3", "-rotate-1"];

  return (
    <>
      {/* Faint photocopied THULE stamps scattered behind. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/thule/thule-outline.png" alt="" className="absolute -left-10 top-10 w-[60vw] -rotate-12" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/thule/thule-outline.png" alt="" className="absolute -right-10 bottom-10 w-[55vw] rotate-6" />
      </div>

      <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 z-0 opacity-[0.1]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        {/* Slashed credit bar. */}
        <p
          className={`mb-2 inline-block -rotate-2 bg-neon px-3 py-1 font-mono text-[11px] uppercase tracking-[0.3em] sm:text-sm ${PAPER}`}
          style={xerox}
        >
          Dillon × Rás 2 í samstarfi við Thule kynna
        </p>

        {/* Overlapping, distorted title. */}
        <h1 className="font-display uppercase leading-[0.8]">
          <span className="block text-[24vw] text-bone sm:text-[12rem]" style={{ ...xerox, WebkitTextStroke: "2px rgb(var(--c-neon))" }}>
            Rokk
          </span>
          <span
            className={`-mt-[4vw] ml-[10vw] inline-block -rotate-2 bg-bone px-3 text-[13vw] sm:-mt-8 sm:ml-24 sm:text-[6.5rem] ${PAPER}`}
            style={plate("rgb(var(--c-neon))")}
          >
            í Reykjavík
          </span>
        </h1>

        {/* Thule's tagline, ransom-letter cut-up — stamped with the wordmark so
            it reads as Thule's ("alltaf léttur"), not the festival's. */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/thule/thule-solid.png" alt="Thule" className="mr-1 h-6 w-auto -rotate-2 sm:h-9" style={xerox} />
          {"ALLTAF LÉTTUR".split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="w-3" />
            ) : (
              <span
                key={i}
                className={
                  "inline-block px-1.5 py-0.5 font-display text-xl uppercase leading-none sm:text-3xl " +
                  (i % 2 === 0 ? `bg-bone ${PAPER}` : "bg-neon text-bone") +
                  " " +
                  tilt[i % tilt.length]
                }
                style={xerox}
              >
                {ch}
              </span>
            )
          )}
          <span className="ml-2 -rotate-1 border-2 border-bone px-2 py-0.5 font-display text-lg uppercase text-bone sm:text-2xl" style={xerox}>
            {days.join("·")} júlí · frítt
          </span>
        </div>

        {/* Chaotic bill. */}
        <ul className="mt-7 flex flex-wrap items-center gap-2">
          {heroBill.map((a, i) => (
            <li key={a.id}>
              <a
                href={`#dagur-${dayNumberForDate(a.date)}`}
                className={
                  "block px-2.5 py-1 font-display uppercase leading-none transition-transform hover:-translate-y-0.5 " +
                  (isEmphasis(a)
                    ? "bg-neon text-bone text-xl sm:text-3xl "
                    : `bg-bone ${PAPER} text-sm sm:text-lg `) +
                  (a.keepCase ? "normal-case " : "") +
                  tilt[i % tilt.length]
                }
                style={xerox}
              >
                {a.name}
              </a>
            </li>
          ))}
        </ul>

        <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "primary" }) + " mt-8 rotate-1 !rounded-none"}>
          Sjá dagskrá
        </a>
      </motion.div>
    </>
  );
}

/**
 * Thule takeover hero. Dispatches on the active variant's layout, with a
 * shared off-register xerox filter and an optional full-bleed background.
 */
export function ThuleHero({ variant }: { variant: ThuleVariant }) {
  const layout = variant.layout ?? "ransom";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-28 sm:px-6 md:pt-24"
    >
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <filter id="xerox-thule">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.026" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {layout === "ransom" && <RansomLayout variant={variant} />}
      {layout === "can" && <CanLayout variant={variant} />}
      {layout === "xerox" && <XeroxLayout variant={variant} />}

      <a href="#dagskra" aria-label="Skruna niður" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone-faint">
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
