"use client";

import * as React from "react";
import { Music2, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/schedule";
import { site } from "@/data/site";
import { artists } from "@/data/artists";

/**
 * "Listen before the party" — links out to the Spotify playlist instead of
 * embedding the player, so visitors aren't pushed into a Spotify login/Premium
 * wall on the page. Login lives in Spotify, where it belongs.
 */
export function PlaylistSection() {
  const id = site.spotifyPlaylistId;

  return (
    <section id="hlusta" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Hlustaðu fyrir partýið" title="Hlusta" accent="ðu" />

      {id ? (
        <a
          href={`https://open.spotify.com/playlist/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start gap-5 border-2 border-bone bg-base-card p-6 transition-colors hover:bg-amber sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center border-2 border-bone bg-neon text-[color:rgb(var(--c-base))]">
              <Music2 size={26} />
            </span>
            <div>
              <p className="font-display text-2xl uppercase leading-none text-bone sm:text-3xl">
                Öll böndin á einum lista
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-bone-dim">
                {artists.length} bönd · Spotify spilunarlisti
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 border-2 border-bone bg-amber px-5 py-3 font-display text-sm uppercase tracking-wide text-bone transition-colors group-hover:bg-neon group-hover:text-[color:rgb(var(--c-base))]">
            Hlusta á Spotify <ArrowUpRight size={16} />
          </span>
        </a>
      ) : (
        <div
          className="poster-frame relative flex min-h-[200px] flex-col items-center justify-center gap-3 overflow-hidden border-2 border-dashed border-bone bg-base-card px-6 py-12 text-center"
          role="img"
          aria-label="Spilunarlisti væntanlegur"
        >
          <span aria-hidden="true" className="hatch absolute inset-0 opacity-[0.3]" />
          <span className="relative grid h-14 w-14 place-items-center border-2 border-bone text-neon">
            <Music2 size={24} />
          </span>
          <p className="relative font-display text-2xl uppercase text-bone">Spilunarlisti væntanlegur</p>
        </div>
      )}
    </section>
  );
}
