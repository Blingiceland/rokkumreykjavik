/**
 * Sponsor lockup for every generated poster. Two reserved strips so they can
 * never collide with the artwork:
 *   - top: Rás 2 + Thule (lead sponsor, prominent) + Four Roses (a touch smaller)
 *   - bottom: Rás 2 + the full sponsor row, all together
 *
 * Logos print in a single ink (`.sponsor-ink` → black on the paper theme, cream
 * on `svart`), matching the site. Thule keeps its red (treatment "keep").
 *
 * Sized in `cqmin` (1% of the poster's *shorter* side) so the strips stay a sane
 * height in both portrait and landscape. For every portrait format width ≤ height,
 * so cqmin == cqw and nothing changes; only the landscape fb* formats differ.
 */
import * as React from "react";
import { sponsors } from "@/data/sponsors";
import { isDarkTheme, type PosterTheme } from "./band-poster";

/** Rás 2 mark for the given theme: the supplied white PNG on dark grounds
 *  (rendered as-is), the inking SVG on light grounds (flattened to black). */
function ras2Mark(theme: PosterTheme): { src: string; keep: boolean } {
  return isDarkTheme(theme)
    ? { src: "/images/logos/Ras2_White.png", keep: true }
    : { src: "/images/logos/ras2.svg", keep: false };
}

function byId(id: string) {
  return sponsors.find((s) => s.id === id);
}

/** One logo, inked unless it opts to keep its own colour (Thule). */
function Logo({ src, alt, h, keep = false }: { src: string; alt: string; h: number; keep?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={keep ? "" : "sponsor-ink"}
      style={{ height: `${h}cqmin`, width: "auto", objectFit: "contain" }}
    />
  );
}

/** A hairline ink divider between logo clusters. */
function Rule({ h }: { h: number }) {
  return <span aria-hidden className="shrink-0 bg-bone" style={{ height: `${h}cqmin`, width: "0.3cqmin" }} />;
}

export function PosterSponsorTop({ theme = "bleikt" }: { theme?: PosterTheme }) {
  const thule = byId("thule");
  const fourRoses = byId("four-roses");
  const ras2 = ras2Mark(theme);
  return (
    <div className="relative z-[45] flex items-center justify-between gap-[4cqmin] border-b-[0.35cqmin] border-bone px-[5cqmin] py-[2.4cqmin]">
      {/* Rás 2 (presenter, leads the festival) and Thule (lead sponsor) are the
          two prominent marks; Four Roses sits a step smaller. */}
      <Logo src={ras2.src} keep={ras2.keep} alt="Rás 2" h={5.2} />
      <div className="flex items-center gap-[3cqmin]">
        {thule && <Logo src={thule.logo} alt={thule.name} h={6.4} keep />}
        {fourRoses && <Logo src={fourRoses.logo} alt={fourRoses.name} h={3.6} />}
      </div>
    </div>
  );
}

export function PosterSponsorBottom({ theme = "bleikt" }: { theme?: PosterTheme }) {
  const ras2 = ras2Mark(theme);
  return (
    <div className="relative z-[45] flex flex-wrap items-center justify-center gap-x-[3.4cqmin] gap-y-[1.6cqmin] border-t-[0.35cqmin] border-bone px-[5cqmin] py-[2.6cqmin]">
      <Logo src={ras2.src} keep={ras2.keep} alt="Rás 2" h={4} />
      <Rule h={4.2} />
      {sponsors.map((s) => (
        <Logo key={s.id} src={s.logo} alt={s.name} h={s.id === "thule" ? 4 : 2.8} keep={s.treatment === "keep"} />
      ))}
    </div>
  );
}
