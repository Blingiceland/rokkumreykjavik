// ---------------------------------------------------------------------------
// Thule takeover — swappable looks for the password-gated /thule page only.
// Each variant maps to a [data-look] block in globals.css (Icelandic flag inks)
// plus a few layout flags the takeover hero reads. NOT used on the public site.
// ---------------------------------------------------------------------------

export interface ThuleVariant {
  /** Stable id, also used as the localStorage value. */
  id: string;
  /** data-look value applied to <html>. */
  look: string;
  /** Short label shown in the switcher. */
  name: string;
  /** One-line description of the treatment. */
  blurb: string;
  /** Show the frosted-glass photo in the hero. */
  showGlass: boolean;
  /** Which glass photo to use. */
  glass: "clean" | "frost-1" | "frost-2";
  /** Overlay the Nordic-cross flag motif behind the hero. */
  showCross: boolean;
  /** Lean on the silkscreen grit (grain + halftone field) in the hero. */
  grit: boolean;
  /** THULE logo file (in /public/images/thule) used as the big lockup. */
  logo: "thule-solid" | "thule-outline" | "thule-tagline";
  /** Full-bleed hero background treatment. "none" = token ground only. */
  bg?: "none" | "glass-wall" | "flag-wall";
  /** Hero composition. "ransom" = the cut-up note; the others fully redesign it. */
  layout?: "ransom" | "can" | "xerox";
}

export const thuleVariants: ThuleVariant[] = [
  {
    id: "fani",
    look: "thule-fani",
    name: "Fáni",
    blurb: "Djúpblár grunnur, hvítt blek, rauður spot. Krossmótíf. Þjóðlegt og stolt.",
    showGlass: false,
    glass: "clean",
    showCross: true,
    grit: false,
    logo: "thule-outline",
  },
  {
    id: "frost",
    look: "thule-frost",
    name: "Ískaldur",
    blurb: "Ískaldur ljós grunnur, blátt blek, glasið í forgrunni. „Alltaf léttur.“",
    showGlass: true,
    glass: "frost-1",
    showCross: false,
    grit: false,
    logo: "thule-tagline",
  },
  {
    id: "dos",
    look: "thule-dos",
    name: "Rauða dósin",
    blurb: "Thule-rauður ræður öllu, hvít knockouts, blár spot. Hávær takeover.",
    showGlass: true,
    glass: "clean",
    showCross: false,
    grit: false,
    logo: "thule-solid",
  },
  {
    id: "silki",
    look: "thule-silki",
    name: "Silki-Thule",
    blurb: "Heldur silkiprent-gritinu á pappír — en pressað í fánablek.",
    showGlass: false,
    glass: "clean",
    showCross: false,
    grit: true,
    logo: "thule-solid",
  },

  // --- Nýr bakgrunnur (sama ransom-hetja, nýr veggur að baki) ---------------
  {
    id: "frost-vegg",
    look: "thule-fani",
    name: "Frostveggur",
    blurb: "Ísköld Thule fyllir allan bakgrunninn — ransom-hetjan flýtur ofan á.",
    showGlass: false,
    glass: "frost-1",
    showCross: false,
    grit: false,
    logo: "thule-tagline",
    bg: "glass-wall",
    layout: "ransom",
  },
  {
    id: "flagg-vegg",
    look: "thule-fani",
    name: "Fánaveggur",
    blurb: "Risastór íslenskur fáni þekur bakgrunninn. Þjóðlegt og hávært.",
    showGlass: false,
    glass: "clean",
    showCross: false,
    grit: false,
    logo: "thule-outline",
    bg: "flag-wall",
    layout: "ransom",
  },

  // --- Heildar-endurhönnun (ný hetju-uppbygging, sama pönk-Thule andi) -------
  {
    id: "dosin",
    look: "thule-dos",
    name: "Dósin",
    blurb: "Dósamiði: THULE stórt, „alltaf léttur“, lineup eins og innihaldslýsing.",
    showGlass: true,
    glass: "clean",
    showCross: false,
    grit: false,
    logo: "thule-solid",
    bg: "none",
    layout: "can",
  },
  {
    id: "dosin-bla",
    look: "thule-fani",
    name: "Dósin (blá)",
    blurb: "Dósamiði á djúpbláum grunni — hvít typa, rauðir aksentar. Sama miði, kalt blek.",
    showGlass: true,
    glass: "frost-1",
    showCross: false,
    grit: false,
    logo: "thule-outline",
    bg: "none",
    layout: "can",
  },
  {
    id: "ponk",
    look: "thule-xerox",
    name: "Pönk-xerox",
    blurb: "Ljósrituð klippimynd — svart/rautt, sundurtætt pönk-zine. Hámarks attitude.",
    showGlass: false,
    glass: "clean",
    showCross: false,
    grit: true,
    logo: "thule-solid",
    bg: "none",
    layout: "xerox",
  },
];

export const defaultThuleVariant =
  thuleVariants.find((v) => v.id === "dosin") ?? thuleVariants[0];

/** Tokens exposed in the switcher's live colour editor (label + CSS var). */
export const editableTokens: { label: string; varName: string }[] = [
  { label: "Grunnur", varName: "--c-base" },
  { label: "Blek", varName: "--c-bone" },
  { label: "Spot (neon)", varName: "--c-neon" },
  { label: "Chip (amber)", varName: "--c-amber" },
  { label: "Aukalitur", varName: "--c-neon-cyan" },
];

/** The raw Thule brand palette — quick-apply swatches for playing. */
export const thulePalette: { label: string; rgb: [number, number, number] }[] = [
  { label: "Djúpblár", rgb: [0, 47, 112] },
  { label: "Blár", rgb: [0, 61, 120] },
  { label: "Thule rauður", rgb: [148, 41, 46] },
  { label: "Ljósblár", rgb: [156, 205, 251] },
  { label: "Hvítur", rgb: [245, 246, 248] },
];
