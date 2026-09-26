"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { reservationConfig as config } from "@/data/reservations";
import { easeOut } from "@/lib/animations";
import { submitReservation } from "@/lib/reservationService";
import {
  REQUESTS_MAX_LENGTH,
  bookingWindow,
  getTimeSlots,
  validateDate,
  validateReservation,
  type ReservationErrors,
  type ReservationValues,
} from "@/lib/reservations";
import { DATE_ID, DateSelector } from "./DateSelector";
import { Field, errorId } from "./Field";
import { GUESTS_ID, GuestSelector } from "./GuestSelector";
import { ReservationConfirmation } from "./ReservationConfirmation";
import { TIME_ID, TimeSelector } from "./TimeSelector";
import styles from "./reservation.module.css";

type FieldName = keyof ReservationValues;

const initialValues: ReservationValues = {
  date: "",
  time: "",
  guests: config.defaultGuests,
  name: "",
  email: "",
  phone: "",
  requests: "",
};

/** Visual and focus order — the first invalid field in it takes focus. */
const FIELD_ORDER: FieldName[] = ["date", "time", "guests", "name", "email", "phone", "requests"];

const ids: Record<FieldName, string> = {
  date: DATE_ID,
  time: TIME_ID,
  guests: GUESTS_ID,
  name: "reservation-name",
  email: "reservation-email",
  phone: "reservation-phone",
  requests: "reservation-requests",
};

/** Where focus goes for each field when it is the first error. */
function focusField(field: FieldName) {
  const root = document.getElementById(ids[field]);
  if (!root) return;
  if (field === "time") {
    // The checked slot, else the first open one, else the group itself.
    const radio =
      root.querySelector<HTMLInputElement>("input:checked") ??
      root.querySelector<HTMLInputElement>("input:not(:disabled)");
    (radio ?? root).focus();
    return;
  }
  if (field === "guests") {
    root.parentElement?.querySelector<HTMLButtonElement>("button")?.focus();
    return;
  }
  root.focus();
}

type Status =
  | { kind: "editing" }
  | { kind: "submitting" }
  | { kind: "confirmed"; request: ReservationValues; reference: string; delivered: boolean }
  | { kind: "failed"; message: string };

/**
 * The reservation form.
 *
 * Errors are derived, never stored: a field shows its error once it has been
 * left (blurred) or once submit has been tried, and clears the moment it is
 * fixed. The browser's own validation is off (noValidate) so every message
 * is ours, inline, and announced.
 */
type ReservationFormProps = {
  /** Email delivery is configured (resolved on the server). */
  emailEnabled: boolean;
};

