import { menuCategories, menuItems } from "@/data/menu";
import { signatureDishes } from "@/data/signatureDishes";

/**
 * Joins the signature presentation data onto the menu, which stays the single
 * source of truth for each dish's name, price and category.
 */

export type ResolvedSignatureDish = {
  id: string;
  name: string;
  price: string;
  /** Category display label, e.g. "Main Course". */
  category: string;
  label: string;
  description: string;
  alt: string;
  /** Candidate photographs, best first: the portrait, then the menu photo. */
  images: string[];
  /** Optional muted loop over the photograph. */
  video?: string;
};

export function resolveSignatureDishes(): ResolvedSignatureDish[] {
  return signatureDishes.map((dish) => {
    const item = menuItems.find((entry) => entry.id === dish.id);

    // Fail the build loudly rather than render a dish with no price.
    if (!item) {
      throw new Error(
        `Signature dish "${dish.id}" has no matching menu item in content/restaurant.ts. ` +
          `Its id must match a menu item's id.`,
      );
    }

    const category = menuCategories.find((c) => c.id === item.category);

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      category: category?.label ?? "",
      label: dish.label,
      description: dish.description,
      alt: dish.alt ?? item.alt ?? item.name,
      images: [dish.image, item.image].filter((src): src is string => Boolean(src)),
      video: dish.video,
    };
  });
}
