// ---------------------------------------------------------------------------
// Site-wide configuration for Rokk(um) Reykjavík.
// ---------------------------------------------------------------------------

/** Year of the concert series. Configurable in one place. */
export const EVENT_YEAR = 2026;

export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  description: string;
  contactEmail: string;
  defaultTicketUrl: string;
}

export const site: SiteConfig = {
  name: "Rokk(um) Reykjavík",
  domain: "rokkumreykjavik.is",
  url: "https://rokkumreykjavik.is",
  description: "Fjórir laugardagar. Sextán bönd. Rokkum Reykjavík.",
  contactEmail: "info@rokkumreykjavik.is",
  defaultTicketUrl: "/tickets",
};

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
