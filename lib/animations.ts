/**
 * Animation foundation.
 *
 * Principles: quick, natural deceleration, no bounce, and only `transform` /
 * `opacity`, so everything stays on the compositor and never shifts layout.
 *
 * Reduced motion: <MotionProvider> (MotionConfig reducedMotion="user")
 * strips transforms, and globals.css forces every reveal fully visible, so
 * nothing animates at all.
 */
import type { Transition, Variants } from "motion/react";

/** Soft deceleration — the site's signature curve. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Gentler in-out for larger movements. */
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

/**
 * Scroll reveals must never leave a section looking empty: they start as
 * soon as ~10% of an element is on screen, finish within 400ms, move only
 * 16px, and siblings are staggered by at most 60ms. Under reduced motion
 * globals.css shows everything immediately (see [data-reveal]).
 */
export const duration = {
  fast: 0.3,
  base: 0.4,
  slow: 0.4,
} as const;

/** Distance (px) for translate-based reveals. */
export const distance = 16;

/** Longest delay any reveal may have, whatever a call site asks for. */
export const MAX_REVEAL_DELAY = 0.12;

/** Stagger step between siblings (seconds). */
export const STAGGER = 0.06;

/** Fire once, when ~10% of the element is visible. */
export const viewport = {
  once: true,
  amount: 0.1,
} as const;

const transition = (delay = 0, seconds: number = duration.base): Transition => ({
  duration: seconds,
  delay: Math.min(delay, MAX_REVEAL_DELAY),
  ease: easeOut,
});

export type RevealVariantName =
  | "fadeUp"
  | "fadeIn"
  | "imageReveal"
  | "headingReveal"
  | "scaleReveal"
  | "slideInLeft"
  | "slideInRight";

/**
 * Variants take the delay through `custom`, so one variant set can be reused
 * with staggered delays: <m.div variants={fadeUp} custom={0.06} />.
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
    transition: transition(delay),
  }),
};

/** Images: a plain fade — no curtain wipe, so nothing waits to be uncovered. */
export const imageReveal: Variants = fadeIn;

/**
 * Headings: the same small fade-up as body copy. The heading is always one
 * real text node — no per-line or per-letter split, no mask.
 */
export const headingReveal: Variants = fadeUp;

/** Soft scale-up with fade. Good for cards and large media. */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: transition(delay),
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -distance },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: transition(delay),
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: distance },
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

/* --- Cinematic dish cards ----------------------------------------------------
   Slower and layered, for the signature dish cards only: the card fades up,
   its photograph or video settles from 0.96 to full size, and the text
   follows a beat later. Still transform/opacity only, still once, and the
   opacity starts moving at once so a card is never blank for long. Reduced
   motion and no-JS show it immediately via [data-reveal], like <Reveal>. */

/** Fire once, when ~15% of the card is visible. */
export const cardViewport = { once: true, amount: 0.15 } as const;

/** Card wrapper: fade + rise, then orchestrates its media and content. */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOut,
      delay: Math.min(delay, 0.2),
      delayChildren: Math.min(delay, 0.2),
      staggerChildren: 0.18,
    },
  }),
};

/** The card's photograph or video: settles from 0.96 to full size. */
export const cardMedia: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: easeOut } },
};

/** The card's text, arriving just after its media. */
export const cardContent: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

/** Parent variant that staggers children that use the reveal variants. */
export const stagger = (gap = STAGGER, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: Math.min(gap, STAGGER), delayChildren } },
});
