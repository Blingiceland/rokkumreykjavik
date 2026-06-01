"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ticket, ArrowRight, MapPin, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { events, getEventArtists } from "@/data/events";
import { venue } from "@/data/site";
import { cn } from "@/lib/utils/cn";

export function Schedule() {
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const event = events[idx];
  const lineup = getEventArtists(event);
  const featured = lineup.find((a) => a.videoId);

  // Reset playback when switching days.
  React.useEffect(() => {
    setPlaying(false);
  }, [idx]);

  return (
    <section id="dagskra" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Fjórir laugardagar í júlí" title="Dag" accent="skrá" />

      {/* Day tabs */}
      <div
        className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="tablist"
        aria-label="Veldu dag"
      >
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
                "group rounded-xl border p-4 text-left transition-all",
                selected
                  ? "border-neon bg-base-card"
                  : "border-base-line hover:border-base-linebright"
              )}
            >
              <span
                className={cn(
                  "block font-mono text-[11px] uppercase tracking-widest",
                  selected ? "text-neon" : "text-bone-faint"
                )}
              >
                {e.title}
              </span>
              <span
                className={cn(
                  "mt-1 block font-display text-base leading-tight sm:text-lg",
                  selected ? "text-bone" : "text-bone"
                )}
              >
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8 lg:grid-cols-[1fr_1.6fr]"
        >
          {/* Day meta */}
          <div className="poster-frame rounded-2xl border border-base-line bg-base-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              {event.title}
            </p>
            <h3 className="mt-2 font-display text-3xl text-bone">{event.displayDate}</h3>
            {event.vibe && <p className="mt-3 text-bone-dim">{event.vibe}</p>}
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-bone-dim transition-colors hover:text-neon"
            >
              <MapPin size={13} className="text-neon-cyan" />
              {venue.name} · {venue.streetAddress}
            </a>
            <a
              href={event.ticketUrl}
              className={buttonVariants({ variant: "primary" }) + " mt-6 w-full"}
            >
              <Ticket size={16} /> Miðar á þennan dag
            </a>
          </div>

          {/* Right column: featured video + lineup */}
          <div className="flex flex-col gap-5">
            {featured && (
              <figure className="poster-frame group relative overflow-hidden rounded-2xl border border-base-line bg-base-card">
                <div className="relative aspect-video">
                  {playing ? (
                    <iframe
                      key={featured.id}
                      src={`https://www.youtube-nocookie.com/embed/${featured.videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title={`${featured.name} — myndband`}
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label={`Spila ${featured.name}`}
                      className="absolute inset-0 block focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${featured.videoId}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-base/85 via-base/20 to-transparent" />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg,#000 0 2px,transparent 2px 6px)",
                        }}
                      />
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-neon/50 bg-base/70 text-neon backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-neon group-hover:text-base">
                          <Play size={22} fill="currentColor" />
                        </span>
                      </span>
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3">
                        <span className="font-display text-lg text-bone drop-shadow">
                          {featured.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim">
                          Spila myndband
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </figure>
            )}

            {/* Lineup */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {lineup.map((artist, i) => (
                <motion.li
                  key={artist.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={`#listamenn`}
                    className="group flex h-full items-center justify-between gap-3 rounded-xl border border-base-line bg-base-card px-5 py-4 transition-colors hover:border-neon"
                  >
                    <div>
                      <p className="font-display text-lg leading-tight text-bone transition-colors group-hover:text-neon">
                        {artist.name}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-wide text-bone-faint">
                        {artist.genre}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-bone-faint transition-all group-hover:translate-x-0.5 group-hover:text-neon"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
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
      <h2 className="font-display text-5xl text-bone sm:text-7xl">
        {title}
        <span className="text-neon">{accent}</span>
      </h2>
    </div>
  );
}
