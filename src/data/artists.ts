// ---------------------------------------------------------------------------
// Artist data for Rokk í Reykjavík.
//
// PRIVACY: This model intentionally has NO field for any artist financial
// figure of any kind (fees, costs, payments, internal amounts). Such data must
// never appear on the public site. A build-time guard
// (scripts/check-no-financials.mjs) enforces this.
//
// Media links and images use placeholders where real values are not yet known.
// Replace `PLACEHOLDER_*` values and the `shortBio` text as content arrives.
// ---------------------------------------------------------------------------

import { EVENT_YEAR } from "./site";

/** Standard placeholder bio. Do not invent factual biographies. */
export const PLACEHOLDER_BIO =
  "Nánari upplýsingar, myndbönd og hljóðdæmi koma hér inn fljótlega.";

/** Placeholder media values. Swap for real embed/links when available. */
const PLACEHOLDER_IMAGE = "/images/artists/placeholder.svg";
const PLACEHOLDER_SPOTIFY = "https://open.spotify.com/";
const PLACEHOLDER_YOUTUBE = "https://www.youtube.com/";
const PLACEHOLDER_SOUNDCLOUD = "https://soundcloud.com/";
const PLACEHOLDER_INSTAGRAM = "https://www.instagram.com/";

export interface Artist {
  id: string;
  name: string;
  slug: string;
  /** ISO date of the night this artist plays. */
  date: string;
  /** Human-readable date, e.g. "4. júlí". */
  displayDate: string;
  genre: string;
  shortBio: string;
  image: string;
  spotifyUrl: string;
  youtubeUrl: string;
  soundcloudUrl: string;
  instagramUrl: string;
  /** YouTube video ID (e.g. "abc123XYZ"). Empty -> no video available yet. */
  videoId: string;
  /** A festival headliner — a big draw, shown highlighted in the hero banner. */
  headliner: boolean;
  /** Top billing — the very top tier of headliners (biggest in the banner). */
  topBilling: boolean;
  /** CSS object-position for the cover crop (e.g. "center top"). Omitted -> center. */
  imagePosition?: string;
  /** Render the name verbatim instead of forcing uppercase (e.g. "hOFFMAN"). */
  keepCase?: boolean;
}

/**
 * Slugs that have a real cover image on disk at
 * `public/images/artists/<slug>.jpg`. Acts not listed here fall back to the
 * placeholder. Keep in sync with the files in that folder.
 */
const SLUGS_WITH_IMAGE = new Set<string>([
  "spacestation",
  "juno-paul",
  "mukka",
  "vintage-caravan",
  "volcanova",
  "harma",
  "hoffman",
  "superserious",
  "gedbrigdi",
  "brain-police",
  "krummi-og-bjarni",
  "duft",
  "drungi",
  "petur-ben",
  "sot",
]);

/** Build a URL-safe slug from an artist name (handles Icelandic glyphs). */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ð/g, "d")
    .replace(/þ/g, "th")
    .replace(/æ/g, "ae")
    .replace(/ö/g, "o")
    .replace(/[áàä]/g, "a")
    .replace(/[éèë]/g, "e")
    .replace(/[íìï]/g, "i")
    .replace(/[óòô]/g, "o")
    .replace(/[úùü]/g, "u")
    .replace(/ý/g, "y")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "og")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ArtistSeed {
  name: string;
  genre: string;
  /** Optional YouTube video ID for in-page video embed. */
  videoId?: string;
  /** Explicit image path under /public; overrides the slug-based default. */
  image?: string;
  /** Real media links. Omit to fall back to the disabled placeholder chip. */
  spotifyUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  instagramUrl?: string;
  /** Mark a band as a festival headliner (highlighted in the hero banner). */
  headliner?: boolean;
  /** Top-tier headliner (printed biggest, alone at the top of the banner). */
  topBilling?: boolean;
  /** CSS object-position for the cover crop (e.g. "center top"). */
  imagePosition?: string;
  /** Render the name verbatim instead of forcing uppercase (e.g. "hOFFMAN"). */
  keepCase?: boolean;
}

/**
 * Lineup grouped by night. Order within a night is set order — the FIRST act
 * each night is the headliner (rendered largest/top in the schedule). Nights
 * may have a varying number of acts (e.g. 25 July has five).
 */
