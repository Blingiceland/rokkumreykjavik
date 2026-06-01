// ---------------------------------------------------------------------------
// Sponsor / partner data for Rokk(um) Reykjavík.
// ---------------------------------------------------------------------------

export type SponsorTier = "Aðalstyrktaraðili" | "Styrktaraðili" | "Samstarfsaðili";

/**
 * How to render the logo on the dark site background:
 *  - "invert": black-on-transparent art (Rás 2 SVG); invert turns it white.
 *  - "lighten": light-on-black raster (Michter's); blend hides the black plate.
 *  - "invert-lighten": black-on-white raster (Dillon); invert + blend yields
 *    a white logo on the site bg with no visible plate.
 *  - undefined: render as-is (logo already designed for dark bg).
 */
export type LogoTreatment = "invert" | "lighten" | "invert-lighten";

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  url: string;
  /** Path to logo asset under /public. */
  logo: string;
  treatment?: LogoTreatment;
}

export const sponsors: Sponsor[] = [
  {
    id: "ras2",
    name: "Rás 2",
    tier: "Samstarfsaðili",
    url: "https://www.ruv.is/ras2",
    logo: "/images/logos/ras2.svg",
    treatment: "invert",
  },
  {
    id: "michters",
    name: "Michter's",
    tier: "Styrktaraðili",
    url: "https://michters.com",
    logo: "/images/logos/michters.png",
    treatment: "lighten",
  },
];

/** Tailwind classes for each logo treatment. */
export const treatmentClass: Record<LogoTreatment, string> = {
  invert: "invert",
  lighten: "mix-blend-lighten",
  "invert-lighten": "invert mix-blend-lighten",
};
