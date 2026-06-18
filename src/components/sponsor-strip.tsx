import { sponsors } from "@/data/sponsors";
import { SponsorMark } from "@/components/sponsor-mark";

/** Thin sponsor band under the nav — every partner, small, in one ink (Thule
 * keeps its red). Scrolls horizontally on narrow screens. */
export function SponsorStrip() {
  return (
    <div className="border-t border-base-line bg-base">
      <div className="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-1.5 sm:justify-center sm:gap-8 sm:px-6">
        {sponsors.map((s) => (
          <a
            key={s.id}
            href="#samstarf"
            aria-label={s.name}
            className="shrink-0 opacity-75 transition-opacity hover:opacity-100"
          >
            <SponsorMark sponsor={s} className="h-4 w-auto sm:h-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
