"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { ArtistCover } from "@/components/artist-card";
import { events, getEventArtists, getScheduleTime, getDoorsTime } from "@/data/events";
import { venue } from "@/data/site";
import { cn } from "@/lib/utils/cn";

// A band counts as "having a photo" when its image isn't the placeholder.
function hasPhoto(image: string): boolean {
  return Boolean(image) && !image.includes("placeholder");
}

export function Schedule() {
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const event = events[idx];
  const lineup = getEventArtists(event);
  const headliner = lineup[0];
  // Support acts in chronological (play) order — earliest first, building up to
  // the headliner at 20:00. (Billing order is the reverse.)
  const support = lineup.slice(1).reverse();
  // Only the last night (Brain Police, with Múr warming up) also gets a video.
  const isLast = idx === events.length - 1;
  const canPlay = isLast && Boolean(headliner?.videoId);

  // Reset playback when switching days.
  React.useEffect(() => {
    setPlaying(false);
  }, [idx]);

  return (
    <section id="dagskra" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Fjórir laugardagar í júlí" title="Dag" accent="skrá" />

      {/* Day tabs */}
      <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Veldu dag">
        {events.map((e, i) => {
          const selected = i === idx;
          return (
            <button
              key={e.id}
              role="tab"
              id={`tab-${i}`}
              aria-selected={selected}
              aria-controls={`panel-${i}`}
              onClick={() => setIdx(i)}
              className={cn(
                "group border-2 border-bone p-4 text-left transition-colors",
                selected ? "bg-amber" : "bg-base-card hover:bg-base-raised"
              )}
            >
              <span
                className={cn(
                  "block font-mono text-[11px] uppercase tracking-widest",
                  selected ? "text-bone" : "text-bone-faint"
                )}
              >
                {e.title}
              </span>
              <span className="mt-1 block font-display text-base uppercase leading-tight text-bone sm:text-lg">
                {e.displayDate.replace("Laugardagur ", "")}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          id={`panel-${idx}`}
          role="tabpanel"
          aria-labelledby={`tab-${idx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mx-auto w-full max-w-3xl"
        >
          {/* Day header — no side panel, just the schedule. */}
          <div className="mb-5 border-b-2 border-bone pb-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-3xl uppercase leading-none text-bone sm:text-4xl">
                {event.displayDate}
              </h3>
              <span className="bg-neon px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-[color:rgb(var(--c-base))]">
                Ókeypis inn
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-bone-dim">
              Fyrsta band kl. {getDoorsTime(event)} · headliner kl. 20:00 · klukkutími á milli banda · {venue.shortName}
            </p>
          </div>

          {/* Hourly timetable — a band each hour, building up to the 20:00
              headliner finale. */}
          <div className="flex flex-col gap-2.5">
            {support.map((band) => (
              <a
                key={band.id}
                href="#listamenn"
                className="group flex items-stretch border-2 border-bone bg-base-card transition-colors hover:bg-amber"
              >
                <span className="flex w-[4.25rem] shrink-0 items-center justify-center bg-bone font-display text-xl tabular-nums leading-none text-[color:rgb(var(--c-base))] sm:w-24 sm:text-3xl">
                  {getScheduleTime(event, band.id)}
                </span>
                {hasPhoto(band.image) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={band.image} alt="" className="h-16 w-16 shrink-0 object-cover sm:h-20 sm:w-20" />
                )}
                <span className="flex flex-1 items-center px-4 font-display text-xl uppercase leading-none text-bone sm:text-3xl">
                  {band.name}
                </span>
              </a>
            ))}

            {/* Headliner — the 20:00 finale; the last night also plays a video. */}
            {headliner && (
              <figure className="group relative mt-0.5 overflow-hidden border-2 border-bone bg-base-card">
                <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                  {canPlay && playing ? (
                    <iframe
                      key={headliner.id}
                      src={`https://www.youtube-nocookie.com/embed/${headliner.videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title={`${headliner.name} — myndband`}
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <>
                      {hasPhoto(headliner.image) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={headliner.image} alt={headliner.name} className="h-full w-full object-cover" />
                      ) : (
                        <ArtistCover artist={headliner} className="absolute inset-0" />
                      )}
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
                      {canPlay && (
                        <button
                          type="button"
                          onClick={() => setPlaying(true)}
                          aria-label={`Spila ${headliner.name}`}
                          className="absolute inset-0 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                        >
                          <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-bone bg-neon text-[color:rgb(var(--c-base))] transition-transform group-hover:scale-110">
                            <Play size={26} fill="currentColor" />
                          </span>
                        </button>
                      )}
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                        <div>
                          <span className="inline-block bg-neon px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:rgb(var(--c-base))]">
                            kl. {getScheduleTime(event, headliner.id)} · Headliner
                          </span>
                          <p className="mt-2 font-display text-3xl uppercase leading-[0.9] text-bone sm:text-5xl">
                            {headliner.name}
                          </p>
                        </div>
                        {canPlay && (
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-bone-dim">Spila myndband</span>
                        )}
                      </figcaption>
                    </>
                  )}
                </div>
              </figure>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
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
