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
    artistIds: ["spacestation", "juno-paul", "mukka", "kriurnar"],
  },
  {
    id: "day-2",
    date: `${EVENT_YEAR}-07-11`,
    displayDate: "Laugardagur 11. júlí",
    title: "Dagur 2",
    vibe: "",
    artistIds: ["vintage-caravan", "volcanova", "harma", "krummi-og-bjarni"],
  },
  {
    id: "day-3",
    date: `${EVENT_YEAR}-07-18`,
    displayDate: "Laugardagur 18. júlí",
    title: "Dagur 3",
    vibe: "",
    artistIds: ["hoffman", "superserious", "gedbrigdi", "petur-ben"],
  },
  {
    id: "day-4",
    date: `${EVENT_YEAR}-07-25`,
    displayDate: "Laugardagur 25. júlí",
    title: "Dagur 4",
    vibe: "",
    artistIds: ["brain-police", "mur", "duft", "drungi", "sot"],
  },
];

/** A set's start time, or null while the schedule is still being finalised. */
export function getSetTime(event: RokkEvent, artistId: string): string | null {
  return event.setTimes?.[artistId] ?? null;
}

/**
 * Provisional set time, derived for a schedule "feel": the headliner (first act
 * in the billing order) closes at 20:00 and each earlier-billed act plays one
 * hour before (so the opener of a five-band night starts at 16:00). Subject to
 * change; an explicit `setTimes` entry always wins.
 */
export function getScheduleTime(event: RokkEvent, artistId: string): string {
  const explicit = getSetTime(event, artistId);
  if (explicit) return explicit;
  const i = event.artistIds.indexOf(artistId);
  if (i < 0) return "";
  return `${20 - i}:00`;
}

/** Earliest set time of a night, e.g. "16:00" for a five-band bill. */
export function getDoorsTime(event: RokkEvent): string {
  return `${20 - (event.artistIds.length - 1)}:00`;
}

/** Day-of-month for each night, e.g. [4, 11, 18, 25]. */
export function getEventDays(): number[] {
  return events.map((e) => Number(e.date.slice(-2)));
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

/** The night's headliner — the first act in set order. */
export function getHeadliner(event: RokkEvent): Artist | undefined {
  return getEventArtists(event)[0];
}
