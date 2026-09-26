/**
 * Reviews, from content/restaurant.ts → reviews. Edit them there.
 *
 * Reviews marked `sample` are template placeholders: they are shown only
 * while `demo` is true, so they can never reach a live client site. With no
 * reviews left (or the feature switched off) the section is not rendered.
 *
 * lib/seo.ts deliberately emits no review / rating markup.
 */

import { restaurant } from "@/content/restaurant";
import type { Review } from "@/content/types";
import { bookingCta, features } from "./restaurant";

export type { Review, ReviewSource } from "@/content/types";

export type RatingSummary = { average: number; count: number; label: string };

export const reviews: Review[] = restaurant.reviews.items.filter(
  (review) => restaurant.demo || !review.sample,
);

/** Whether the Reviews section is on the page at all. */
export const showReviews = features.reviews && reviews.length > 0;

/** Shows the "illustrative reviews" note while any sample review is shown. */
export const reviewsAreDemo = reviews.some((review) => review.sample);

/** A platform rating from the config, else the average of the reviews shown. */
export const ratingSummary: RatingSummary = restaurant.reviews.rating ?? {
  average:
    reviews.length > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
      : 0,
  count: reviews.length,
  label: "Guest Rating",
};

export const reviewsCopy = {
  eyebrow: restaurant.reviews.eyebrow,
  heading: restaurant.reviews.heading,
  intro: restaurant.reviews.intro,
  demoNote: "Illustrative reviews — demo content for this website.",
  cta: { lead: "Ready for your own evening?", ...bookingCta },
};
