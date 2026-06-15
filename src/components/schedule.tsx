"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Play, Clock } from "lucide-react";
import { ArtistCover } from "@/components/artist-card";
import { events, getEventArtists, getSetTime } from "@/data/events";
import { venue } from "@/data/site";
import { cn } from "@/lib/utils/cn";

export function Schedule() {
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const event = events[idx];
  const lineup = getEventArtists(event);
  const featured = lineup.find((a) => a.videoId);
  const hasTimes = lineup.some((a) => getSetTime(event, a.id));
  // First act of the night is the headliner — rendered largest. The rest follow
  // in set order; nights may have a varying number of acts.
  const headliner = lineup[0];
  const support = lineup.slice(1);

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

            {/* Times are still being finalised — show a tidy placeholder until set. */}
            {!hasTimes && (
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-dashed border-base-line bg-base px-4 py-3">
                <Clock size={15} className="shrink-0 text-neon-cyan" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-bone">
                    Tímasetningar væntanlegar
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-bone-faint">
                    Dagskrá dagsins birtist fljótlega
                  </p>
                </div>
              </div>
            )}

            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neon">
              Ókeypis inn
            </p>
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

            {/* Lineup — headliner first (largest), then support acts. */}
            <div className="flex flex-col gap-3">
              {/* Headliner */}
              <motion.a
                key={`${event.id}-${headliner.id}`}
                href="#listamenn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group flex items-center gap-4 rounded-2xl border border-neon/40 bg-base-card p-4 transition-colors hover:border-neon"
              >
                <ArtistCover
                  artist={headliner}
                  className="h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
                    Headliner
                  </span>
                  <p className="mt-1 truncate font-display text-2xl leading-none text-bone transition-colors group-hover:text-neon sm:text-3xl">
                    {headliner.name}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[11px] uppercase tracking-widest tabular-nums",
                    getSetTime(event, headliner.id) ? "text-neon-cyan" : "text-bone-faint"
                  )}
                >
                  {getSetTime(event, headliner.id) ?? "væntanl."}
                </span>
              </motion.a>

              {/* Support acts */}
              <ul className="grid gap-3 sm:grid-cols-2">
                {support.map((artist, i) => (
                  <motion.li
                    key={artist.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i + 1) * 0.05 }}
                  >
                    <a
                      href={`#listamenn`}
                      className="group flex h-full items-center gap-3 rounded-xl border border-base-line bg-base-card p-3 transition-colors hover:border-neon"
                    >
                      <ArtistCover
                        artist={artist}
                        className="h-14 w-14 shrink-0 rounded-lg"
                      />
                      <p className="min-w-0 flex-1 font-display text-lg leading-tight text-bone transition-colors group-hover:text-neon">
                        {artist.name}
                      </p>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[10px] uppercase tracking-widest tabular-nums",
                          getSetTime(event, artist.id) ? "text-neon-cyan" : "text-bone-faint"
                        )}
                      >
                        {getSetTime(event, artist.id) ?? "væntanl."}
                      </span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-bone-faint transition-all group-hover:translate-x-0.5 group-hover:text-neon"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
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
  // Standard + typo variants; CSS shows the one matching the active look.
  return (
    <>
      <div className="only-standard mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">{kicker}</p>
        <h2 className="font-display text-5xl text-bone sm:text-7xl">
          {title}
          <span className="text-neon">{accent}</span>
        </h2>
      </div>
      <div className="only-typo mb-10">
        <p className="flex items-center justify-between border-y-2 border-bone py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone sm:text-xs sm:tracking-[0.4em]">
          <span>{kicker}</span>
        </p>
        <h2 className="mt-4 font-display text-6xl uppercase leading-[0.82] tracking-[-0.02em] text-bone sm:text-8xl">
          {title}
          <span className="text-neon" style={{ textShadow: "0.04em 0.045em 0 rgba(255,157,60,0.5)" }}>
            {accent}
          </span>
        </h2>
      </div>
    </>
  );
}
