"use client";

import { dietaryFilters, type DietaryFilter } from "@/lib/menuFilters";
import styles from "./menu.module.css";

type MenuFiltersProps = {
  dietary: DietaryFilter;
  onDietaryChange: (value: DietaryFilter) => void;
  popularOnly: boolean;
  onPopularChange: (value: boolean) => void;
  /** Number of dishes currently showing. */
  resultCount: number;
  /** True when anything is narrowing the menu. */
  canClear: boolean;
  onClear: () => void;
  /** True when the query is non-empty — changes the count's wording. */
  searching: boolean;
};

/**
 * Secondary filters: dietary, chef's favourites, the result count and the
 * clear control.
 *
 * The dietary buttons use aria-pressed rather than a radiogroup: each is
 * individually reachable by Tab, which suits a short row better than adding a
 * second roving-tabindex widget beside the category tabs.
 */
export function MenuFilters({
  dietary,
  onDietaryChange,
  popularOnly,
  onPopularChange,
  resultCount,
  canClear,
  onClear,
  searching,
}: MenuFiltersProps) {
  const countLabel =
    resultCount === 0
      ? "No dishes found"
      : `${resultCount} ${resultCount === 1 ? "dish" : "dishes"}${
          searching ? " found" : ""
        }`;

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroups}>
        <div className={styles.filterGroup} role="group" aria-label="Dietary">
          <span className={`label ${styles.filterLabel}`} aria-hidden="true">
            Dietary
          </span>
          {dietaryFilters.map((option) => (
            <button
              key={option.id}
              type="button"
              className={styles.chip}
              aria-pressed={dietary === option.id}
              /* "All" is the neutral default, so it gets a quieter selected
                 treatment — the ember fill is reserved for a chip that is
                 actually narrowing the menu. */
              data-neutral={option.id === "all"}
              onClick={() => onDietaryChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.chip} ${styles.chipPopular}`}
          aria-pressed={popularOnly}
          onClick={() => onPopularChange(!popularOnly)}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
            <path
              d="M6 0.5 7.55 4.2l4 .34-3.03 2.62.91 3.9L6 8.99 2.57 11.06l.91-3.9L.45 4.54l4-.34z"
              fill="currentColor"
            />
          </svg>
          Chef&rsquo;s Favourites
        </button>
      </div>

      <div className={styles.resultRow}>
        {/* Polite, so the count is announced after typing settles rather than
            interrupting every keystroke. */}
        <p className={`text-small ${styles.count}`} role="status" aria-live="polite">
          {countLabel}
        </p>

        {canClear && (
          <button type="button" className={styles.clear} onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
