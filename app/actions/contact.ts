"use server";

import { restaurantData } from "@/data/restaurant";
import { validateContact, type ContactValues } from "@/lib/contact";
import { emailEnabled, sendMail } from "@/lib/mail";

export type ContactResult = { ok: true; delivered: boolean } | { ok: false; message: string };

/**
 * Emails a contact-form message to the restaurant via Resend, or returns
 * `delivered: false` in demo mode. Re-validated here: Server Actions are
 * reachable by direct POST.
 */
export async function sendContactMessage(values: ContactValues): Promise<ContactResult> {
  const clean: ContactValues = {
    name: String(values?.name ?? "").trim(),
    email: String(values?.email ?? "").trim(),
    phone: String(values?.phone ?? "").trim(),
    reason: String(values?.reason ?? ""),
    subject: String(values?.subject ?? "").trim(),
    message: String(values?.message ?? "").trim(),
  };
  if (Object.keys(validateContact(clean)).length > 0) {
    return { ok: false, message: "Please check the highlighted fields and try again." };
  }
  if (!emailEnabled()) return { ok: true, delivered: false };

  try {
    await sendMail({
      subject: `Website message: ${clean.subject} — ${clean.name}`,
      replyTo: clean.email,
      rows: [
        ["Name", clean.name],
        ["Email", clean.email],
        ["Phone", clean.phone || "—"],
        ["Topic", clean.reason || "—"],
        ["Subject", clean.subject],
        ["Message", clean.message],
      ],
    });
    return { ok: true, delivered: true };
  } catch (error) {
    console.error("[contact] email failed", error);
    return {
      ok: false,
      message: `We couldn't send your message just now. Please email us at ${restaurantData.email}.`,
    };
  }
}
