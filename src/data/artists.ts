// ---------------------------------------------------------------------------
// Artist data for Rokk(um) Reykjavík.
//
// PRIVACY: This model intentionally has NO field for any artist financial
// figure of any kind (fees, costs, payments, internal amounts). Such data must
// never appear on the public site. A build-time guard
// (scripts/check-no-financials.mjs) enforces this.
//
// Media links and images use placeholders where real values are not yet known.
// Replace `PLACEHOLDER_*` values and the `shortBio` text as content arrives.
// ---------------------------------------------------------------------------

import { EVENT_YEAR, site } from "./site";

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
  ticketUrl: string;
}

/**
 * Slugs that have a real cover image on disk at
 * `public/images/artists/<slug>.jpg`. Acts not listed here fall back to the
 * placeholder. Keep in sync with the files in that folder.
 */
const SLUGS_WITH_IMAGE = new Set<string>([
  "spacestation",
  "endless-dark",
  "juno-paul",
  "mukka",
  "vintage-caravan",
  "volcanova",
  "ultra-magnus",
  "hoffman",
  "superserious",
  "gedbrigdi",
  "brain-police",
  "krummi-og-bjarni",
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
}

/** Lineup grouped by night. Order within a night is set order. */
const lineup: { date: string; displayDate: string; acts: ArtistSeed[] }[] = [
  {
    date: `${EVENT_YEAR}-07-04`,
    displayDate: "4. júlí",
    acts: [
      { name: "Spacestation", genre: "Rock", videoId: "E8n6pXizcHE" },
      { name: "Endless Dark", genre: "Post-Hardcore", videoId: "OqJ5hS0lnB0" },
      { name: "Juno Paul", genre: "Indie" },
      { name: "Mukka", genre: "Alternative" },
    ],
  },
  {
    date: `${EVENT_YEAR}-07-11`,
    displayDate: "11. júlí",
    acts: [
      { name: "Vintage Caravan", genre: "Hard Rock", videoId: "odL0bhBluPE" },
      { name: "Volcanova", genre: "Stoner Rock", videoId: "c4VfzuomC8E" },
      { name: "Krummi & Bjarni", genre: "Rock", videoId: "xAnmhNy_BdQ" },
      { name: "Ultra Magnus", genre: "Heavy Rock" },
    ],
  },
  {
    date: `${EVENT_YEAR}-07-18`,
    displayDate: "18. júlí",
    acts: [
      { name: "hOFFMAN", genre: "Alternative" },
      { name: "Superserious", genre: "Indie Rock", videoId: "h8mKULHRmvg" },
      { name: "Geðbrigði", genre: "Post-Punk" },
      { name: "Harma", genre: "Alternative" },
    ],
  },
  {
    date: `${EVENT_YEAR}-07-25`,
    displayDate: "25. júlí",
    acts: [
      { name: "Brain Police", genre: "Stoner Rock", videoId: "FToInB6v4ac" },
      { name: "Sót", genre: "Rock" },
      { name: "Duft", genre: "Punk Rock" },
      { name: "Drunga", genre: "Heavy Rock" },
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
      image: SLUGS_WITH_IMAGE.has(slug)
        ? `/images/artists/${slug}.jpg`
        : PLACEHOLDER_IMAGE,
      spotifyUrl: PLACEHOLDER_SPOTIFY,
      youtubeUrl: PLACEHOLDER_YOUTUBE,
      soundcloudUrl: PLACEHOLDER_SOUNDCLOUD,
      instagramUrl: PLACEHOLDER_INSTAGRAM,
      videoId: act.videoId ?? "",
      ticketUrl: site.defaultTicketUrl,
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
