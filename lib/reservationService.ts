import { sendReservation } from "@/app/actions/reservation";
import type { ReservationValues } from "@/lib/reservations";

/**
 * Reservation submission — the ONE place the booking backend plugs in.
 *
 * Calls the server action in app/actions/reservation.ts, which emails the
 * request to the restaurant through Resend (or runs as a demo when email is
 * not configured). To use a booking provider instead (OpenTable, Resy…),
 * replace the action's body and keep this signature: resolve with a
 * reference, throw an Error with a guest-readable message on failure.
 */

export type ReservationReceipt = {
  reference: string;
  /** False in demo mode — the confirmation then says nothing was sent. */
  delivered: boolean;
};

export async function submitReservation(request: ReservationValues): Promise<ReservationReceipt> {
  const result = await sendReservation(request);
  if (!result.ok) throw new Error(result.message);
  return { reference: result.reference, delivered: result.delivered };
}
