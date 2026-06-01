"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Music2, Youtube, AudioLines, Instagram, Play, Ticket, type LucideIcon } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { ArtistCard, ArtistCover } from "@/components/artist-card";
import { SectionLabel } from "@/components/schedule";
import { buttonVariants } from "@/components/ui/button";
import { artists, type Artist } from "@/data/artists";
import { cn } from "@/lib/utils/cn";

/** Only show a link chip when the URL is a real (non-placeholder) destination. */
function isReal(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    // Bare provider roots are treated as placeholders.
    const placeholderRoots = [
      "open.spotify.com",
      "www.youtube.com",
      "soundcloud.com",
      "www.instagram.com",
    ];
    return !(placeholderRoots.includes(u.hostname) && (u.pathname === "/" || u.pathname === ""));
  } catch {
    return false;
  }
}

function MediaLinks({ artist }: { artist: Artist }) {
  const links: { href: string; label: string; Icon: LucideIcon }[] = [
    { href: artist.spotifyUrl, label: "Spotify", Icon: Music2 },
    { href: artist.youtubeUrl, label: "YouTube", Icon: Youtube },
    { href: artist.soundcloudUrl, label: "SoundCloud", Icon: AudioLines },
    { href: artist.instagramUrl, label: "Instagram", Icon: Instagram },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ href, label, Icon }) => {
        const real = isReal(href);
        return (
          <a
            key={label}
            href={real ? href : undefined}
            target={real ? "_blank" : undefined}
            rel={real ? "noopener noreferrer" : undefined}
            aria-disabled={!real}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors",
              real
                ? "border-base-line text-bone-dim hover:border-neon hover:text-neon"
                : "pointer-events-none border-base-line/60 text-bone-faint opacity-50"
            )}
          >
            <Icon size={13} /> {label}
          </a>
        );
      })}
    </div>
  );
}

function VideoBlock({ artist }: { artist: Artist }) {
  if (artist.videoId) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-base-line">
        <iframe
          title={`${artist.name} myndband`}
          src={`https://www.youtube-nocookie.com/embed/${artist.videoId}?rel=0&modestbranding=1`}
          loading="lazy"
          className="h-full w-full"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  // Placeholder
  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-base-line bg-base"
      role="img"
      aria-label="Myndband væntanlegt"
    >
      <span
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0 1px,transparent 1px 14px)" }}
      />
      <div className="relative flex flex-col items-center gap-2">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-base-line text-bone-faint">
          <Play size={18} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-bone-faint">
          Myndband · væntanlegt
        </span>
      </div>
    </div>
  );
}

export function ArtistGrid() {
  const [active, setActive] = React.useState<Artist | null>(null);

  return (
    <section id="listamenn" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel
        kicker={`${artists.length} bönd · 4 dagar`}
        title="Lista"
        accent="menn"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {artists.map((artist, i) => (
          <motion.div
            key={artist.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
          >
            <ArtistCard artist={artist} onSelect={setActive} />
          </motion.div>
        ))}
      </div>

      <Dialog open={active !== null} onClose={() => setActive(null)} labelledBy="artist-modal-title">
        {active && (
          <div>
            <ArtistCover artist={active} className="h-40 w-full sm:h-52" />
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                  {active.displayDate} · {active.genre}
                </p>
                <h3 id="artist-modal-title" className="mt-2 font-display text-4xl text-bone sm:text-5xl">
                  {active.name}
                </h3>
                <p className="mt-3 text-bone-dim">{active.shortBio}</p>
              </div>

              <MediaLinks artist={active} />

              <div className="space-y-4 border-t border-base-line pt-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-bone-faint">
                  Horfa
                </h4>
                <VideoBlock artist={active} />
              </div>

              <a
                href={active.ticketUrl}
                className={buttonVariants({ variant: "primary" }) + " w-full"}
              >
                <Ticket size={16} /> Miðar
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
