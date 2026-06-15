"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarRange, Users, MapPin, BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site, venue, EVENT_YEAR } from "@/data/site";
import { artists } from "@/data/artists";
import { events, getHeadliner, getEventDays } from "@/data/events";

// Metadata strip derives counts from data instead of hardcoding.
const meta = [
  { Icon: CalendarRange, label: `${events.length} laugardagar` },
  { Icon: Users, label: `${artists.length} listamenn` },
  { Icon: MapPin, label: venue.shortName },
  { Icon: BadgeCheck, label: "Ókeypis inn" },
];

const supporting =
  "Fjóra laugardaga í júlí í garðinum á Dillon. Sextán bönd, fjögur sett á dag. Ókeypis inn.";

// Data-driven copy shared by the typo poster hero.
const headliners = events
  .map((e) => getHeadliner(e))
  .filter((a): a is NonNullable<typeof a> => Boolean(a));
const days = getEventDays();
const misreg = "0.055em 0.06em 0 rgba(255,157,60,0.55), -0.03em -0.035em 0 rgba(58,212,255,0.45)";

/**
 * Renders both hero variants; CSS (`[data-look]`) shows the one matching the
 * active look. "base" and "paper" use the standard hero (paper just re-themes
 * via tokens); "typo" uses the type-poster hero.
 */
export function Hero() {
  return (
    <div id="top">
      <div className="only-standard">
        <HeroStandard />
      </div>
      <div className="only-typo">
        <HeroTypo />
      </div>
    </div>
  );
}

function HeroStandard() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { y: reduce ? 0 : 22, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, damping: 24, stiffness: 240 } },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-20 sm:px-6">
      {/* Oversized poster backdrop word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-[22%] select-none font-display text-[34vw] leading-none text-bone/[0.05] sm:text-[22vw]"
      >
        ROKK
      </div>
      {/* Faint scanline texture (ink colour per look) */}
      <div
        aria-hidden="true"
        className="hero-scan pointer-events-none absolute inset-0 opacity-[0.04]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <motion.p
          variants={item}
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.3em] text-neon"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon" />
          Júlí {EVENT_YEAR}
          <span className="text-bone-faint">·</span>
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-dim transition-colors hover:text-neon"
          >
            {venue.streetAddress}
          </a>
        </motion.p>

        {/* Presenter lockup — "Dillon og Rás 2 kynna" */}
        <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center"
            aria-label={venue.shortName}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/dillon.png"
              alt="Dillon"
              className="brand-logo h-11 w-auto object-contain opacity-90 invert mix-blend-lighten transition-opacity group-hover:opacity-100 sm:h-12"
            />
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-bone-faint">og</span>
          <a
            href="https://www.ruv.is/ras2"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center"
            aria-label="Rás 2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/ras2.svg"
              alt="Rás 2"
              className="brand-logo h-7 w-auto object-contain opacity-90 invert transition-opacity group-hover:opacity-100 sm:h-8"
            />
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-faint">kynna</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[15vw] leading-[0.82] tracking-tight sm:text-[8.5rem]"
        >
          Rokk í
          <br />
          <span className="text-neon glow-neon">Reykjavík</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-display text-xl tracking-[0.5em] text-bone-dim sm:text-2xl"
        >
          {site.yearLabel}
        </motion.p>

        <motion.p variants={item} className="mt-7 max-w-2xl font-body text-xl text-bone sm:text-2xl">
          {site.description}
        </motion.p>

        <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim">
          {supporting}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
          <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "neon" })}>
            Sjá dagskrá
          </a>
          <a href="#styrkja" className={buttonVariants({ size: "lg", variant: "primary" })}>
            Styrkja
          </a>
        </motion.div>

        {/* Metadata strip */}
        <motion.ul
          variants={item}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-base-line pt-6"
        >
          {meta.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-dim"
            >
              <Icon size={14} className="text-neon-cyan" /> {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <a
        href="#dagskra"
        aria-label="Skruna niður"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone-faint"
      >
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}

function HeroTypo() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } },
  };
  const row = {
    hidden: { y: reduce ? 0 : 16, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-3 pb-10 pt-20 sm:px-5">
      {/* Halftone dot field — paper/ink print texture, no photography. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1.4px)", backgroundSize: "7px 7px" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-[1400px]"
      >
        {/* Presenter — set as type, not logos (minimal imagery). */}
        <motion.div
          variants={row}
          className="flex items-center justify-between gap-3 border-y-2 border-bone py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone sm:text-xs sm:tracking-[0.4em]"
        >
          <span className="truncate">{site.presenter} kynna</span>
          <span className="hidden shrink-0 text-bone-dim sm:inline">{venue.locality}</span>
        </motion.div>

        {/* The name — gigantic packed wood type. */}
        <motion.h1 variants={row} className="mt-3 select-none font-display uppercase leading-[0.74] tracking-[-0.02em]">
          <span className="flex items-baseline gap-[0.07em] text-[27vw] sm:text-[20vw]">
            <span style={{ textShadow: misreg }}>Rokk</span>
            <span className="text-neon text-[11vw] sm:text-[8vw]">í</span>
          </span>
          <span className="block text-[15vw] text-neon sm:text-[15.6vw]" style={{ textShadow: misreg }}>
            Reykjavík
          </span>
        </motion.h1>

        {/* Letterpress date slug — inverted ink block. */}
        <motion.div
          variants={row}
          className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-bone px-3 py-2 font-display text-lg uppercase leading-none tracking-tight text-[#0c0814] sm:px-5 sm:py-3 sm:text-2xl"
        >
          <span>Fjórir laugardagar</span>
          <span className="tabular-nums">
            {days.join(" · ")} <span className="text-amber">júlí</span> {EVENT_YEAR}
          </span>
        </motion.div>

        {/* Headliners — the second giant tier, data-driven. */}
        <motion.div variants={row} className="mt-6">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.4em] text-amber sm:text-xs">
            Headlinerar
          </p>
          <ul className="font-display uppercase leading-[0.9] tracking-[-0.01em]">
            {headliners.map((a, i) => (
              <li
                key={a.id}
                className={"text-[9.8vw] sm:text-[8.2vw] " + (i % 2 === 0 ? "text-bone" : "text-bone-dim")}
              >
                <a href="#dagskra" className="transition-colors hover:text-neon">
                  {a.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom slug: free admission stamp + count + venue + CTAs. */}
        <motion.div
          variants={row}
          className="mt-7 flex flex-col gap-5 border-t-2 border-bone pt-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-neon px-3 py-1.5 font-display text-lg uppercase tracking-tight text-[#0c0814] sm:text-xl">
              Ókeypis inn
            </span>
            <span className="font-display text-lg uppercase tracking-tight text-bone sm:text-xl">
              {artists.length} bönd · {venue.shortName}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#dagskra"
              className="border-2 border-bone bg-bone px-6 py-3 font-display text-sm uppercase tracking-wide text-[#0c0814] transition-colors hover:bg-neon hover:border-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Dagskrá
            </a>
            <a
              href="#styrkja"
              className="border-2 border-bone px-6 py-3 font-display text-sm uppercase tracking-wide text-bone transition-colors hover:border-neon hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Styrkja
            </a>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#dagskra"
        aria-label="Skruna niður"
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 text-bone-faint sm:block"
      >
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
