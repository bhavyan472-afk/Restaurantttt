"use client";

import { formatDate } from "@/lib/reservations";
import { Field, errorId } from "./Field";
import styles from "./reservation.module.css";

type DateSelectorProps = {
  value: string;
  /** First and last bookable dates; undefined until mounted (see form). */
  min?: string;
  max?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export const DATE_ID = "reservation-date";

/**
 * The native date input: keyboard-accessible and screen-reader-friendly out
 * of the box, with the platform's own calendar on phones — no picker library.
 * `min`/`max` stop past dates in the picker; typed dates are caught by
 * validation. The chosen date is echoed in words beneath, so
 * "10/17/2026" is never the only confirmation.
 */
export function DateSelector({ value, min, max, error, onChange, onBlur }: DateSelectorProps) {
  const echoId = `${DATE_ID}-echo`;

  return (
    <Field id={DATE_ID} label="Date" error={error}>
      <input
        id={DATE_ID}
        name="date"
        type="date"
        className={styles.input}
        value={value}
        min={min}
        max={max}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${echoId} ${errorId(DATE_ID)}` : echoId}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />
      <p id={echoId} className={styles.hint}>
        {value && !error ? formatDate(value) : "Choose an evening"}
      </p>
    </Field>
  );
}
