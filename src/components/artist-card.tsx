"use client";

import * as React from "react";
import type { Artist } from "@/data/artists";
import { cn } from "@/lib/utils/cn";

/** Deterministic accent so cards alternate neon/cyan without random flicker. */
function accentFor(id: string): "neon" | "cyan" {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h % 2 === 0 ? "neon" : "cyan";
}

export function ArtistCover({ artist, className }: { artist: Artist; className?: string }) {
  const accent = accentFor(artist.id);
  // If a real image is provided (not the placeholder), show it.
  const hasImage = artist.image && !artist.image.includes("placeholder");

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden="true">
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={artist.image} alt="" className="h-full w-full object-cover" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              accent === "neon"
                ? "radial-gradient(120% 120% at 20% 0%, #1f1633, #0c0814)"
                : "radial-gradient(120% 120% at 80% 0%, #16202e, #0c0814)",
          }}
        />
      )}
      {/* Initials monogram */}
      <span
        className={cn(
          "absolute -bottom-5 -right-1 select-none font-display text-7xl leading-none",
          accent === "neon" ? "text-neon/15" : "text-neon-cyan/15"
        )}
      >
        {artist.name.replace(/[^A-Za-zÁÉÍÓÚÝÐÞÆÖ]/g, "").slice(0, 2).toUpperCase()}
      </span>
      {/* Scanlines */}
      <span
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#000 0 2px,transparent 2px 6px)" }}
      />
      {/* Accent hairline at top */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-[2px]",
          accent === "neon" ? "bg-neon/70" : "bg-neon-cyan/70"
        )}
      />
    </div>
  );
}

export function ArtistCard({
  artist,
  onSelect,
}: {
  artist: Artist;
  onSelect: (a: Artist) => void;
}) {
  return (
    <button
      onClick={() => onSelect(artist)}
      aria-label={`Skoða ${artist.name}`}
      className="group rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      <ArtistCover
        artist={artist}
        className="poster-frame aspect-square rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="mt-3">
        <h3 className="font-display text-lg leading-tight text-bone transition-colors group-hover:text-neon">
          {artist.name}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-wide text-bone-faint">
          {artist.genre} · {artist.displayDate}
        </p>
      </div>
    </button>
  );
}
