"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Ticket, CalendarRange, Users, MapPin, Sun } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site, venue, EVENT_YEAR } from "@/data/site";
import { artists } from "@/data/artists";
import { events } from "@/data/events";

// Metadata strip derives counts from data instead of hardcoding.
const meta = [
  { Icon: CalendarRange, label: `${events.length} laugardagar` },
  { Icon: Users, label: `${artists.length} listamenn` },
  { Icon: MapPin, label: venue.shortName },
  { Icon: Sun, label: "Júlí" },
];

const supporting =
  "Fjóra laugardaga í júlí í garðinum á Dillon. Sextán bönd, fjögur sett á dag. Rokkpartý.";

export function Hero() {
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
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-20 sm:px-6"
    >
      {/* Oversized poster backdrop word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-[22%] select-none font-display text-[34vw] leading-none text-base-card/70 sm:text-[22vw]"
      >
        ROKK
      </div>
      {/* Faint scanline texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 5px)" }}
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

        {/* Host × partner lockup */}
        <motion.div
          variants={item}
          className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            aria-label={`Hýst af ${venue.shortName}`}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone-faint">
              Hýst af
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/dillon.png"
              alt="Dillon"
              className="h-12 w-auto object-contain opacity-90 invert mix-blend-lighten transition-opacity group-hover:opacity-100 sm:h-14"
            />
          </a>
          <span className="font-display text-2xl text-bone-faint">×</span>
          <a
            href="https://www.ruv.is/ras2"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            aria-label="Í samstarfi við Rás 2"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone-faint">
              Í samstarfi við
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/ras2.svg"
              alt="Rás 2"
              className="h-8 w-auto object-contain opacity-90 invert transition-opacity group-hover:opacity-100 sm:h-9"
            />
          </a>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[14vw] leading-[0.85] tracking-tight sm:text-[8.5rem]"
        >
          Rokk
          <span className="text-neon glow-neon animate-flicker">(um)</span>
          <br />
          <span className="text-stroke">Reykjavík</span>
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-2xl font-body text-xl text-bone sm:text-2xl">
          {site.description}
        </motion.p>

        <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim">
          {supporting}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
          <a href="#dagskra" className={buttonVariants({ size: "lg", variant: "neon" })}>
            Sjá dagskrá
          </a>
          <a href={site.defaultTicketUrl} className={buttonVariants({ size: "lg", variant: "primary" })}>
            <Ticket size={18} /> Kaupa miða
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
