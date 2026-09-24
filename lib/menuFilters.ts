import {
  menuCategories,
  menuItems,
  dietaryLabels,
  type DietaryTag,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu";

/**
 * Menu filtering.
 *
 * Pure functions over the single `menuItems` source of truth — nothing here
 * mutates or copies the dataset. The UI owns the state; this owns the rules.
 */

export type CategoryFilter = "all" | MenuCategoryId;
export type DietaryFilter = "all" | DietaryTag;

export type MenuFilterState = {
  query: string;
  category: CategoryFilter;
  dietary: DietaryFilter;
  popularOnly: boolean;
};

export const defaultFilters: MenuFilterState = {
  query: "",
  category: "all",
  dietary: "all",
  popularOnly: false,
};

/** Category controls, with "All" ahead of the real categories. */
export const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...menuCategories,
];

/**
 * Dietary controls, limited to tags the menu actually uses — so the filter can
 * never offer an option that returns nothing.
 */
export const dietaryFilters: { id: DietaryFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...(Object.keys(dietaryLabels) as DietaryTag[])
    .filter((tag) => menuItems.some((item) => item.dietary?.includes(tag)))
    .map((tag) => ({ id: tag as DietaryFilter, label: dietaryLabels[tag] })),
];

/**
 * Lower-cases and strips accents, so "creme brulee" finds "Crème Brûlée" —
 * which matters on a menu full of French and Italian terms.
 */
function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Collapses surrounding and repeated whitespace, then folds. */
export function normalizeQuery(query: string): string {
  return fold(query).trim().replace(/\s+/g, " ");
}

/**
 * Everything a dish can be found by: its name, description, category label and
 * dietary labels. Without the category label, searching "pizza" would miss
 * "Ember Margherita" — the word appears nowhere in that dish's own text.
 *
 * Built once at module load; the menu is static.
 */
const searchIndex = new Map<string, string>(
  menuItems.map((item) => {
    const category = menuCategories.find((c) => c.id === item.category);
    const parts = [
      item.name,
      item.description,
      category?.label ?? "",
      ...(item.dietary ?? []).map((tag) => dietaryLabels[tag]),
    ];
    return [item.id, fold(parts.join(" "))];
  }),
);

/**
 * Every whitespace-separated term must appear somewhere in the dish, so
 * "burrata truffle" finds Truffle Burrata even though the words are reversed.
 */
function matchesQuery(item: MenuItem, normalized: string): boolean {
  if (normalized === "") return true;
  const haystack = searchIndex.get(item.id) ?? "";
  return normalized.split(" ").every((term) => haystack.includes(term));
}

/**
 * category AND search AND dietary AND popular.
 */
export function filterMenu(
  items: readonly MenuItem[],
  filters: MenuFilterState,
): MenuItem[] {
  const normalized = normalizeQuery(filters.query);

  return items.filter((item) => {
    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }
    if (!matchesQuery(item, normalized)) return false;
    if (
      filters.dietary !== "all" &&
      !item.dietary?.includes(filters.dietary)
    ) {
      return false;
    }
    if (filters.popularOnly && !item.popular) return false;
    return true;
  });
}

/** Whether anything is narrowing the menu — drives the Clear control. */
export function hasActiveFilters(filters: MenuFilterState): boolean {
  return (
    normalizeQuery(filters.query) !== "" ||
    filters.category !== "all" ||
    filters.dietary !== "all" ||
    filters.popularOnly
  );
}
