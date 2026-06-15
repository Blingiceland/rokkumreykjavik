// ---------------------------------------------------------------------------
// Sponsor / partner data for Rokk í Reykjavík.
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
  /**
   * Path to logo asset under /public. Empty string -> the SponsorSection
   * renders a tidy text wordmark placeholder instead of a broken image
   * (used until a brand confirms and supplies artwork).
   */
  logo: string;
  treatment?: LogoTreatment;
}

// Rás 2 is no longer listed here — it is now a presenter (with Dillon) and
// appears in the hero lockup instead. Viking is a placeholder for the lead
// beer sponsor, pending confirmation and logo artwork.
export const sponsors: Sponsor[] = [
  {
    id: "viking",
    name: "VÍKING",
    tier: "Aðalstyrktaraðili",
    url: "#",
    logo: "",
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