export function ReservationForm({ emailEnabled }: ReservationFormProps) {
  const [values, setValues] = useState<ReservationValues>(initialValues);
  const [touched, setTouched] = useState<Set<FieldName>>(new Set());
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "editing" });
  /** Set by reset(): focus the date field once the form has re-entered. */
  const focusDateOnEnter = useRef(false);

  /* "Now" is read after mount, never during render: the page is prerendered,
     so a render-time date would be the build's, not the guest's. */
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const bookable = now ? bookingWindow(now) : undefined;
  const dateError = now ? validateDate(values.date, now) : undefined;
  const slots = useMemo(
    () => (now && values.date && !dateError ? getTimeSlots(values.date, now) : []),
    [now, values.date, dateError],
  );

  const allErrors: ReservationErrors = useMemo(
    () => (now ? validateReservation(values, now) : {}),
    [values, now],
  );
  const shown = (field: FieldName) =>
    attempted || touched.has(field) ? allErrors[field] : undefined;

  const set = <K extends FieldName>(field: K, value: ReservationValues[K]) =>
    setValues((current) => ({ ...current, [field]: value }));
  const touch = (field: FieldName) =>
    setTouched((current) => (current.has(field) ? current : new Set(current).add(field)));

  const changeDate = (date: string) => {
    // A date input reports "" while a date is half-typed; wait for a full one
    // (or the blur) before showing an error.
    if (date) touch("date");
    setValues((current) => {
      // Keep the chosen time only if the new date still offers it.
      const stillOpen =
        now && getTimeSlots(date, now).some((s) => s.time === current.time && s.available);
      return { ...current, date, time: stillOpen ? current.time : "" };
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status.kind === "submitting" || !now) return;

    // Re-check against the clock at the moment of submitting (a slot can
    // pass its lead time while the form is open), and show that result.
    const current = new Date();
    setNow(current);
    const errors = validateReservation(values, current);
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    setAttempted(true);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const { reference, delivered } = await submitReservation(values);
      setStatus({ kind: "confirmed", request: values, reference, delivered });
    } catch (error) {
      setStatus({
        kind: "failed",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  function reset() {
    setValues(initialValues);
    setTouched(new Set());
    setAttempted(false);
    setNow(new Date());
    setStatus({ kind: "editing" });
    // The form only mounts once the confirmation has animated out, so the
    // focus is handed over when its entrance finishes (onAnimationComplete).
    focusDateOnEnter.current = true;
  }

  const errorCount = Object.keys(allErrors).length;
  const submitting = status.kind === "submitting";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.kind === "confirmed" ? (
        <m.div
          key="confirmed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <ReservationConfirmation
            request={status.request}
            reference={status.reference}
            delivered={status.delivered}
            onReset={reset}
          />
        </m.div>
      ) : (
        <m.form
          key="form"
          className={styles.form}
          noValidate
          aria-labelledby="reservation-form-title"
          aria-busy={submitting}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: easeOut } }}
          onAnimationComplete={() => {
            if (!focusDateOnEnter.current) return;
            focusDateOnEnter.current = false;
            focusField("date");
          }}
        >
          <div className={styles.formHeader}>
            <h3 id="reservation-form-title" className={styles.formTitle}>
              Book a table
            </h3>
            <p className={styles.hint}>All fields are required unless marked optional.</p>
          </div>

          <div className={styles.row}>
            <DateSelector
              value={values.date}
              min={bookable?.min}
              max={bookable?.max}
              error={shown("date")}
              onChange={changeDate}
              onBlur={() => touch("date")}
            />
            <GuestSelector
              value={values.guests}
              min={config.minGuests}
              max={config.maxGuests}
              error={shown("guests")}
              onChange={(guests) => {
                touch("guests");
                set("guests", guests);
              }}
            />
          </div>

          <TimeSelector
            hasDate={Boolean(values.date) && !dateError}
            slots={slots}
            value={values.time}
            error={shown("time")}
            onChange={(time) => {
              touch("time");
              set("time", time);
            }}
          />

          <Field id={ids.name} label="Full Name" error={shown("name")}>
            <input
              id={ids.name}
              name="name"
              type="text"
              className={styles.input}
              placeholder="Your name"
              autoComplete="name"
              required
              value={values.name}
              aria-invalid={Boolean(shown("name"))}
              aria-describedby={shown("name") ? errorId(ids.name) : undefined}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => touch("name")}
            />
          </Field>

          <div className={styles.row}>
            <Field id={ids.email} label="Email" error={shown("email")}>
              <input
                id={ids.email}
                name="email"
                type="email"
                inputMode="email"
                className={styles.input}
                placeholder="you@example.com"
                autoComplete="email"
                spellCheck={false}
                required
                value={values.email}
                aria-invalid={Boolean(shown("email"))}
                aria-describedby={shown("email") ? errorId(ids.email) : undefined}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => touch("email")}
              />
            </Field>

            <Field id={ids.phone} label="Phone" error={shown("phone")}>
              <input
                id={ids.phone}
                name="phone"
                type="tel"
                inputMode="tel"
                className={styles.input}
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                required
                value={values.phone}
                aria-invalid={Boolean(shown("phone"))}
                aria-describedby={shown("phone") ? errorId(ids.phone) : undefined}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => touch("phone")}
              />
            </Field>
          </div>

          <Field id={ids.requests} label="Special Requests" optional error={shown("requests")}>
            <textarea
              id={ids.requests}
              name="requests"
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Birthday, anniversary, dietary requirements, seating preference..."
              rows={3}
              maxLength={REQUESTS_MAX_LENGTH}
              value={values.requests}
              aria-invalid={Boolean(shown("requests"))}
              aria-describedby={[`${ids.requests}-count`, shown("requests") && errorId(ids.requests)]
                .filter(Boolean)
                .join(" ")}
              onChange={(e) => set("requests", e.target.value)}
              onBlur={() => touch("requests")}
            />
            <p id={`${ids.requests}-count`} className={styles.counter}>
              {values.requests.length} / {REQUESTS_MAX_LENGTH}
            </p>
          </Field>

          <div className={styles.submitRow}>
            {/* One summary line for screen readers after a failed attempt;
                the specifics are inline beside each field. */}
            <p className={styles.formStatus} role="alert">
              {status.kind === "failed"
                ? status.message
                : attempted && errorCount > 0
                  ? `Please check ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.`
                  : ""}
            </p>

            <Button
              type="submit"
              className={styles.submit}
              arrow={!submitting}
              aria-disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Confirming…
                </>
              ) : (
                "Confirm Reservation"
              )}
            </Button>

            {!emailEnabled && (
              <p className={styles.demoNote}>
                Demo booking form — requests are not sent to the restaurant.
              </p>
            )}
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}
