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
 *  - "keep": render with original colours, no invert/blend (Thule's red art on
 *    a transparent bg — reads as red ink on both the paper and dark themes).
 *  - "ink": flatten the logo to a single ink (black on paper, cream on the dark
 *    look) via `.sponsor-ink`. Keeps every partner visually consistent.
 *  - undefined: render as-is (logo already designed for dark bg).
 */
export type LogoTreatment = "invert" | "lighten" | "invert-lighten" | "keep" | "ink";

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
// appears in the hero lockup instead. Thule is the lead (beer) sponsor and is
// also elevated into the presenter lockup in the hero.
export const sponsors: Sponsor[] = [
  {
    id: "thule",
    name: "Thule",
    tier: "Aðalstyrktaraðili",
    url: "#",
    logo: "/images/logos/thule.png",
    treatment: "keep",
  },
  {
    id: "four-roses",
    name: "Four Roses",
    tier: "Styrktaraðili",
    url: "#",
    logo: "/images/logos/four-roses.png",
    treatment: "ink",
  },
  {
    id: "helix7",
    name: "Helix7 Vodka",
    tier: "Styrktaraðili",
    url: "#",
    logo: "/images/logos/helix7.png",
    treatment: "ink",
  },
  {
    id: "askur",
    name: "Askur Yggdrasil",
    tier: "Styrktaraðili",
    url: "#",
    logo: "/images/logos/askur.png",
    treatment: "ink",
  },
  {
    id: "icelandic-glacial",
    name: "Icelandic Glacial",
    tier: "Styrktaraðili",
    url: "#",
    logo: "/images/logos/icelandic-glacial.png",
    treatment: "ink",
  },
  {
    id: "michters",
    name: "Michter's",
    tier: "Styrktaraðili",
    url: "https://michters.com",
    logo: "/images/logos/michters.png",
    treatment: "ink",
  },
];

/**
 * Per-treatment classes. On the paper theme every sponsor logo is printed dark
 * by the shared `.sponsor-logo` rule (invert + multiply), so no extra
 * per-treatment class is needed here.
 */
export const treatmentClass: Record<LogoTreatment, string> = {
  invert: "",
  lighten: "",
  "invert-lighten": "",
  keep: "",
  ink: "sponsor-ink",
};
