/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Reservation rules and copy. Opening hours are NOT repeated here — they
 *  come from `openingHours` in data/restaurant.ts, the same source the SEO
 *  structured data uses, so a slot is only offered when a full seating fits
 *  inside that day's hours.
 *
 *  The form is a front-end demo: nothing is sent anywhere. The submission
 *  lives in lib/reservationService.ts and is the single place to connect a
 *  real booking provider or backend.
 */

import { photo } from "./menu";

export type ReservationConfig = {
  minGuests: number;
  maxGuests: number;
  /** Pre-selected party size. */
  defaultGuests: number;
  /** Length of a seating. A slot is offered only if it ends by closing. */
  reservationDurationMinutes: number;
  /** How far ahead of now a same-day booking must be. */
  minLeadMinutes: number;
  /** How far ahead bookings open. */
  maxAdvanceDays: number;
  /** Seating times, "h:mm AM/PM". Filtered per day by the rules above. */
  timeSlots: string[];
  /** Specific dates the restaurant is closed, "YYYY-MM-DD". */
  closedDates: string[];
  /**
   * DEMO ONLY: share of slots shown as fully booked, chosen deterministically
   * from the date so the UI can be seen with real-looking availability. Set
   * to 0 — and replace with live availability — in production.
   */
  demoFullyBookedRate: number;
  /** Prefix for the demo confirmation reference, e.g. "ES-2026-4821". */
  referencePrefix: string;
};

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const reservationConfig: ReservationConfig = {
  minGuests: 1,
  maxGuests: 12,
  defaultGuests: 2,
  reservationDurationMinutes: 90,
  minLeadMinutes: 60,
  maxAdvanceDays: 90,
  timeSlots: [
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ],
  closedDates: [],
  demoFullyBookedRate: 0.15,
  referencePrefix: "ES",
};

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const reservationCopy = {
  eyebrow: "Reservations",
  heading: "Reserve your *table.*",
  intro:
    "Join us for an evening shaped by fire, seasonal ingredients, and thoughtful hospitality.",
  aside: "Good food deserves good company.",
  hoursLabel: "Dinner Hours",
  noteLabel: "Reservation Note",
  note: `For parties larger than ${reservationConfig.maxGuests}, please contact the restaurant directly.`,
  image: {
    // The client's uploaded photography — see `photo` in data/menu.ts.
    src: photo.cremeBrulee,
    alt: "A vanilla crème brûlée with a spoon breaking its caramelised crust, berries on top and candles softly lit behind.",
  },
  demoNotice:
    "This is a demo confirmation. Connect your booking provider or backend before using this website in production.",
  welcome: "We look forward to welcoming you.",
};
