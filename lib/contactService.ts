import type { ContactValues } from "@/lib/contact";

/**
 * Contact submission — the ONE place a real message service plugs in.
 *
 * ============================================================================
 *  DEMO ONLY. Nothing is stored, emailed or sent to the restaurant. The UI
 *  says so under the button and on the thank-you panel.
 * ============================================================================
 *
 * To go live, replace the body of `submitContactMessage` with a `fetch` to
 * your own endpoint — a Next.js route handler (e.g. app/api/contact/route.ts)
 * or a server action — which forwards the message to an email provider, form
 * backend, CRM or database (Resend, Postmark, Formspree, HubSpot, Supabase,
 * Firebase…). Keep every key in a server-only environment variable, never in
 * this file or anything under NEXT_PUBLIC_. Re-validate with
 * `validateContact` on the server and add spam protection there.
 *
 * Keep the signature: resolve on success, throw an Error with a guest-readable
 * message on failure — the form already shows that message.
 */
export async function submitContactMessage(message: ContactValues): Promise<void> {
  void message;
  // DEMO ONLY: stand-in for network latency.
  await new Promise((resolve) => setTimeout(resolve, 1200));
}
