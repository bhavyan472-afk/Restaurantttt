/**
 * ============================================================================
 *  DEMO CONTENT — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Tiles for the Gallery section, in display order. Paths come from `photo` /
 *  `clip` in data/menu.ts (the client's uploaded files). A tile whose file is
 *  missing is left out at build time, so the grid never shows a broken image.
 *
 *  `size` shapes the mosaic on laptops and up (4 columns): "large" 2×2,
 *  "wide" 2×1, "tall" 1×2, otherwise 1×1. Keep the total cell count a
 *  multiple of 4 so the last row closes cleanly (currently 20).
 *
 *  A `video` tile shows `src` as its still and plays the clip over it while
 *  on screen — never for reduced-motion or data-saver visitors.
 */

import { clip, photo } from "./menu";

export type GalleryTile = {
  src: string;
  alt: string;
  /** Short label over the tile, e.g. the dish name. */
  caption: string;
  size?: "large" | "wide" | "tall";
  video?: string;
  /** The clip has a watermark near its bottom-right corner; crop it away. */
  cropMark?: boolean;
};

export const galleryContent = {
  eyebrow: "Gallery",
  heading: "From our *kitchen.*",
  intro:
    "A closer look at the plates, the pours and the fire behind them — straight from the pass to your table.",
};

// DEMO CONTENT — REPLACE WITH CLIENT INFORMATION
export const galleryTiles: GalleryTile[] = [
  {
    src: photo.burger,
    video: clip.burgerAssembly,
    cropMark: true,
    caption: "Ember Smash Burger",
    alt: "A flame-grilled cheeseburger with cheddar, lettuce, tomato and red onion in a sesame brioche.",
    size: "large",
  },
  {
    src: photo.truffleBurrata,
    caption: "Truffle Burrata",
    alt: "Burrata under shaved black truffle with cherry tomatoes, rocket and toasted bread.",
  },
  {
    src: photo.lobsterLinguine,
    caption: "Lobster Linguine",
    alt: "Linguine in a rich bisque topped with a split lobster tail and herbs.",
    size: "tall",
  },
  {
    src: photo.fireRoastedMushrooms,
    caption: "Fire-Roasted Mushrooms",
    alt: "A plate of glossy fire-roasted wild mushrooms with thyme and parsley.",
  },
  {
    src: photo.salmon,
    caption: "Herb-Crusted Salmon",
    alt: "Herb-crusted salmon fillet on a creamy purée with asparagus and grilled lemon.",
  },
  {
    src: photo.prosciuttoBurrataPizza,
    caption: "Prosciutto & Burrata",
    alt: "Wood-fired pizza with prosciutto, a whole burrata, rocket and parmesan.",
    size: "wide",
  },
  {
    src: photo.tomatoBisque,
    caption: "Roasted Tomato Bisque",
    alt: "Roasted tomato bisque swirled with cream, basil and roasted cherry tomatoes.",
  },
  {
    src: photo.sushiPlatter,
    video: clip.sushiToPizza,
    // The clip moves from the sushi platter to a wood-fired pizza.
    caption: "Sushi to Wood-Fired Pizza",
    alt: "A dark platter of nigiri and rolls with wasabi and pickled ginger.",
    size: "wide",
  },
  {
    src: photo.pistachioTiramisu,
    caption: "Pistachio Tiramisu",
    alt: "A layered slice of pistachio tiramisu covered in crushed pistachios.",
    size: "tall",
  },
  {
    src: photo.arrabbiata,
    caption: "Spicy Arrabbiata",
    alt: "Penne arrabbiata in a chilli tomato sauce with basil and parmesan.",
  },
  {
    src: photo.truffleMushroomPizza,
    caption: "Truffle Mushroom Pizza",
    alt: "Pizza topped with wild mushrooms, truffle cream and shaved black truffle.",
  },
  {
    src: photo.burrataGardenSalad,
    caption: "Burrata Garden Salad",
    alt: "Burrata on a garden salad of tomatoes, radish, rocket and toasted nuts.",
  },
  {
    src: photo.calabresePizza,
    caption: "Spicy Calabrese",
    alt: "Wood-fired pizza with spicy salami, melted mozzarella and basil.",
  },
];
