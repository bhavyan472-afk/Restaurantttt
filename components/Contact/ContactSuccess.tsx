"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import formStyles from "@/components/Reservation/reservation.module.css";
import { Button } from "@/components/ui/Button";
import { contactCopy } from "@/data/contact";
import styles from "./contact.module.css";

/**
 * Shown in place of the form after sending. In demo mode (no email set up)
 * it says plainly that nothing reached the restaurant. The heading takes
 * focus on arrival, so keyboard and screen-reader users land on the result.
 */
export function ContactSuccess({ delivered, onReset }: { delivered: boolean; onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const copy = contactCopy.success;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className={formStyles.confirmation}>
      {/* Ember ring with a check that draws itself; static under reduced motion. */}
      <svg className={formStyles.confirmationMark} width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true" focusable="false">
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

      <h3 ref={headingRef} tabIndex={-1} className={`text-sub ${styles.successHeading}`}>
        {copy.heading}
      </h3>

      <div className={styles.successText}>
        {(delivered ? copy.lines : copy.demoLines).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <Button variant="secondary" arrow={false} className={formStyles.again} onClick={onReset}>
        {copy.again}
      </Button>
    </div>
  );
}
