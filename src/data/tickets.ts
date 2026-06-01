// ---------------------------------------------------------------------------
// Ticket data for Rokk(um) Reykjavík.
//
// NOTE: These are PUBLIC ticket prices for attendees — entirely separate from
// the internal artist financials, which are never represented anywhere in this
// codebase. Amounts are placeholders; set real prices and URLs when confirmed.
// ---------------------------------------------------------------------------

import { site } from "./site";
import { events } from "./events";

export type TicketKind = "single-night" | "festival-pass";

export interface TicketTier {
  id: string;
  kind: TicketKind;
  name: string;
  /** Short marketing line. */
  description: string;
  /** Price in ISK. Placeholder until confirmed. */
  priceISK: number;
  /** Display string, e.g. "4.900 kr.". */
  priceDisplay: string;
  /** If tied to a specific night, that event id; otherwise null. */
  eventId: string | null;
  /** Purchase link. */
  ticketUrl: string;
  /** Highlight as the recommended option. */
  featured?: boolean;
}

/** Format an ISK amount the Icelandic way: "4.900 kr." */
export function formatISK(amount: number): string {
  return `${amount.toLocaleString("is-IS")} kr.`;
}

const SINGLE_NIGHT_PRICE = 4900;
const FESTIVAL_PASS_PRICE = 14900;

/** One ticket tier per night, plus a full-series pass. */
export const ticketTiers: TicketTier[] = [
  ...events.map((event): TicketTier => ({
    id: `ticket-${event.id}`,
    kind: "single-night",
    name: event.title,
    description: event.displayDate,
    priceISK: SINGLE_NIGHT_PRICE,
    priceDisplay: formatISK(SINGLE_NIGHT_PRICE),
    eventId: event.id,
    ticketUrl: event.ticketUrl,
  })),
  {
    id: "festival-pass",
    kind: "festival-pass",
    name: "Laugardagapassi",
    description: "Aðgangur á alla fjóra laugardagana.",
    priceISK: FESTIVAL_PASS_PRICE,
    priceDisplay: formatISK(FESTIVAL_PASS_PRICE),
    eventId: null,
    ticketUrl: site.defaultTicketUrl,
    featured: true,
  },
];

export function getTicketTierById(id: string): TicketTier | undefined {
  return ticketTiers.find((t) => t.id === id);
}

export function getTicketTierForEvent(eventId: string): TicketTier | undefined {
  return ticketTiers.find((t) => t.eventId === eventId);
}
