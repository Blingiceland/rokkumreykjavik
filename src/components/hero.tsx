"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site, venue, presenterCredit, EVENT_YEAR } from "@/data/site";
import { artists } from "@/data/artists";
import { getEventDays, dayNumberForDate } from "@/data/events";

const topHeadliners = artists.filter((a) => a.topBilling);
const subHeadliners = artists.filter((a) => a.headliner && !a.topBilling);
const otherBands = artists.filter((a) => !a.headliner);
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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-24 sm:px-6"
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
        {/* Presenter — prominent stamped sticker. */}
        <p
          className={`mb-7 inline-block -rotate-1 bg-bone px-4 py-2 font-display text-sm uppercase leading-none tracking-tight sm:text-xl ${PAPER}`}
          style={plate("rgb(var(--c-neon))")}
        >
          {presenterCredit}
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

        {/* Top headliners — biggest, alone on the highlight ink. Each links to
            its night in the schedule. */}
        <ul className="mt-8 flex flex-wrap items-end gap-2.5 sm:gap-3">
          {topHeadliners.map((a, i) => (
            <li key={a.id}>
              <a
                href={`#dagur-${dayNumberForDate(a.date)}`}
                className={
                  "block border-2 border-bone bg-amber px-4 py-2 font-display text-3xl uppercase leading-none text-bone transition-transform hover:-translate-y-0.5 sm:text-6xl " +
                  tiltClass[i % tiltClass.length]
                }
                style={xerox}
              >
                {a.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Second-tier headliners. */}
        <ul className="mt-3 flex flex-wrap items-end gap-2.5">
          {subHeadliners.map((a, i) => (
            <li key={a.id}>
              <a
                href={`#dagur-${dayNumberForDate(a.date)}`}
                className={
                  "block border-2 border-bone bg-amber px-3 py-1.5 font-display text-xl uppercase leading-none text-bone transition-transform hover:-translate-y-0.5 sm:text-3xl " +
                  tiltClass[(i + 1) % tiltClass.length]
                }
                style={xerox}
              >
                {a.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Everyone else — so the whole bill is visible. */}
        <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-bone-dim">
          Og öll hin
        </p>
        <ul className="flex flex-wrap items-end gap-2">
          {otherBands.map((a, i) => (
            <li key={a.id}>
              <a
                href={`#dagur-${dayNumberForDate(a.date)}`}
                className={
                  "block border-2 border-bone bg-base-card px-2.5 py-1 font-display text-base uppercase leading-none text-bone transition-colors hover:bg-amber sm:text-xl " +
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
