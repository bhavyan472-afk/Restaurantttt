/**
 * The menu, from the client configuration (content/restaurant.ts → menu).
 * Edit dishes there. This file only adds the dietary wording and checks the
 * data at build time, so a typo in a category id fails loudly instead of
 * silently hiding dishes.
 */

import { restaurant } from "@/content/restaurant";
import type { DietaryTag, MenuCategory, MenuItem } from "@/content/types";

export type { DietaryTag, MenuItem } from "@/content/types";
export type MenuCategoryId = MenuCategory["id"];

export const menuCategories: MenuCategory[] = restaurant.menu.categories;
export const menuItems: MenuItem[] = restaurant.menu.items;
export const menuCopy = {
  eyebrow: restaurant.menu.eyebrow,
  heading: restaurant.menu.heading,
  intro: restaurant.menu.intro,
};

/** Display labels for dietary tags — always spelled out, never colour alone. */
export const dietaryLabels: Record<DietaryTag, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten-Free",
  spicy: "Spicy",
};

/* --- Build-time checks --------------------------------------------------- */

const categoryIds = new Set(menuCategories.map((category) => category.id));
const seen = new Set<string>();
for (const item of menuItems) {
  if (!categoryIds.has(item.category)) {
    throw new Error(
      `Menu item "${item.id}" uses category "${item.category}", which is not in menu.categories (content/restaurant.ts).`,
    );
  }
  if (seen.has(item.id)) {
    throw new Error(`Menu item id "${item.id}" is used twice in content/restaurant.ts.`);
  }
  seen.add(item.id);
}
