/**
 * Signature Dishes, from content/restaurant.ts → signature. Edit it there.
 * Each entry points at a menu dish by `id`; name, price and category come
 * from the menu so the two sections can never disagree. The first entry is
 * featured large; the section is composed for 4–6 dishes.
 */

import { restaurant } from "@/content/restaurant";

export type { SignatureDish } from "@/content/types";

export const signatureCopy = {
  eyebrow: restaurant.signature.eyebrow,
  heading: restaurant.signature.heading,
  intro: restaurant.signature.intro,
};

export const signatureDishes = restaurant.signature.dishes;
