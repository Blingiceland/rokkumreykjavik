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

const RAS2 = "/images/logos/ras2.svg";

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

export function PosterSponsorTop() {
  const thule = byId("thule");
  const fourRoses = byId("four-roses");
  return (
    <div className="relative z-[45] flex items-center justify-between gap-[4cqmin] border-b-[0.35cqmin] border-bone px-[5cqmin] py-[2.4cqmin]">
      {/* Rás 2 (presenter, leads the festival) and Thule (lead sponsor) are the
          two prominent marks; Four Roses sits a step smaller. */}
      <Logo src={RAS2} alt="Rás 2" h={5.2} />
      <div className="flex items-center gap-[3cqmin]">
        {thule && <Logo src={thule.logo} alt={thule.name} h={6.4} keep />}
        {fourRoses && <Logo src={fourRoses.logo} alt={fourRoses.name} h={3.6} />}
      </div>
    </div>
  );
}

export function PosterSponsorBottom() {
  return (
    <div className="relative z-[45] flex flex-wrap items-center justify-center gap-x-[3.4cqmin] gap-y-[1.6cqmin] border-t-[0.35cqmin] border-bone px-[5cqmin] py-[2.6cqmin]">
      <Logo src={RAS2} alt="Rás 2" h={4} />
      <Rule h={4.2} />
      {sponsors.map((s) => (
        <Logo key={s.id} src={s.logo} alt={s.name} h={s.id === "thule" ? 4 : 2.8} keep={s.treatment === "keep"} />
      ))}
    </div>
  );
}
