"use client";

import { reservationConfig } from "@/data/reservations";
import type { TimeSlot } from "@/lib/reservations";
import { FieldError, errorId } from "./Field";
import styles from "./reservation.module.css";

type TimeSelectorProps = {
  /** Whether a valid date has been chosen yet. */
  hasDate: boolean;
  slots: TimeSlot[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const TIME_ID = "reservation-time";

/**
 * Time slots as a real radio group styled as chips: Tab enters the group,
 * arrow keys move between times, and taken slots are disabled (so the arrows
 * skip them) and labelled "Booked" in words.
 */
export function TimeSelector({ hasDate, slots, value, error, onChange }: TimeSelectorProps) {
  const hintId = `${TIME_ID}-hint`;
  const offered = slots.some((slot) => slot.available);

  return (
    <fieldset
      id={TIME_ID}
      className={styles.fieldset}
      data-invalid={Boolean(error)}
      aria-describedby={[hintId, error && errorId(TIME_ID)].filter(Boolean).join(" ")}
    >
      <legend className={`label ${styles.fieldLabel}`}>Time</legend>

      <p id={hintId} className={styles.hint}>
        {!hasDate
          ? "Select a date to see available times."
          : offered
            ? `Seatings last about ${reservationConfig.reservationDurationMinutes} minutes.`
            : "No seatings are available on this date."}
      </p>

      {hasDate && slots.length > 0 && (
        <div className={styles.slots}>
          {slots.map((slot) => (
            <label key={slot.time} className={styles.slot} data-available={slot.available}>
              <input
                type="radio"
                name="time"
                value={slot.time}
                className={styles.slotInput}
                checked={value === slot.time}
                disabled={!slot.available}
                onChange={() => onChange(slot.time)}
              />
              <span className={styles.slotTime}>{slot.time}</span>
              {!slot.available && <span className={styles.slotNote}>Booked</span>}
            </label>
          ))}
        </div>
      )}

      <FieldError id={TIME_ID} message={error} />
    </fieldset>
  );
}
