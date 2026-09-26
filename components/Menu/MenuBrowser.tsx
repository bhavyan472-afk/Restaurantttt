"use client";

import { useCallback, useMemo, useState } from "react";
import { MenuCategories } from "./MenuCategories";
import { MenuFilters } from "./MenuFilters";
import { MenuList } from "./MenuList";
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
  /** Featured dish ids with real photography. Serialisable, so the server can pass it. */
  imagesAvailable: string[];
};

/**
 * Owns the filter state the controls and the list share, so the header and
 * section shell stay server-rendered. The visible list is derived, never
 * stored — `menuItems` is the single source of truth.
 */
export function MenuBrowser({ imagesAvailable }: MenuBrowserProps) {
  const [filters, setFilters] = useState<MenuFilterState>(defaultFilters);

  const available = useMemo(() => new Set(imagesAvailable), [imagesAvailable]);
  const visible = useMemo(() => filterMenu(menuItems, filters), [filters]);
  const searching = normalizeQuery(filters.query) !== "";

  const update = useCallback(
    <K extends keyof MenuFilterState>(key: K, value: MenuFilterState[K]) =>
      setFilters((current) => ({ ...current, [key]: value })),
    [],
  );

  /* Clears search and filters but stays on the current category. */
  const clear = useCallback(
    () => setFilters((current) => ({ ...defaultFilters, category: current.category })),
    [],
  );

  return (
    <>
      <MenuSearch value={filters.query} onChange={(query) => update("query", query)} />

      <MenuCategories
        active={filters.category}
        dimmed={searching}
        onChange={(category: CategoryFilter) =>
          // Picking a category leaves a search: the tab is the new question.
          setFilters((current) => ({ ...current, category, query: "" }))
        }
      />

      <MenuFilters
        dietary={filters.dietary}
        onDietaryChange={(dietary: DietaryFilter) => update("dietary", dietary)}
        popularOnly={filters.popularOnly}
        onPopularChange={(popularOnly) => update("popularOnly", popularOnly)}
        resultCount={visible.length}
        canClear={hasActiveFilters(filters)}
        onClear={clear}
        searching={searching}
      />

      <MenuList
        items={visible}
        category={filters.category}
        searching={searching}
        imagesAvailable={available}
        onClear={clear}
      />
    </>
  );
}
