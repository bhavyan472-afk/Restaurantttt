/**
 * Reservation rules and wording. The rules come from content/restaurant.ts →
 * reservations (edit them there); opening hours come from `hours`, so a slot
 * is only offered when a full seating fits inside that day's hours.
 *
 * Bookings are emailed to `reservations.notifyEmail` by the server action in
 * app/actions/reservation.ts when RESEND_API_KEY is set; otherwise the form
 * runs as a demo and says so.
 */

import { restaurant } from "@/content/restaurant";

const settings = restaurant.reservations;

export type ReservationConfig = {
  minGuests: number;
  maxGuests: number;
  defaultGuests: number;
  reservationDurationMinutes: number;
  minLeadMinutes: number;
  maxAdvanceDays: number;
  timeSlots: string[];
  closedDates: string[];
  /**
   * Share of slots shown as fully booked, chosen from the date so the demo
   * looks lived-in. Always 0 on a real client site — there is no live
   * availability, so every slot inside opening hours is offered.
   */
  demoFullyBookedRate: number;
  referencePrefix: string;
};

export const reservationConfig: ReservationConfig = {
  minGuests: settings.minGuests,
  maxGuests: settings.maxGuests,
  defaultGuests: settings.defaultGuests,
  reservationDurationMinutes: settings.durationMinutes,
  minLeadMinutes: settings.minLeadMinutes,
  maxAdvanceDays: settings.maxAdvanceDays,
  timeSlots: settings.timeSlots,
  closedDates: settings.closedDates,
  demoFullyBookedRate: restaurant.demo ? 0.15 : 0,
  referencePrefix: settings.referencePrefix,
};

export const reservationCopy = {
  eyebrow: settings.copy.eyebrow,
  heading: settings.copy.heading,
  intro: settings.copy.intro,
  aside: settings.copy.aside,
  image: settings.copy.image,
  hoursLabel: "Dinner Hours",
  noteLabel: "Reservation Note",
  note: `For parties larger than ${settings.maxGuests}, please contact the restaurant directly.`,
  demoNotice:
    "This is a demo confirmation — nothing was sent. Add RESEND_API_KEY and reservations.notifyEmail to send bookings to the restaurant.",
  sentNotice:
    "Your request has been sent to the restaurant. They will confirm your table by email.",
  welcome: "We look forward to welcoming you.",
};
