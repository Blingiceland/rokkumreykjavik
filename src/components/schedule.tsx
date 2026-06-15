"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Play, Clock } from "lucide-react";
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
          className="grid gap-6 lg:grid-cols-[1fr_1.5fr]"
        >
          {/* Day meta */}
          <div className="border-2 border-bone bg-base-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-neon">{event.title}</p>
            <h3 className="mt-2 font-display text-3xl uppercase text-bone">{event.displayDate}</h3>
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-bone-dim transition-colors hover:text-neon"
            >
              <MapPin size={13} className="text-neon" />
              {venue.name} · {venue.streetAddress}
            </a>

            <div className="mt-6 flex items-center gap-2 border-2 border-bone px-4 py-3">
              <Clock size={15} className="shrink-0 text-neon" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-bone">
                  Fyrsta band kl. {getDoorsTime(event)} · headliner kl. 20:00
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-bone-faint">
                  Klukkutími á milli banda · tímasetningar geta breyst
                </p>
              </div>
            </div>

            <p className="mt-5 inline-block bg-neon px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-[color:rgb(var(--c-base))]">
              Ókeypis inn
            </p>
          </div>

          {/* Headliner photo (last night also plays a video) + support acts. */}
          <div className="flex flex-col gap-4">
            {headliner && (
              <figure className="group relative overflow-hidden border-2 border-bone bg-base-card">
                <div className="relative aspect-[4/3] sm:aspect-video">
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
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent" />
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
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                        <div>
                          <span className="bg-bone px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:rgb(var(--c-base))]">
                            Headliner · kl. {getScheduleTime(event, headliner.id)}
                          </span>
                          <p className="mt-1.5 font-display text-2xl uppercase leading-none text-bone sm:text-4xl">
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

            {/* Support acts — a photo only where we have one. */}
            <ul className="grid gap-2 sm:grid-cols-2">
              {support.map((a) => (
                <li key={a.id}>
                  <a
                    href="#listamenn"
                    className="group flex h-full items-center gap-3 border-2 border-bone bg-base-card p-2.5 transition-colors hover:bg-amber"
                  >
                    <span className="shrink-0 font-mono text-xs font-medium uppercase tracking-widest tabular-nums text-neon">
                      {getScheduleTime(event, a.id)}
                    </span>
                    {hasPhoto(a.image) && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.image} alt="" className="h-11 w-11 shrink-0 object-cover" />
                    )}
                    <span className="min-w-0 flex-1 font-display text-base uppercase leading-tight text-bone sm:text-lg">
                      {a.name}
                    </span>
                  </a>
                </li>
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
      <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl">
        {title}
        <span className="text-neon">{accent}</span>
      </h2>
    </div>
  );
}
