import { reservationConfig } from "@/data/reservations";
import type { ReservationValues } from "@/lib/reservations";

/**
 * Reservation submission — the ONE place a real booking system plugs in.
 *
 * ============================================================================
 *  DEMO ONLY. Nothing is stored, emailed or sent to the restaurant. The UI
 *  says so on the confirmation card.
 * ============================================================================
 *
 * To go live, replace the body of `submitReservation` with a call to the
 * booking provider or backend (a Next.js route handler / server action,
 * Supabase, Firebase, OpenTable, Resy…). Keep the signature: resolve with the
 * provider's reference on success, throw an Error with a guest-readable
 * message on failure — the form already shows that message. Re-validate on
 * the server; the client-side checks are for the guest, not for security.
 */

export type ReservationReceipt = {
  reference: string;
};

export async function submitReservation(
  request: ReservationValues,
): Promise<ReservationReceipt> {
  // DEMO ONLY: stand-in for network latency.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { reference: createDemoReference(request.date) };
}

/** "ES-2026-4821": prefix, the reservation's year, four random digits. */
function createDemoReference(isoDate: string): string {
  const year = isoDate.slice(0, 4);
  const random = new Uint16Array(1);
  crypto.getRandomValues(random);
  const digits = String(1000 + (random[0] % 9000));
  return `${reservationConfig.referencePrefix}-${year}-${digits}`;
}
