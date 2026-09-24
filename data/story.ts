/**
 * ============================================================================
 *  DEMO CONTENT — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Copy and imagery for the Story section. This is illustrative writing for
 *  the website concept, not the history of a real restaurant — replace it with
 *  the client's own story. Do not add a founding year or other factual claim
 *  unless the client supplies it.
 *
 *  Emphasis: wrap a word or phrase in *asterisks* to set it in the display
 *  italic. In the heading that also takes the ember accent; in the story it
 *  stays cream. Use it sparingly — one or two per paragraph at most.
 *
 *  Images: any path under /public — currently the client's uploaded
 *  photography (see `photo` in data/menu.ts). A missing file shows a designed
 *  firelit placeholder — see public/images/story/README.md.
 */

import { photo } from "./menu";

export type StoryImage = {
  /** Path under /public. */
  src: string;
  /** Describes the photograph for screen readers. */
  alt: string;
};

export type StoryPrinciple = {
  title: string;
  text: string;
};

export type StoryContent = {
  eyebrow: string;
  /** One entry per rendered line. */
  heading: string[];
  /** Opening line, set large in the display serif. */
  lead: string;
  paragraphs: string[];
  /** Short sign-off lines that close the story. */
  closing: string[];
  images: {
    /** Large portrait, 4:5. */
    main: StoryImage;
    /** Small square detail that overlaps the main image. Optional. */
    detail?: StoryImage;
  };
  /** Small caption beneath the main image. */
  caption: string;
  principles: StoryPrinciple[];
  cta: { label: string; href: string };
};

// DEMO CONTENT — REPLACE WITH CLIENT INFORMATION
export const story: StoryContent = {
  eyebrow: "Our Story",
  heading: ["Born from fire.", "Crafted with *intention.*"],
  lead: "EMBER & SAGE began with a simple belief: the best meals are not rushed.",
  paragraphs: [
    "They are built around *fire*, shaped by skilled hands, and shared with people who matter.",
    "Our kitchen celebrates the natural character of every ingredient — from vegetables sourced at their *seasonal* peak to carefully selected cuts prepared over open flame.",
    "Every plate is designed to balance warmth, texture, smoke, freshness, and *restraint*.",
  ],
  closing: ["This is our table.", "This is EMBER & SAGE."],
  images: {
    main: {
      src: photo.striploin,
      alt: "A fire-seared striploin carved into pink slices, with roasted potatoes, asparagus and herbs, candles glowing behind.",
    },
    detail: {
      src: photo.seasonalGreens,
      alt: "Seasonal leaves, radish, heirloom tomato, pomegranate and toasted seeds on a dark plate.",
    },
  },
  caption: "Fire • Season • Craft",
  principles: [
    { title: "Fire", text: "Open flame is at the heart of our kitchen." },
    { title: "Seasonal", text: "We let the season guide the ingredients." },
    {
      title: "Craft",
      text: "Every detail is considered, from preparation to presentation.",
    },
  ],
  cta: { label: "Discover the Experience", href: "#experience" },
};
