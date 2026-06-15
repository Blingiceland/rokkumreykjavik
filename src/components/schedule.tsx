"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArtistCover } from "@/components/artist-card";
import { events, getEventArtists, getScheduleTime, getDoorsTime, type RokkEvent } from "@/data/events";
import { venue } from "@/data/site";

// A band counts as "having a photo" when its image isn't the placeholder.
function hasPhoto(image: string): boolean {
  return Boolean(image) && !image.includes("placeholder");
}

function DaySchedule({ event, dayNum }: { event: RokkEvent; dayNum: number }) {
  const lineup = getEventArtists(event);
  const headliner = lineup[0];
  // Support acts in billing order — counting down from the 20:00 headliner.
  const support = lineup.slice(1);

  return (
    <motion.div
      id={`dagur-${dayNum}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24"
    >
      {/* Day header */}
      <div className="mb-5 border-b-2 border-bone pb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-3xl uppercase leading-none text-bone sm:text-5xl">
            {event.displayDate}
          </h3>
          <span className="bg-neon px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-[color:rgb(var(--c-base))]">
            Ókeypis inn
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-bone-dim">
          Headliner kl. 20:00 · fyrsta band kl. {getDoorsTime(event)} · klukkutími á milli banda · {venue.shortName}
        </p>
      </div>

      {/* Schedule — headliner at 20:00 on top, then counting down. */}
      <div className="flex flex-col gap-2.5">
        {headliner && (
          <figure className="relative overflow-hidden border-2 border-bone bg-base-card">
            <div className="relative aspect-[4/3] sm:aspect-[16/9]">
              {hasPhoto(headliner.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={headliner.image} alt={headliner.name} className="h-full w-full object-cover" />
              ) : (
                <ArtistCover artist={headliner} className="absolute inset-0" />
              )}
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="inline-block bg-neon px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:rgb(var(--c-base))]">
                  kl. {getScheduleTime(event, headliner.id)} · Headliner
                </span>
                <p className="mt-2 font-display text-3xl uppercase leading-[0.9] text-bone sm:text-5xl">
                  {headliner.name}
                </p>
              </figcaption>
            </div>
          </figure>
        )}

        {support.map((band) => (
          <div key={band.id} className="flex items-stretch border-2 border-bone bg-base-card">
            <span
              className={
                "flex w-[4.25rem] shrink-0 items-center justify-center font-display text-xl tabular-nums leading-none sm:w-24 sm:text-3xl " +
                (band.headliner
                  ? "bg-amber text-bone"
                  : "bg-bone text-[color:rgb(var(--c-base))]")
              }
            >
              {getScheduleTime(event, band.id)}
            </span>
            {hasPhoto(band.image) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={band.image} alt="" className="h-16 w-16 shrink-0 object-cover sm:h-20 sm:w-20" />
            )}
            <span className="flex flex-1 items-center gap-2 px-4 font-display text-xl uppercase leading-none text-bone sm:text-3xl">
              {band.name}
              {band.headliner && (
                <span className="bg-amber px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-bone">
                  Headliner
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Schedule() {
  return (
    <section id="dagskra" className="relative z-10 mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Fjórir laugardagar í júlí" title="Dag" accent="skrá" />

      {/* Day quick-jump pills. */}
      <div className="mb-10 flex flex-wrap gap-2">
        {events.map((e, i) => (
          <a
            key={e.id}
            href={`#dagur-${i + 1}`}
            className="border-2 border-bone bg-base-card px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-bone transition-colors hover:bg-amber"
          >
            {e.displayDate.replace("Laugardagur ", "")}
          </a>
        ))}
      </div>

      {/* Every day, stacked. */}
      <div className="flex flex-col gap-16">
        {events.map((e, i) => (
          <DaySchedule key={e.id} event={e} dayNum={i + 1} />
        ))}
      </div>
    </section>
  );
}

export function SectionLabel({
  kicker,
  title,
  accent,
}: {
  kicker: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">{kicker}</p>
      <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl">
        {title}
        <span className="text-neon">{accent}</span>
      </h2>
    </div>
  );
}
