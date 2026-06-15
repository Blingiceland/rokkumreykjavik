// ---------------------------------------------------------------------------
// Site-wide configuration for Rokk í Reykjavík.
// ---------------------------------------------------------------------------

/** Year of the concert series. Configurable in one place. */
export const EVENT_YEAR = 2026;

export interface SiteConfig {
  name: string;
  /** Year shown as subtext under the wordmark and appended in metadata. */
  yearLabel: string;
  /** Who presents the festival, e.g. "Dillon og Rás 2". */
  presenter: string;
  domain: string;
  url: string;
  description: string;
  contactEmail: string;
  /**
   * Spotify playlist ID for the "listen before the party" embed.
   * Paste the ID from a playlist share link
   * (open.spotify.com/playlist/<THIS_PART>). Empty -> renders a "væntanlegt"
   * placeholder instead of the player.
   */
  spotifyPlaylistId: string;
}

export const site: SiteConfig = {
  // Heritage name — borrows the cult 1982 documentary "Rokk í Reykjavík".
  // Used with Rás 2's blessing. Treat the wordmark with weight, not as a pun.
  name: "Rokk í Reykjavík",
  yearLabel: String(EVENT_YEAR),
  presenter: "Dillon og Rás 2",
  domain: "rokkumreykjavik.is",
  url: "https://rokkumreykjavik.is",
  description: "Fjórir laugardagar. Sextán bönd. Ein borg sem þarf að heyrast.",
  contactEmail: "info@rokkumreykjavik.is",
  spotifyPlaylistId: "",
};

/** Short presenter credit, set as type (no logos), e.g.
 * "Dillon og Rás 2 í samstarfi kynna". */
export const presenterCredit = `${site.presenter} í samstarfi kynna`;

/** Full presenter lockup for metadata, e.g.
 * "Dillon og Rás 2 í samstarfi kynna: Rokk í Reykjavík 2026". */
export const presenterLockup = `${presenterCredit}: ${site.name} ${site.yearLabel}`;

export interface VenueConfig {
  /** Full descriptive name shown in hero/about. */
  name: string;
  /** Short label for compact contexts (metadata strip, badges). */
  shortName: string;
  streetAddress: string;
  locality: string;
  /** External maps link. */
  mapUrl: string;
}

export const venue: VenueConfig = {
  name: "Garðurinn á Dillon",
  shortName: "Dillon",
  streetAddress: "Laugavegur 30",
  locality: "101 Reykjavík",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Dillon%20Laugavegur%2030%20Reykjav%C3%ADk",
};
