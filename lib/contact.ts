import { contactCopy } from "@/data/contact";
import { EMAIL_PATTERN } from "@/lib/utils";

/**
 * Contact form rules: the values it collects and how they are validated.
 *
 * Pure functions, so the same checks can run in a route handler or server
 * action once a real service is connected (see lib/contactService.ts). The
 * client-side checks are for the guest, not for security.
 */

export type ContactValues = {
  name: string;
  email: string;
  /** Optional. */
  phone: string;
  /** Optional; one of contactCopy.form.reasons, or "". */
  reason: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const NAME_MAX_LENGTH = 100;
export const SUBJECT_MAX_LENGTH = 120;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;

export const emptyContact: ContactValues = {
  name: "",
  email: "",
  phone: "",
  reason: "",
  subject: "",
  message: "",
};

const PHONE_CHARS = /^[+\d\s().-]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Please keep your name under ${NAME_MAX_LENGTH} characters.`;
  }

  const email = values.email.trim();
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  // Optional — checked only when something has been typed.
  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "").length;
  if (phone && (!PHONE_CHARS.test(phone) || digits < 7 || digits > 15)) {
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  }

  if (values.reason && !contactCopy.form.reasons.includes(values.reason)) {
    errors.reason = "Please choose one of the listed topics.";
  }

  const subject = values.subject.trim();
  if (!subject) errors.subject = "Please add a subject.";
  else if (subject.length > SUBJECT_MAX_LENGTH) {
    errors.subject = `Please keep the subject under ${SUBJECT_MAX_LENGTH} characters.`;
  }

  const message = values.message.trim();
  if (!message) errors.message = "Please tell us how we can help.";
  else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please write a little more — at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`;
  }

  return errors;
}
