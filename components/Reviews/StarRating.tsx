"use client";

import { m } from "motion/react";
import { easeOut } from "@/lib/animations";
import { formatRating } from "@/lib/reviews";
import styles from "./reviews.module.css";

/** Lucide "star" (ISC licence), drawn inline — the project has no icon package. */
const STAR =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  /** Stars fade up one by one when scrolled into view. */
  animate?: boolean;
  className?: string;
};

/**
 * Star rating. One accessible image — "4.5 out of 5 stars" — rather than
 * five unlabeled glyphs; the stars themselves are hidden from assistive
 * tech. Partial stars (4.5, 4.9) are a filled star clipped to the fraction
 * over an outlined one, so they never depend on colour alone.
 */
export function StarRating({ rating, max = 5, size = 14, animate = false, className }: StarRatingProps) {
  const label = `${formatRating(rating)} out of ${max} stars`;

  return (
    <span role="img" aria-label={label} className={`${styles.stars} ${className ?? ""}`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <m.span
            key={i}
            className={styles.star}
            style={{ width: size, height: size }}
            aria-hidden="true"
            initial={animate ? { opacity: 0, scale: 0.7 } : false}
            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: easeOut }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" className={styles.starEmpty} focusable="false">
              <path d={STAR} />
            </svg>
            {fill > 0 && (
              <span className={styles.starFill} style={{ width: `${fill * 100}%` }}>
                <svg width={size} height={size} viewBox="0 0 24 24" focusable="false">
                  <path d={STAR} />
                </svg>
              </span>
            )}
          </m.span>
        );
      })}
    </span>
  );
}
