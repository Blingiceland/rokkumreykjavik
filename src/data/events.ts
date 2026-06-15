// ---------------------------------------------------------------------------
// Event data for Rokk í Reykjavík.
// Four Saturdays in July. Each day references its artists by id.
// ---------------------------------------------------------------------------

import { EVENT_YEAR } from "./site";
import { artists, type Artist } from "./artists";

export interface RokkEvent {
  id: string;
  /** ISO date. */
  date: string;
  /** Human-readable date, e.g. "Laugardagur 4. júlí". */
  displayDate: string;
  title: string;
  vibe: string;
  artistIds: string[];
  /**
   * Per-artist set times, keyed by artist id, e.g. { "mukka": "21:30" }.
   * The schedule is still being finalised — until an entry exists, that set
   * renders a tidy "væntanlegt" instead of a blank slot.
   */
  setTimes?: Record<string, string>;
}

export const events: RokkEvent[] = [
  {
    id: "day-1",
    date: `${EVENT_YEAR}-07-04`,
    displayDate: "Laugardagur 4. júlí",
    title: "Dagur 1",
    vibe: "",
    artistIds: ["spacestation", "endless-dark", "juno-paul", "mukka"],
  },
  {
    id: "day-2",
    date: `${EVENT_YEAR}-07-11`,
    displayDate: "Laugardagur 11. júlí",
    title: "Dagur 2",
    vibe: "",
    artistIds: ["vintage-caravan", "volcanova", "krummi-og-bjarni", "ultra-magnus"],
  },
  {
    id: "day-3",
    date: `${EVENT_YEAR}-07-18`,
    displayDate: "Laugardagur 18. júlí",
    title: "Dagur 3",
    vibe: "",
    artistIds: ["hoffman", "superserious", "gedbrigdi", "harma"],
  },
  {
    id: "day-4",
    date: `${EVENT_YEAR}-07-25`,
    displayDate: "Laugardagur 25. júlí",
    title: "Dagur 4",
    vibe: "",
    artistIds: ["brain-police", "sot", "duft", "drunga"],
  },
];

/** A set's start time, or null while the schedule is still being finalised. */
export function getSetTime(event: RokkEvent, artistId: string): string | null {
  return event.setTimes?.[artistId] ?? null;
}

export function getEventById(id: string): RokkEvent | undefined {
  return events.find((e) => e.id === id);
}

export function getEventByDate(date: string): RokkEvent | undefined {
  return events.find((e) => e.date === date);
}

/** Resolve an event's artistIds to full Artist objects, in listed order. */
export function getEventArtists(event: RokkEvent): Artist[] {
  return event.artistIds
    .map((id) => artists.find((a) => a.id === id))
    .filter((a): a is Artist => a !== undefined);
}
