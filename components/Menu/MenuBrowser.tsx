"use client";

import { useCallback, useMemo, useState } from "react";
import { MenuCategories } from "./MenuCategories";
import { MenuFilters } from "./MenuFilters";
import { MenuGrid } from "./MenuGrid";
import { MenuSearch } from "./MenuSearch";
import { menuItems } from "@/data/menu";
import {
  defaultFilters,
  filterMenu,
  hasActiveFilters,
  normalizeQuery,
  type CategoryFilter,
  type DietaryFilter,
  type MenuFilterState,
} from "@/lib/menuFilters";

type MenuBrowserProps = {
  /** Dish ids with real photography. Serialisable, so the server can pass it. */
  imagesAvailable: string[];
};

/**
 * Owns the filter state the controls and the grid share. Keeping it here is
 * what lets the header and the section shell stay server-rendered.
 *
 * The visible list is derived, never stored — `menuItems` is read-only and the
 * single source of truth.
 */
export function MenuBrowser({ imagesAvailable }: MenuBrowserProps) {
  const [filters, setFilters] = useState<MenuFilterState>(defaultFilters);
  /* Lets the grid reveal itself as soon as a control is used, rather than
     waiting to be scrolled into view — see MenuGrid. */
  const [interacted, setInteracted] = useState(false);

  const available = useMemo(() => new Set(imagesAvailable), [imagesAvailable]);
  const visible = useMemo(() => filterMenu(menuItems, filters), [filters]);

  const update = useCallback(
    <K extends keyof MenuFilterState>(key: K, value: MenuFilterState[K]) => {
      setInteracted(true);
      setFilters((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const clear = useCallback(() => {
    setInteracted(true);
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <MenuSearch
        value={filters.query}
        onChange={(query) => update("query", query)}
      />

      <MenuCategories
        active={filters.category}
        onChange={(category: CategoryFilter) => update("category", category)}
      />

      <MenuFilters
        dietary={filters.dietary}
        onDietaryChange={(dietary: DietaryFilter) => update("dietary", dietary)}
        popularOnly={filters.popularOnly}
        onPopularChange={(popularOnly) => update("popularOnly", popularOnly)}
        resultCount={visible.length}
        canClear={hasActiveFilters(filters)}
        onClear={clear}
        searching={normalizeQuery(filters.query) !== ""}
      />

      <MenuGrid
        items={visible}
        category={filters.category}
        imagesAvailable={available}
        onClear={clear}
        interacted={interacted}
      />
    </>
  );
}
