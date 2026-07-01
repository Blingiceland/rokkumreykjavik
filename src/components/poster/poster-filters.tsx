/**
 * Shared print-craft primitives for the poster generator. These mirror the
 * hero's silkscreen techniques (xerox edge warp, off-register plates, halftone,
 * grain) so generated posters match the site exactly — and they render fully in
 * headless Chrome (Puppeteer), unlike Satori/@vercel/og.
 */
import * as React from "react";

/** The worn-xerox displacement filter. Mount once per poster (id is global). */
export function PosterFilters() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
      <filter id="xerox">
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.026" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/** Off-register colour plate behind a box (the misaligned second screen). */
export const plate = (ink: string) =>
  ({ filter: "url(#xerox)", boxShadow: `0.05em 0.06em 0 ${ink}` }) as const;

export const xerox = { filter: "url(#xerox)" } as const;

/** Fractal-noise grain, scoped to the poster (the global `.grain` is fixed to
 * the viewport, which would not capture inside a poster element). */
export function PosterGrain() {
  return (
    <span
      aria-hidden="true"
      className="poster-grain pointer-events-none absolute inset-0 z-50"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/** Halftone dot field overlay (multiply on paper, screen on the dark theme). */
export function PosterHalftone({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={
        "halftone pointer-events-none absolute inset-0 " + className
      }
    />
  );
}
