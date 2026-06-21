"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site, venue, EVENT_YEAR } from "@/data/site";
import { artists } from "@/data/artists";
import { getEventDays, dayNumberForDate } from "@/data/events";

// Everyone is billed on the same amber ground — no grey "lesser" tier. The
// bigger draws just print larger: the headliners plus a few hand-picked names.
const EMPHASIS_EXTRA = new Set(["petur-ben", "krummi-og-bjarni", "mur"]);
const isEmphasis = (a: (typeof artists)[number]) => a.headliner || EMPHASIS_EXTRA.has(a.id);

// The three top-billed acts lead the hero bill; everyone else follows in
// lineup order, unchanged.
const TOP_BILL = ["the-vintage-caravan", "brain-police", "mur"];
const heroBill = [
  ...TOP_BILL.map((id) => artists.find((a) => a.id === id)).filter(
    (a): a is (typeof artists)[number] => Boolean(a)
  ),
  ...artists.filter((a) => !TOP_BILL.includes(a.id)),
];
const days = getEventDays();

const PAPER = "text-[color:rgb(var(--c-base))]";
const xerox = { filter: "url(#xerox)" } as const;
// A hard off-register colour plate behind a box (the second screen, misaligned).
const plate = (ink: string) => ({ filter: "url(#xerox)", boxShadow: `0.05em 0.06em 0 ${ink}` });

/**
 * Photocopied-zine front page (the chosen "pönk" direction) with print craft on
 * top: ransom-note boxes printed off-register (a colour plate nudged behind
 * each), worn xerox edges (feDisplacementMap), a halftone tone field and heavy
 * ink grain. All copy is data-driven.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const tiltClass = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-28 sm:px-6 md:pt-24"
    >
      {/* Worn xerox edge filter. */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <filter id="xerox">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.026" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Halftone tone field over the whole hero. */}
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-[0.2]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        {/* Presenter — prominent stamped sticker. Thule (main partner) appears
            as its own wordmark in place of the name. */}
        <p
          className={`mb-7 inline-flex flex-wrap items-center gap-x-2 gap-y-1 -rotate-1 bg-bone px-4 py-2.5 font-display text-sm uppercase leading-none tracking-tight sm:text-xl ${PAPER}`}
          style={plate("rgb(var(--c-neon))")}
        >
          <span>{site.presenter} í samstarfi við</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/thule-wordmark.png"
            alt="Thule"
            className="inline-block h-[1.05em] w-auto translate-y-[0.03em]"
            style={xerox}
          />
          <span>kynna:</span>
        </p>

        {/* Ransom-note title — each word an off-register plate. */}
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
            Ókeypis inn!!
          </span>
          <span className="-rotate-1 border-2 border-bone px-3 py-1 font-display text-lg uppercase text-bone sm:text-2xl" style={xerox}>
            {days.join("·")} júlí {EVENT_YEAR}
          </span>
        </div>

        {/* The whole bill on one amber ground — bigger draws print larger, the
            rest are right there with them. Each links to its night. */}
        <ul className="mt-8 flex flex-wrap items-end gap-2.5 sm:gap-3">
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

      <a href="#dagskra" aria-label="Skruna niður" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone-faint">
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
