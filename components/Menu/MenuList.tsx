"use client";

import { MenuEmpty } from "./MenuEmpty";
import { MenuRow } from "./MenuRow";
import type { MenuItem } from "@/data/menu";
import { groupByCategory, type CategoryFilter } from "@/lib/menuFilters";
import styles from "./menu.module.css";

type MenuListProps = {
  items: MenuItem[];
  category: CategoryFilter;
  /** True while a search is active: results span categories, grouped. */
  searching: boolean;
  /** Featured dish ids whose photo exists, resolved at build time. */
  imagesAvailable: Set<string>;
  onClear: () => void;
};

/**
 * The visible dishes. Rendered straight away — no scroll-gated reveal — and
 * re-keyed on each change so the list takes a quick 250ms fade instead of a
 * staggered cascade, however many dishes a category holds.
 */
export function MenuList({ items, category, searching, imagesAvailable, onClear }: MenuListProps) {
  const row = (item: MenuItem) => (
    <MenuRow
      key={item.id}
      item={item}
      showImage={Boolean(item.featured) && imagesAvailable.has(item.id)}
    />
  );

  return (
    <div
      role="tabpanel"
      // During a search the results are not one tab's content.
      id={`menu-panel-${category}`}
      aria-labelledby={searching ? undefined : `menu-tab-${category}`}
      aria-label={searching ? "Search results" : undefined}
      tabIndex={0}
      className={styles.panel}
    >
      {/* The launchers step aside on phones while this is on screen. */}
      <div
        id="menu-list"
        key={searching ? `search-${items.length}` : `${category}-${items.length}`}
        className={styles.listIn}
      >
        {items.length === 0 ? (
          <MenuEmpty onClear={onClear} />
        ) : searching ? (
          groupByCategory(items).map((group) => (
            <section key={group.id} className={styles.group} aria-label={group.label}>
              <p className={`label ${styles.groupTitle}`} aria-hidden="true">
                {group.label}
              </p>
              <ul role="list" className={styles.list}>
                {group.items.map(row)}
              </ul>
            </section>
          ))
        ) : (
          <ul role="list" className={styles.list}>
            {items.map(row)}
          </ul>
        )}
      </div>
    </div>
  );
}
