/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Every review and the rating summary below are FICTIONAL, written for the
 *  website concept. Replace them with real, attributable guest reviews
 *  before launch — never ship invented testimonials or ratings on a live
 *  client site. While `reviewsAreDemo` is true the section says so on screen.
 *
 *  `source` names a review platform ONLY for a real review that can be
 *  verified there. Demo entries use "Guest".
 *
 *  lib/seo.ts deliberately emits no review / aggregateRating markup; add it
 *  only once the reviews are real.
 */

export type ReviewSource = "Guest" | "Direct" | "Google" | "Tripadvisor" | "Yelp" | "OpenTable";

export type Review = {
  id: string;
  author: string;
  /** 1–5, halves allowed (e.g. 4.5). */
  rating: number;
  quote: string;
  source: ReviewSource;
  /** ISO date, e.g. "2026-09-12". Displayed as "September 2026". */
  date?: string;
  /** Optional context, e.g. "Anniversary dinner". */
  occasion?: string;
  /** The one review shown large. If none is marked, the first is used. */
  featured?: boolean;
};

export type RatingSummary = {
  /** Average, one decimal. */
  average: number;
  count: number;
  label: string;
};

/** Shows the "demo reviews" note in the section. Set false for real reviews. */
export const reviewsAreDemo = true;

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const ratingSummary: RatingSummary = {
  average: 4.9,
  count: 248,
  label: "Guest Rating",
};

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const reviews: Review[] = [
  {
    id: "daniel-r",
    author: "Daniel R.",
    rating: 5,
    quote: "An unforgettable evening from the first course to the final drink.",
    source: "Guest",
    date: "2026-08-22",
    featured: true,
  },
  {
    id: "sofia-m",
    author: "Sofia M.",
    rating: 5,
    quote:
      "We came for my mother's birthday and the team made it feel effortless. The ribeye was cooked exactly as she asked, and someone had quietly added a candle to her dessert.",
    source: "Guest",
    date: "2026-09-06",
    occasion: "Birthday dinner",
  },
  {
    id: "priya-k",
    author: "Priya K.",
    rating: 5,
    quote:
      "What stayed with me was the vegetables — charred, a little smoky, and still tasting of the season. From most tables you can watch the kitchen working the fire.",
    source: "Guest",
    date: "2026-07-18",
  },
  {
    id: "james-t",
    author: "James T.",
    rating: 4,
    quote:
      "Wonderful food in a lovely, dim room. It gets lively on a Saturday, so ask for a corner table if you want a quiet conversation.",
    source: "Guest",
    date: "2026-06-27",
  },
  {
    id: "amelie-d",
    author: "Amélie D.",
    rating: 5,
    quote:
      "The Smoked Negroni alone is worth the visit. Service was warm without hovering, and nobody rushed us out after dessert.",
    source: "Guest",
    date: "2026-05-30",
  },
  {
    id: "marcus-l",
    author: "Marcus L.",
    rating: 5,
    quote:
      "Our anniversary. The Truffle Tagliatelle and the Burnt Basque Cheesecake were the highlights — and the staff remembered we were celebrating without us having to remind them.",
    source: "Guest",
    date: "2026-04-11",
    occasion: "Anniversary",
  },
];

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const reviewsCopy = {
  eyebrow: "Guest Experiences",
  heading: "A table worth *remembering.*",
  intro: "A few words from guests who have shared an evening with us.",
  demoNote: "Illustrative reviews — demo content for this website.",
  cta: {
    lead: "Ready for your own evening?",
    label: "Reserve a Table",
    href: "#reservations",
  },
};
