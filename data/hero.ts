/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Hero copy and background media. Kept out of the component so the hero can
 *  be re-skinned per client without touching markup.
 */

export const heroContent = {
  /** Small brand label above the heading. */
  label: "Ember & Sage",

  /**
   * The heading, one entry per rendered line. Each line animates in on its
   * own, so the break is a design decision rather than a wrapping accident.
   * `accent` renders the line in italic ember — use it on at most one line.
   */
  headingLines: [
    { text: "Where Fire", accent: false },
    { text: "Meets Flavor.", accent: true },
  ],

  supporting:
    "An intimate dining experience shaped by fire, craft, and seasonal ingredients.",

  primaryCta: { label: "Reserve a Table", href: "#reservations" },
  secondaryCta: { label: "Explore Menu", href: "#menu" },

  /** Scroll cue; links to the first section below the hero. */
  scrollLabel: "Scroll to explore",
  scrollHref: "#menu",
} as const;

/**
 * Background media.
 *
 * Drop the client's video into /public/video using these names and it is
 * picked up on the next build — no code change. Each list is in preference
 * order (WebM first, MP4 as the fallback); missing files are skipped, and if
 * no video is present the poster alone is shown, which is why the poster has
 * to stand on its own.
 *
 * `mobile` is optional. Add it only if the desktop file is too heavy for
 * phones; when absent, mobile uses the desktop sources.
 */
export const heroMedia = {
  /** Shown before the video paints, and whenever no video can play. */
  poster: "/images/14406de5-c643-4665-8f0e-01a73ef68264.png",
  /** Describes the poster/video for assistive tech. */
  alt: "A flame-grilled cheeseburger with melted cheddar, lettuce, tomato and red onion in a toasted sesame brioche.",
  /* The client's uploaded clip: the burger, then a molten chocolate cake
     (1280×720, 10 s) — its first frame matches the poster. The dedicated
     names are still picked up first if a purpose-made encode is added. */
  desktop: [
    "/video/restaurant-hero.webm",
    "/video/restaurant-hero.mp4",
    "/video/2 (2).mp4",
  ],
  mobile: [
    "/video/restaurant-hero-mobile.webm",
    "/video/restaurant-hero-mobile.mp4",
  ],
} as const;
