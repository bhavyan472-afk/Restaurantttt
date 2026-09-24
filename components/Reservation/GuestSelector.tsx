"use client";

import { AnimatePresence, m } from "motion/react";
import { useRef } from "react";
import { formatGuests } from "@/lib/reservations";
import { FieldError, errorId } from "./Field";
import styles from "./reservation.module.css";

type GuestSelectorProps = {
  value: number;
  min: number;
  max: number;
  error?: string;
  onChange: (value: number) => void;
};

export const GUESTS_ID = "reservation-guests";

function Glyph({ plus }: { plus?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d={plus ? "M2 7h10M7 2v10" : "M2 7h10"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Stepper: − / count / +. The buttons use aria-disabled rather than
 * `disabled` at the limits, so focus is not dropped when the count reaches
 * one end. The count is a live region, and the number slides in the
 * direction of the change.
 */
export function GuestSelector({ value, min, max, error, onChange }: GuestSelectorProps) {
  const labelId = `${GUESTS_ID}-label`;
  const direction = useRef(1);
  const atMin = value <= min;
  const atMax = value >= max;

  const step = (delta: 1 | -1) => {
    const next = value + delta;
    if (next < min || next > max) return;
    direction.current = delta;
    onChange(next);
  };

  return (
    <div
      className={styles.field}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={error ? errorId(GUESTS_ID) : undefined}
      data-invalid={Boolean(error)}
    >
      <span id={labelId} className={`label ${styles.fieldLabel}`}>
        Guests
      </span>

      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.stepperButton}
          aria-label="Remove a guest"
          aria-disabled={atMin}
          onClick={() => step(-1)}
        >
          <Glyph />
        </button>

        <output id={GUESTS_ID} className={styles.stepperValue} aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={value}
              className={styles.stepperNumber}
              initial={{ opacity: 0, y: 10 * direction.current }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 * direction.current }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {formatGuests(value)}
            </m.span>
          </AnimatePresence>
        </output>

        <button
          type="button"
          className={styles.stepperButton}
          aria-label="Add a guest"
          aria-disabled={atMax}
          onClick={() => step(1)}
        >
          <Glyph plus />
        </button>
      </div>

      <input type="hidden" name="guests" value={value} />
      <FieldError id={GUESTS_ID} message={error} />
    </div>
  );
}
