"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site, venue, presenterCredit, EVENT_YEAR } from "@/data/site";
import { artists } from "@/data/artists";
import { events, getHeadliner, getEventDays } from "@/data/events";

const headliners = events
  .map((e) => getHeadliner(e))
  .filter((a): a is NonNullable<typeof a> => Boolean(a));
const days = getEventDays();

/**
 * Renders all three look variants; CSS (`[data-look]` + `.show-*`) reveals the
 * active one. Each is a distinct direction: rokk (loud dark poster), pönk
 * (photocopied zine), venjulegt (clean modern). All copy is data-driven.
 */
export function Hero() {
  return (
    <div id="top">
      <div className="show-rokk">
        <HeroRokk />
      </div>
      <div className="show-ponk">
        <HeroPonk />
      </div>
      <div className="show-venjulegt">
        <HeroVenjulegt />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ ROKK -- */

function HeroRokk() {
  const reduce = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } } };
  const item = {
    hidden: { y: reduce ? 0 : 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-20 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-[18%] select-none font-display text-[40vw] leading-none text-bone/[0.04] sm:text-[26vw]"
      >
        ROKK
      </div>
      <div aria-hidden="true" className="hero-scan pointer-events-none absolute inset-0 opacity-[0.05]" />

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p variants={item} className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.3em] text-neon">
          <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon" />
          {presenterCredit}
          <span className="text-bone-faint">·</span>
          Júlí {EVENT_YEAR}
        </motion.p>

        <motion.h1 variants={item} className="font-display text-[15vw] uppercase leading-[0.8] tracking-[-0.02em] sm:text-[8.5rem]">
          Rokk í
          <br />
          <span className="text-neon glow-neon">Reykjavík</span>
        </motion.h1>

        <motion.p variants={item} className="mt-4 font-display text-xl tracking-[0.45em] text-bone-dim sm:text-2xl">
          {site.yearLabel}
        </motion.p>

        <motion.p variants={item} className="mt-6 max-w-2xl font-body text-lg text-bone-dim sm:text-xl">
          {site.description} Ókeypis inn.
        </motion.p>

        {/* Headliners line */}
        <motion.div variants={item} className="mt-8 border-y border-base-line py-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.4em] text-neon-cyan">Headlinerar</p>
          <p className="font-display text-xl uppercase leading-tight text-bone sm:text-3xl">
            {headliners.map((a, i) => (
              <React.Fragment key={a.id}>
                {i > 0 && <span className="text-neon"> / </span>}
                {a.name}
              </React.Fragment>
            ))}
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "primary" })}>
            Sjá dagskrá
          </a>
          <span className="font-mono text-xs uppercase tracking-widest text-bone-faint">
            {days.join(" · ")} júlí · {venue.shortName} · {artists.length} bönd
          </span>
        </motion.div>
      </motion.div>

      <a href="#dagskra" aria-label="Skruna niður" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone-faint">
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ PÖNK -- */

function HeroPonk() {
  const reduce = useReducedMotion();
  // Ransom-note word boxes — alternating ink, slight rotations.
  const tiltClass = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <p className="mb-6 inline-block -rotate-1 bg-bone px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:rgb(var(--c-base))]">
          {presenterCredit}
        </p>

        {/* Ransom-note title */}
        <h1 className="flex flex-wrap items-center gap-2 font-display uppercase leading-none sm:gap-3">
          <span className="-rotate-2 bg-bone px-3 py-1 text-[15vw] text-[color:rgb(var(--c-base))] sm:text-[9rem]">Rokk</span>
          <span className="rotate-3 bg-neon px-3 py-1 text-[12vw] text-[color:rgb(var(--c-base))] sm:text-[7rem]">í</span>
          <span className="rotate-1 border-[3px] border-bone px-3 py-1 text-[15vw] text-bone sm:text-[9rem]" style={{ background: "rgb(var(--c-amber))" }}>
            Reykja
          </span>
          <span className="-rotate-1 bg-bone px-3 py-1 text-[15vw] text-[color:rgb(var(--c-base))] sm:text-[9rem]">vík</span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rotate-1 bg-neon px-3 py-1.5 font-display text-lg uppercase tracking-tight text-[color:rgb(var(--c-base))] sm:text-2xl">
            Ókeypis inn!!
          </span>
          <span className="-rotate-1 border-2 border-bone px-3 py-1 font-display text-lg uppercase text-bone sm:text-2xl">
            {days.join("·")} júlí {EVENT_YEAR}
          </span>
        </div>

        {/* Headliners as torn stickers */}
        <ul className="mt-8 flex flex-wrap gap-3">
          {headliners.map((a, i) => (
            <li
              key={a.id}
              className={
                "border-2 border-bone bg-base-card px-3 py-1.5 font-display text-xl uppercase leading-none text-bone sm:text-3xl " +
                tiltClass[i % tiltClass.length]
              }
            >
              <a href="#dagskra" className="hover:text-neon">{a.name}</a>
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

/* ------------------------------------------------------------- VENJULEGT -- */

function HeroVenjulegt() {
  const reduce = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } } };
  const item = {
    hidden: { y: reduce ? 0 : 14, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center px-4 pt-20 sm:px-6">
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto w-full max-w-4xl text-center">
        <motion.p variants={item} className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-bone-faint">
          {presenterCredit}
        </motion.p>

        <motion.h1 variants={item} className="font-display text-5xl leading-[1.05] tracking-tight text-bone sm:text-7xl">
          Rokk í Reykjavík
        </motion.h1>

        <motion.p variants={item} className="mt-4 font-body text-[color:rgb(var(--c-base))] uppercase tracking-[0.3em] text-neon sm:text-lg">
          {EVENT_YEAR}
        </motion.p>

        <motion.p variants={item} className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-bone-dim sm:text-xl">
          {site.description} Fjóra laugardaga í júlí í garðinum á Dillon — ókeypis inn.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "primary" })}>
            Sjá dagskrá
          </a>
          <a href="#listamenn" className={buttonVariants({ size: "lg", variant: "ghost" })}>
            Listamenn
          </a>
        </motion.div>

        <motion.ul
          variants={item}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-base-line pt-6 font-mono text-xs uppercase tracking-widest text-bone-dim"
        >
          <li>{days.join(" · ")} júlí</li>
          <li>{artists.length} bönd</li>
          <li>{venue.shortName}</li>
          <li className="text-neon">Ókeypis inn</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
