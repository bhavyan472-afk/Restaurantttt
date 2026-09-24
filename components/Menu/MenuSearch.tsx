"use client";

import styles from "./menu.module.css";

type MenuSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchIcon() {
  return (
    <svg
      className={styles.searchIcon}
      width="17"
      height="17"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="7.75" cy="7.75" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m11.75 11.75 3.75 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Menu search field.
 *
 * Inline SVG rather than an icon package — the project has no icon dependency
 * and one search glyph does not justify adding it.
 */
export function MenuSearch({ value, onChange }: MenuSearchProps) {
  return (
    <div className={styles.search}>
      <label htmlFor="menu-search" className="visually-hidden">
        Search our menu
      </label>

      <SearchIcon />

      <input
        id="menu-search"
        type="search"
        className={styles.searchInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search our menu…"
        autoComplete="off"
        // The browser's own history dropdown would cover the results.
        spellCheck={false}
      />

      {value !== "" && (
        <button
          type="button"
          className={styles.searchClear}
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
            <path
              d="M1.5 1.5l9 9m0-9l-9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
