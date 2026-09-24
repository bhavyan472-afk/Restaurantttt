"use client";

import { useRef } from "react";
import { categoryFilters, type CategoryFilter } from "@/lib/menuFilters";
import styles from "./menu.module.css";

type MenuCategoriesProps = {
  active: CategoryFilter;
  onChange: (id: CategoryFilter) => void;
};

/**
 * Category switcher, built as a real ARIA tablist.
 *
 * Roving tabindex: only the selected tab is in the tab order, and Arrow /
 * Home / End move between them — so the whole set costs one Tab stop rather
 * than nine, which is the expected behaviour for tabs.
 */
export function MenuCategories({ active, onChange }: MenuCategoriesProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    if (!tabs) return;
    const next = (index + tabs.length) % tabs.length;
    tabs[next].focus();
    // Keep the newly focused tab in view when the strip scrolls on mobile.
    tabs[next].scrollIntoView({ block: "nearest", inline: "nearest" });
    onChange(categoryFilters[next].id);
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(categoryFilters.length - 1);
        break;
    }
  };

  return (
    <div className={styles.tablistWrap}>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Menu categories"
        className={styles.tablist}
      >
        {categoryFilters.map((category, index) => {
          const selected = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`menu-tab-${category.id}`}
              aria-selected={selected}
              // Only the active category's panel is rendered, so only the
              // selected tab may point at it.
              aria-controls={selected ? `menu-panel-${category.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => onChange(category.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
