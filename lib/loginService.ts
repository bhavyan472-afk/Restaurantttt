import type { LoginValues } from "@/lib/login";

/**
 * Guest login — the ONE place a real auth provider plugs in.
 *
 * ============================================================================
 *  DEMO ONLY. No account is checked, no session is created and nothing is
 *  sent anywhere. The modal says so under the button.
 * ============================================================================
 *
 * To go live, replace the body of `signIn` with a call to your auth provider
 * (Auth.js, Clerk, Supabase Auth, Firebase Auth…) or a `fetch` to your own
 * route handler (e.g. app/api/login/route.ts). Keep secrets server-side,
 * never in this file or anything under NEXT_PUBLIC_, and re-validate with
 * `validateLogin` on the server.
 *
 * Keep the signature: resolve on success, throw an Error with a guest-readable
 * message on failure — the modal already shows that message.
 */
export async function signIn(credentials: LoginValues): Promise<void> {
  void credentials;
  // DEMO ONLY: stand-in for network latency.
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
