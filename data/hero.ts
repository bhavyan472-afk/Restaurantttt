/**
 * Hero copy and media, from content/restaurant.ts → hero. Edit it there.
 */

import { restaurant } from "@/content/restaurant";
import { bookingCta } from "./restaurant";

const { hero } = restaurant;

export const heroContent = {
  label: hero.label,
  headingLines: hero.headingLines,
  supporting: hero.supporting,
  primaryCta: bookingCta,
  secondaryCta: { label: "Explore Menu", href: "#menu" },
  /** Scroll cue; links to the first section below the hero. */
  scrollLabel: "Scroll to explore",
  scrollHref: "#signature-dishes",
};

/**
 * Background media. The image paints first and carries the hero alone when
 * no video file exists (Hero.tsx checks the files at build time).
 */
export const heroMedia = {
  poster: hero.image.src,
  alt: hero.image.alt,
  desktop: hero.video.desktop,
  mobile: hero.video.mobile,
};