const lineup: { date: string; displayDate: string; acts: ArtistSeed[] }[] = [
  {
    date: `${EVENT_YEAR}-07-04`,
    displayDate: "4. júlí",
    acts: [
      {
        name: "Spacestation",
        genre: "Rock",
        headliner: true,
        videoId: "E8n6pXizcHE",
        spotifyUrl: "https://open.spotify.com/artist/0tC0VODFMyQLqetgajNbbh",
      },
      {
        name: "Juno Paul",
        genre: "Indie",
        spotifyUrl: "https://open.spotify.com/artist/3H4roNkMDnWHhrcVGHSRGs",
      },
      {
        name: "Mukka",
        genre: "Alternative",
        spotifyUrl: "https://open.spotify.com/artist/0ZyPf367VBQPjzOiUISIZW",
      },
      { name: "Kríurnar", genre: "" },
    ],
  },
  {
    date: `${EVENT_YEAR}-07-11`,
    displayDate: "11. júlí",
    acts: [
      {
        name: "Vintage Caravan",
        genre: "Hard Rock",
        topBilling: true,
        imagePosition: "center top",
        videoId: "odL0bhBluPE",
        spotifyUrl: "https://open.spotify.com/artist/61MH29rMIyOfuK7KXQznzX",
      },
      {
        name: "Volcanova",
        genre: "Stoner Rock",
        videoId: "c4VfzuomC8E",
        spotifyUrl: "https://open.spotify.com/artist/5PxsSQ4uYOq6svb417ravK",
      },
      { name: "Harma", genre: "Alternative" },
      {
        name: "Krummi & Bjarni",
        genre: "Rock",
        videoId: "xAnmhNy_BdQ",
        spotifyUrl: "https://open.spotify.com/artist/20R75zrEiZGUgJPIdILRdr",
      },
    ],
  },
  {
    date: `${EVENT_YEAR}-07-18`,
    displayDate: "18. júlí",
    acts: [
      {
        name: "hOFFMAN",
        genre: "Alternative",
        headliner: true,
        keepCase: true,
        imagePosition: "center 35%",
        youtubeUrl: "https://www.youtube.com/@hoffmanband238",
      },
      {
        name: "Superserious",
        genre: "Indie Rock",
        videoId: "h8mKULHRmvg",
        spotifyUrl: "https://open.spotify.com/artist/34T4k3cBCZQWauiohowYjS",
        youtubeUrl: "https://www.youtube.com/@superserious_band",
      },
      { name: "Geðbrigði", genre: "Post-Punk" },
      { name: "Pétur Ben", genre: "", imagePosition: "center 22%" },
    ],
  },
  {
    date: `${EVENT_YEAR}-07-25`,
    displayDate: "25. júlí",
    acts: [
      {
        name: "Brain Police",
        genre: "Stoner Rock",
        topBilling: true,
        videoId: "FToInB6v4ac",
        image: "/images/artists/brain1.jpg",
        spotifyUrl: "https://open.spotify.com/artist/3u8Bmkzs6rer0AirAa87iR",
      },
      { name: "Múr", genre: "", topBilling: true },
      { name: "Duft", genre: "Punk Rock" },
      { name: "Drungi", genre: "" },
      { name: "Sót", genre: "Rock" },
    ],
  },
];

export const artists: Artist[] = lineup.flatMap(({ date, displayDate, acts }) =>
  acts.map((act): Artist => {
    const slug = slugify(act.name);
    return {
      id: slug,
      name: act.name,
      slug,
      date,
      displayDate,
      genre: act.genre,
      shortBio: PLACEHOLDER_BIO,
      image:
        act.image ??
        (SLUGS_WITH_IMAGE.has(slug) ? `/images/artists/${slug}.jpg` : PLACEHOLDER_IMAGE),
      spotifyUrl: act.spotifyUrl ?? PLACEHOLDER_SPOTIFY,
      youtubeUrl: act.youtubeUrl ?? PLACEHOLDER_YOUTUBE,
      soundcloudUrl: act.soundcloudUrl ?? PLACEHOLDER_SOUNDCLOUD,
      instagramUrl: act.instagramUrl ?? PLACEHOLDER_INSTAGRAM,
      videoId: act.videoId ?? "",
      headliner: act.headliner ?? act.topBilling ?? false,
      topBilling: act.topBilling ?? false,
      imagePosition: act.imagePosition,
      keepCase: act.keepCase,
    };
  })
);

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtistsByDate(date: string): Artist[] {
  return artists.filter((a) => a.date === date);
}
