"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Field, errorId } from "@/components/Reservation/Field";
import formStyles from "@/components/Reservation/reservation.module.css";
import { Button } from "@/components/ui/Button";
import { contactCopy } from "@/data/contact";
import { easeOut } from "@/lib/animations";
import {
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  SUBJECT_MAX_LENGTH,
  emptyContact,
  validateContact,
  type ContactValues,
} from "@/lib/contact";
import { submitContactMessage } from "@/lib/contactService";
import { ContactSuccess } from "./ContactSuccess";
import styles from "./contact.module.css";

const copy = contactCopy.form;

type FieldName = keyof ContactValues;

/** Visual and focus order — the first invalid field in it takes focus. */
const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "reason", "subject", "message"];

const ids: Record<FieldName, string> = {
  name: "contact-name",
  email: "contact-email",
  phone: "contact-phone",
  reason: "contact-reason",
  subject: "contact-subject",
  message: "contact-message",
};

/** How long "Message Sent" stays on the button before the thank-you panel. */
const SENT_HOLD_MS = 900;

type Status =
  | { kind: "editing" }
  | { kind: "sending" }
  | { kind: "sent"; delivered: boolean }
  | { kind: "thanked"; delivered: boolean }
  | { kind: "failed"; message: string };

/**
 * The contact form. Messages are emailed to the restaurant when email is
 * configured (app/actions/contact.ts), otherwise it runs as a labelled demo.
 *
 * Same pattern as the reservation form, whose controls it shares: errors are
 * derived, never stored; a field shows its error once it has been left or
 * once submit has been tried, and clears the moment it is fixed. noValidate
 * turns the browser's own bubbles off so every message is ours and inline.
 */
