"use client";

import { m } from "motion/react";
import {
  clipVariants,
  revealVariants,
  viewport as defaultViewport,
  type RevealVariantName,
} from "@/lib/animations";

type RevealTag = "div" | "p" | "h1" | "h2" | "h3" | "li" | "span" | "figure";

type RevealProps = {
  children: React.ReactNode;
  /** Which entrance to use. Defaults to a gentle fade-up. */
  variant?: RevealVariantName;
  /** Seconds. Use small increments (0.1–0.2) to stagger siblings. */
  delay?: number;
  as?: RevealTag;
  className?: string;
};

/**
 * Scroll-triggered entrance, built on Motion's whileInView (which uses
 * IntersectionObserver). Fires once. Use sparingly — on key elements only.
 *
 * Content stays in the DOM and in the layout while hidden, so there is no
 * layout shift. Without JS, globals.css reveals it via <noscript>.
 */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const Component = m[as] as typeof m.div;

  return (
    <Component
      data-reveal
      // Mask/wipe reveals: globals.css drops the clip under reduced motion
      // (MotionConfig strips transforms, not clip-path), leaving a fade.
      data-reveal-clip={clipVariants.has(variant) || undefined}
      className={className}
      variants={revealVariants[variant]}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children}
    </Component>
  );
}
