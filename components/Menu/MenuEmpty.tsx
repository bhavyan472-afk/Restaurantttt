import styles from "./menu.module.css";

/**
 * Shown when no dish matches. Framed as a next step rather than an error —
 * nothing has gone wrong, the menu just does not have that dish.
 */
export function MenuEmpty({ onClear }: { onClear: () => void }) {
  return (
    <div className={styles.empty}>
      <svg
        className={styles.emptyMark}
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="14.5" cy="14.5" r="9.75" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="m21.5 21.5 7 7"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="m11 11 7 7m0-7-7 7"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>

      <p className={`text-sub ${styles.emptyTitle}`}>No dishes found</p>

      <p className={`text-body ${styles.emptyBody}`}>
        We couldn&rsquo;t find a dish matching your search. Try another
        ingredient, category, or filter.
      </p>

      <button type="button" className={styles.emptyAction} onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
