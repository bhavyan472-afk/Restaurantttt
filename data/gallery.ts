/**
 * Gallery section, from content/restaurant.ts → gallery. Edit it there.
 * A tile whose photo is missing is left out at build time.
 */

import { restaurant } from "@/content/restaurant";

export type { GalleryTile } from "@/content/types";

export const galleryContent = {
  eyebrow: restaurant.gallery.eyebrow,
  heading: restaurant.gallery.heading,
  intro: restaurant.gallery.intro,
};

export const galleryTiles = restaurant.gallery.tiles;
