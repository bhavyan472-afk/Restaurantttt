import { sendContactMessage } from "@/app/actions/contact";
import type { ContactValues } from "@/lib/contact";

/**
 * Contact submission — calls the server action in app/actions/contact.ts,
 * which emails the message to the restaurant through Resend (or runs as a
 * demo when email is not configured). Resolves with whether it was really
 * sent; throws an Error with a guest-readable message on failure.
 */
export async function submitContactMessage(message: ContactValues): Promise<{ delivered: boolean }> {
  const result = await sendContactMessage(message);
  if (!result.ok) throw new Error(result.message);
  return { delivered: result.delivered };
}
