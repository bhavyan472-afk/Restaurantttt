import { restaurant } from "@/content/restaurant";

/**
 * Email delivery through Resend (https://resend.com) — SERVER ONLY. Imported
 * by the server actions in app/actions/, never by client code, so the API
 * key stays on the server.
 *
 * Needs, in .env.local (or the host's environment settings):
 *   RESEND_API_KEY   the Resend API key
 *   RESEND_FROM      optional sender on a domain verified in Resend, e.g.
 *                    "Ember & Sage <bookings@emberandsage.com>"
 * and content/restaurant.ts → reservations.notifyEmail (the recipient).
 * Without them the forms run as demos and say so.
 */

/** Where the website's emails go (bookings and contact messages). */
export const notifyEmail = restaurant.reservations.notifyEmail.trim();

/** True when email can actually be sent. Safe to call at build time. */
export function emailEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && notifyEmail);
}

type Mail = {
  subject: string;
  /** Label/value rows, rendered as a simple table and as plain text. */
  rows: [string, string][];
  /** The guest's address, so the restaurant can simply press Reply. */
  replyTo?: string;
};

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

export async function sendMail({ subject, rows, replyTo }: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !notifyEmail) throw new Error("Email is not configured.");

  const from =
    process.env.RESEND_FROM || `${restaurant.brand.name} Website <onboarding@resend.dev>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html =
    '<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">' +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="color:#666;vertical-align:top">${escapeHtml(label)}</td>` +
          `<td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("") +
    "</table>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [notifyEmail],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
