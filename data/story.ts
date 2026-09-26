/**
 * Story section, from content/restaurant.ts → story. Edit it there.
 */

import { restaurant } from "@/content/restaurant";
import type { StoryContent as StoryConfig } from "@/content/types";

export type StoryImage = { src: string; alt: string };
export type StoryPrinciple = { title: string; text: string };

export type StoryContent = Omit<StoryConfig, "heading"> & {
  /** One entry per rendered line. */
  heading: string[];
  cta: { label: string; href: string };
};

export const story: StoryContent = {
  ...restaurant.story,
  heading: restaurant.story.heading.split("\n"),
  // The Menu follows the Story on the page.
  cta: { label: "View the Menu", href: "#menu" },
};