export function ContactForm({ emailEnabled }: { emailEnabled: boolean }) {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [touched, setTouched] = useState<Set<FieldName>>(new Set());
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "editing" });
  /** Set by reset(): focus the name field once the form has re-entered. */
  const focusNameOnEnter = useRef(false);

  const allErrors = useMemo(() => validateContact(values), [values]);
  const shown = (field: FieldName) =>
    attempted || touched.has(field) ? allErrors[field] : undefined;

  const set = (field: FieldName, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));
  const touch = (field: FieldName) =>
    setTouched((current) => (current.has(field) ? current : new Set(current).add(field)));

  /* Hold "Message Sent" on the button for a beat, then show the panel. */
  useEffect(() => {
    if (status.kind !== "sent") return;
    const { delivered } = status;
    const timer = window.setTimeout(() => setStatus({ kind: "thanked", delivered }), SENT_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  const busy = status.kind === "sending" || status.kind === "sent";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    const errors = validateContact(values);
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    setAttempted(true);
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const { delivered } = await submitContactMessage(values);
      setStatus({ kind: "sent", delivered });
    } catch (error) {
      setStatus({
        kind: "failed",
        message:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  }

  function reset() {
    setValues(emptyContact);
    setTouched(new Set());
    setAttempted(false);
    setStatus({ kind: "editing" });
    // The form mounts only once the panel has animated out, so focus is
    // handed over when its entrance finishes (onAnimationComplete).
    focusNameOnEnter.current = true;
  }

  /** Props every text control shares: value, validity and error wiring. */
  const control = (field: FieldName, extraDescribedBy?: string) => ({
    id: ids[field],
    name: field,
    value: values[field],
    "aria-invalid": Boolean(shown(field)),
    "aria-describedby":
      [extraDescribedBy, shown(field) && errorId(ids[field])].filter(Boolean).join(" ") ||
      undefined,
    onBlur: () => touch(field),
  });

  const errorCount = Object.keys(allErrors).length;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.kind === "thanked" ? (
        <m.div
          key="thanked"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <ContactSuccess delivered={status.delivered} onReset={reset} />
        </m.div>
      ) : (
        <m.form
          key="form"
          className={formStyles.form}
          noValidate
          aria-labelledby="contact-form-title"
          aria-busy={busy}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: easeOut } }}
          onAnimationComplete={() => {
            if (!focusNameOnEnter.current) return;
            focusNameOnEnter.current = false;
            document.getElementById(ids.name)?.focus();
          }}
        >
          <div className={formStyles.formHeader}>
            <h3 id="contact-form-title" className={formStyles.formTitle}>
              {copy.title}
            </h3>
            <p className={formStyles.hint}>{copy.hint}</p>
          </div>

          <div className={formStyles.row}>
            <Field id={ids.name} label={copy.labels.name} error={shown("name")}>
              <input
                {...control("name")}
                type="text"
                className={formStyles.input}
                placeholder={copy.placeholders.name}
                autoComplete="name"
                maxLength={NAME_MAX_LENGTH}
                required
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>

            <Field id={ids.email} label={copy.labels.email} error={shown("email")}>
              <input
                {...control("email")}
                type="email"
                inputMode="email"
                className={formStyles.input}
                placeholder={copy.placeholders.email}
                autoComplete="email"
                spellCheck={false}
                required
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
          </div>

          <div className={formStyles.row}>
            <Field id={ids.phone} label={copy.labels.phone} optional error={shown("phone")}>
              <input
                {...control("phone")}
                type="tel"
                inputMode="tel"
                className={formStyles.input}
                placeholder={copy.placeholders.phone}
                autoComplete="tel"
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>

            <Field id={ids.reason} label={copy.labels.reason} optional error={shown("reason")}>
              <div className={styles.selectWrap} data-empty={values.reason === ""}>
                <select
                  {...control("reason")}
                  className={formStyles.input}
                  onChange={(e) => {
                    touch("reason");
                    set("reason", e.target.value);
                  }}
                >
                  <option value="">{copy.placeholders.reason}</option>
                  {copy.reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Field>
          </div>

          <Field id={ids.subject} label={copy.labels.subject} error={shown("subject")}>
            <input
              {...control("subject")}
              type="text"
              className={formStyles.input}
              placeholder={copy.placeholders.subject}
              maxLength={SUBJECT_MAX_LENGTH}
              required
              onChange={(e) => set("subject", e.target.value)}
            />
          </Field>

          <Field id={ids.message} label={copy.labels.message} error={shown("message")}>
            <textarea
              {...control("message", `${ids.message}-count`)}
              className={`${formStyles.input} ${formStyles.textarea}`}
              placeholder={copy.placeholders.message}
              rows={5}
              maxLength={MESSAGE_MAX_LENGTH}
              required
              onChange={(e) => set("message", e.target.value)}
            />
            <p id={`${ids.message}-count`} className={formStyles.counter}>
              {values.message.length} / {MESSAGE_MAX_LENGTH}
            </p>
          </Field>

          <div className={formStyles.submitRow}>
            {/* One summary line after a failed attempt; the specifics are
                inline beside each field. */}
            <p className={formStyles.formStatus} role="alert">
              {status.kind === "failed"
                ? status.message
                : attempted && errorCount > 0
                  ? `Please check ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.`
                  : ""}
            </p>

            {/* Progress in words for screen readers; the button shows it too. */}
            <p className="visually-hidden" role="status">
              {status.kind === "sending" ? "Sending your message…" : status.kind === "sent" ? "Message sent." : ""}
            </p>

            <Button
              type="submit"
              className={`${formStyles.submit} ${styles.submit}`}
              arrow={status.kind === "editing" || status.kind === "failed"}
              aria-disabled={busy}
              data-sent={status.kind === "sent"}
            >
              {status.kind === "sending" ? (
                <>
                  <span className={formStyles.spinner} aria-hidden="true" />
                  {copy.submitting}
                </>
              ) : status.kind === "sent" ? (
                <>
                  <svg className={styles.sentMark} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {copy.sent}
                </>
              ) : (
                copy.submit
              )}
            </Button>

            {!emailEnabled && <p className={formStyles.demoNote}>{copy.demoNote}</p>}
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}
