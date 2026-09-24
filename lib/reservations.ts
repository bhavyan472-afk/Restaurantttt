import { reservationConfig as config } from "@/data/reservations";
import { openingHours, type OpeningHours } from "@/data/restaurant";
import { EMAIL_PATTERN } from "@/lib/utils";

/**
 * Reservation rules: dates, availability and validation.
 *
 * Pure functions over data/reservations.ts and data/restaurant.ts, so the
 * form stays a thin UI and the same rules can run on a server later. Dates
 * are local "YYYY-MM-DD" strings throughout — never Date objects in state,
 * never UTC — so a guest's "Saturday" is always their Saturday.
 */

export type ReservationValues = {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  requests: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;

export type TimeSlot = {
  time: string;
  /** False when the slot is taken (demo availability). */
  available: boolean;
};

export const REQUESTS_MAX_LENGTH = 500;

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/* --- Dates --------------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, "0");

export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Local midnight for a "YYYY-MM-DD" string, or null if it is not a real date. */
export function parseISODate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  // Rejects 2026-02-31 and friends, which Date would silently roll over.
  return date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}

/** The first and last bookable dates, as "YYYY-MM-DD". */
export function bookingWindow(now = new Date()): { min: string; max: string } {
  const last = new Date(now.getFullYear(), now.getMonth(), now.getDate() + config.maxAdvanceDays);
  return { min: toISODate(now), max: toISODate(last) };
}

/** "Saturday, October 17" — the year is added only when it is not this year. */
export function formatDate(iso: string, now = new Date()): string {
  const date = parseISODate(iso);
  if (!date) return iso;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    ...(date.getFullYear() !== now.getFullYear() && { year: "numeric" }),
  });
}

export function formatGuests(count: number): string {
  return `${count} ${count === 1 ? "Guest" : "Guests"}`;
}

/* --- Time slots ---------------------------------------------------------- */

/** "7:30 PM" → minutes after midnight. */
export function slotToMinutes(slot: string): number {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(slot.trim());
  if (!match) return NaN;
  const [, h, m, period] = match;
  const hours = (Number(h) % 12) + (period.toUpperCase() === "PM" ? 12 : 0);
  return hours * 60 + Number(m);
}

/** "17:00" → minutes after midnight. */
const clockToMinutes = (value: string) => {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
};

function hoursFor(date: Date): OpeningHours | undefined {
  const day = WEEKDAYS[date.getDay()];
  return openingHours.find((entry) => entry.schemaDays.includes(day));
}

/**
 * DEMO ONLY: a stable pseudo-random "fully booked" flag per date and slot,
 * so availability looks real and does not change between renders.
 */
function demoIsBooked(iso: string, slot: string): boolean {
  if (config.demoFullyBookedRate <= 0) return false;
  let hash = 0;
  for (const char of `${iso}|${slot}`) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % 1000) / 1000 < config.demoFullyBookedRate;
}

/**
 * The slots offered on a date: those whose whole seating fits inside that
 * day's opening hours, and — today — that start far enough from now. Taken
 * slots are included with `available: false`, so the UI can show them.
 */
export function getTimeSlots(iso: string, now = new Date()): TimeSlot[] {
  const date = parseISODate(iso);
  if (!date || config.closedDates.includes(iso)) return [];

  const hours = hoursFor(date);
  if (!hours?.opens || !hours.closes) return [];

  const opens = clockToMinutes(hours.opens);
  const closes = clockToMinutes(hours.closes);
  const isToday = iso === toISODate(now);
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + config.minLeadMinutes : 0;

  return config.timeSlots
    .filter((slot) => {
      const start = slotToMinutes(slot);
      return (
        start >= opens &&
        start + config.reservationDurationMinutes <= closes &&
        start >= earliest
      );
    })
    .map((slot) => ({ time: slot, available: !demoIsBooked(iso, slot) }));
}

/* --- Validation ---------------------------------------------------------- */

const PHONE_CHARS = /^[+\d\s().-]+$/;

export function validateDate(iso: string, now = new Date()): string | undefined {
  if (!iso) return "Please select a reservation date.";
  if (!parseISODate(iso)) return "Please enter a valid date.";
  const { min, max } = bookingWindow(now);
  // ISO dates compare correctly as strings.
  if (iso < min) return "Please choose today or a later date.";
  if (iso > max) {
    return `Reservations open ${config.maxAdvanceDays} days ahead. Please choose an earlier date.`;
  }
  if (getTimeSlots(iso, now).every((slot) => !slot.available)) {
    return "There are no tables left on this date. Please choose another.";
  }
  return undefined;
}

export function validateReservation(
  values: ReservationValues,
  now = new Date(),
): ReservationErrors {
  const errors: ReservationErrors = {};

  const dateError = validateDate(values.date, now);
  if (dateError) errors.date = dateError;

  if (!values.time) {
    errors.time = "Please select a time.";
  } else if (
    !dateError &&
    !getTimeSlots(values.date, now).some((s) => s.time === values.time && s.available)
  ) {
    errors.time = "That time is no longer available. Please choose another.";
  }

  if (
    !Number.isInteger(values.guests) ||
    values.guests < config.minGuests ||
    values.guests > config.maxGuests
  ) {
    errors.guests = `Please choose between ${config.minGuests} and ${config.maxGuests} guests.`;
  }

  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "").length;
  if (!phone) errors.phone = "Please enter a phone number.";
  else if (!PHONE_CHARS.test(phone) || digits < 7 || digits > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (values.requests.length > REQUESTS_MAX_LENGTH) {
    errors.requests = `Please keep special requests under ${REQUESTS_MAX_LENGTH} characters.`;
  }

  return errors;
}
