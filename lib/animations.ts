/**
 * Animation foundation.
 *
 * Principles: slow enough to feel considered, natural deceleration, no bounce,
 * and only `transform` / `opacity` (plus `clip-path` for image reveals) so
 * everything stays on the compositor and never shifts layout.
 *
 * Reduced motion is handled globally by <MotionProvider> (MotionConfig with
 * reducedMotion="user"), which strips transform animation and keeps opacity.
 */
import type { Transition, Variants } from "motion/react";

/** Long, soft deceleration — the site's signature curve. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Gentler in-out for larger, slower movements (image reveals). */
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;

/** Distance (px) for translate-based reveals. Deliberately small. */
export const distance = 28;

/** Default viewport config: fire once, slightly before the element is centred. */
export const viewport = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;

const transition = (delay = 0, seconds: number = duration.base): Transition => ({
  duration: seconds,
  delay,
  ease: easeOut,
});

/**
 * Motion language, for reference when choosing a duration:
 *   micro interaction   150–250ms  (CSS --duration-fast)
 *   standard hover      250–500ms  (CSS --duration-base)
 *   section reveal      0.8s       (duration.base)
 *   cinematic / images  1.2s       (duration.slow)
 */

export type RevealVariantName =
  | "fadeUp"
  | "fadeIn"
  | "imageReveal"
  | "headingReveal"
  | "scaleReveal"
  | "slideInLeft"
  | "slideInRight";

/** Variants that animate clip-path, which MotionConfig does not strip under
    reduced motion — <Reveal> marks them so globals.css can drop the clip. */
export const clipVariants: ReadonlySet<RevealVariantName> = new Set(["imageReveal", "headingReveal"]);

/**
 * Variants take the delay through `custom`, so a single variant set can be
 * reused with staggered delays: <m.div variants={fadeUp} custom={0.15} />.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: transition(delay),
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: transition(delay, duration.slow),
  }),
};

/** Curtain-style reveal for images. Apply to the image's overflow-hidden frame. */
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.001 },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: duration.slow,
      delay,
      ease: easeInOut,
    },
  }),
};

/**
 * Editorial heading reveal: the text rises a little while a mask opens from
 * the top, like a line of type being set. The heading stays one real text
 * node — nothing is split — so screen readers read it whole. The mask's
 * negative insets leave room for italic overhang and descenders, and it is
 * removed entirely once the reveal ends.
 */
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(0% -12% 100% -12%)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    clipPath: "inset(-25% -12% -25% -12%)",
    transition: { duration: duration.slow, delay, ease: easeOut },
    transitionEnd: { clipPath: "none" },
  }),
};

/** Soft scale-up with fade. Good for cards and large media. */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: transition(delay, duration.slow),
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -distance * 1.5 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: transition(delay),
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: distance * 1.5 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: transition(delay),
  }),
};

export const revealVariants: Record<RevealVariantName, Variants> = {
  fadeUp,
  fadeIn,
  imageReveal,
  headingReveal,
  scaleReveal,
  slideInLeft,
  slideInRight,
};

/** Parent variant that staggers children that use the reveal variants. */
export const stagger = (gap = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren } },
});
