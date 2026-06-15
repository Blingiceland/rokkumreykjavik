"use client";

import * as React from "react";
import { Music2 } from "lucide-react";
import { SectionLabel } from "@/components/schedule";
import { site } from "@/data/site";

/**
 * "Listen before the party" — embeds the Spotify playlist with every act.
 * Until `site.spotifyPlaylistId` is set, renders an on-brand placeholder so
 * the section still reads as intentional.
 */
export function PlaylistSection() {
  const id = site.spotifyPlaylistId;

  return (
    <section id="hlusta" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Hlustaðu fyrir partýið" title="Hlusta" accent="ðu" />

      {id ? (
        <div className="poster-frame overflow-hidden rounded-2xl border border-base-line bg-base-card">
          <iframe
            title={`${site.name} spilunarlisti`}
            src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
            width="100%"
            height="480"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block w-full"
          />
        </div>
      ) : (
        <div
          className="poster-frame relative flex min-h-[260px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-base-line bg-base-card px-6 py-12 text-center"
          role="img"
          aria-label="Spilunarlisti væntanlegur"
        >
          <span
            aria-hidden="true"
            className="hatch absolute inset-0 opacity-[0.05]"
          />
          <span className="relative grid h-14 w-14 place-items-center rounded-full border border-neon/50 text-neon">
            <Music2 size={24} />
          </span>
          <p className="relative font-display text-2xl text-bone">Spilunarlisti væntanlegur</p>
          <p className="relative max-w-md text-bone-dim">
            Öll böndin á einum lista — hlustaðu þér til upphitunar fyrir laugardagana í júlí.
          </p>
        </div>
      )}
    </section>
  );
}
