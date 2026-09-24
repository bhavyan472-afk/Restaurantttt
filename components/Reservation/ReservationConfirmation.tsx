"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { reservationCopy } from "@/data/reservations";
import { restaurantData } from "@/data/restaurant";
import { formatDate, formatGuests, type ReservationValues } from "@/lib/reservations";
import styles from "./reservation.module.css";

type ReservationConfirmationProps = {
  request: ReservationValues;
  reference: string;
  onReset: () => void;
};

/**
 * Shown in place of the form after a (demo) submission. The heading takes
 * focus on arrival, so keyboard and screen-reader users land on the result
 * rather than on a form that no longer exists.
 */
export function ReservationConfirmation({ request, reference, onReset }: ReservationConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const rows: [string, string][] = [
    ["Restaurant", restaurantData.name],
    ["Date", formatDate(request.date)],
    ["Time", request.time],
    ["Guests", formatGuests(request.guests)],
    ["Name", request.name.trim()],
    ["Reference", reference],
  ];

  return (
    <div className={styles.confirmation}>
      {/* Ember ring with a check that draws itself; static under reduced motion. */}
      <svg className={styles.confirmationMark} width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true" focusable="false">
        <m.circle
          cx="26"
          cy="26"
          r="24.5"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
        <m.path
          d="M17 26.5l6 6 12-13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <h3 ref={headingRef} tabIndex={-1} className={`label label--accent ${styles.confirmationHeading}`}>
        Reservation request received
      </h3>

      <dl className={styles.summary}>
        {rows.map(([term, detail]) => (
          <div key={term} className={styles.summaryRow}>
            <dt className={styles.summaryTerm}>{term}</dt>
            <dd className={term === "Reference" ? styles.reference : styles.summaryDetail}>{detail}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.welcome}>{reservationCopy.welcome}</p>

      <p className={styles.demoNotice}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 7.25v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="4.9" r="0.8" fill="currentColor" />
        </svg>
        {reservationCopy.demoNotice}
      </p>

      <Button variant="secondary" arrow={false} className={styles.again} onClick={onReset}>
        Make Another Reservation
      </Button>
    </div>
  );
}
