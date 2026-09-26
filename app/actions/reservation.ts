"use server";

import { reservationConfig } from "@/data/reservations";
import { restaurantData } from "@/data/restaurant";
import { emailEnabled, sendMail } from "@/lib/mail";
import {
  formatDate,
  formatGuests,
  parseISODate,
  validateReservation,
  type ReservationValues,
} from "@/lib/reservations";

export type ReservationResult =
  | { ok: true; reference: string; /** False in demo mode: nothing was sent. */ delivered: boolean }
  | { ok: false; message: string };

/** "ES-2026-4821": prefix, the reservation's year, four random digits. */
function createReference(isoDate: string): string {
  const random = new Uint16Array(1);
  crypto.getRandomValues(random);
  return `${reservationConfig.referencePrefix}-${isoDate.slice(0, 4)}-${1000 + (random[0] % 9000)}`;
}

/**
 * Emails a booking request to the restaurant (reservations.notifyEmail in
 * content/restaurant.ts) via Resend. Without email configured it returns a
 * reference and `delivered: false`, and the form shows the demo notice.
 *
 * Server Actions are reachable by direct POST, so everything is validated
 * again here. Time-of-day rules (lead time, past dates) depend on the
 * guest's own clock and are enforced in the form; the server allows a day
 * of leeway for time zones and checks everything else strictly.
 */
export async function sendReservation(values: ReservationValues): Promise<ReservationResult> {
  const clean: ReservationValues = {
    date: String(values?.date ?? ""),
    time: String(values?.time ?? ""),
    guests: Number(values?.guests),
    name: String(values?.name ?? "").trim(),
    email: String(values?.email ?? "").trim(),
    phone: String(values?.phone ?? "").trim(),
    requests: String(values?.requests ?? "").trim(),
  };

  const errors = validateReservation(clean, new Date(Date.now() - 86_400_000));
  if (parseISODate(clean.date)) delete errors.date;
  if (reservationConfig.timeSlots.includes(clean.time)) delete errors.time;
  if (clean.name.length > 100) errors.name = "Please keep your name under 100 characters.";
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please check the highlighted details and try again." };
  }

  const reference = createReference(clean.date);
  if (!emailEnabled()) return { ok: true, reference, delivered: false };

  try {
    await sendMail({
      subject: `Table request: ${formatDate(clean.date)}, ${clean.time}, ${formatGuests(clean.guests)} — ${clean.name}`,
      replyTo: clean.email,
      rows: [
        ["Reference", reference],
        ["Date", formatDate(clean.date)],
        ["Time", clean.time],
        ["Guests", formatGuests(clean.guests)],
        ["Name", clean.name],
        ["Email", clean.email],
        ["Phone", clean.phone],
        ["Special requests", clean.requests || "—"],
      ],
    });
    return { ok: true, reference, delivered: true };
  } catch (error) {
    console.error("[reservation] email failed", error);
    return {
      ok: false,
      message: `We couldn't send your request just now. Please try again, or call us on ${restaurantData.phoneDisplay}.`,
    };
  }
}
