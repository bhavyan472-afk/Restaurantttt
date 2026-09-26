"use client";

import { m } from "motion/react";
import {
  revealVariants,
  viewport as defaultViewport,
  type RevealVariantName,
} from "@/lib/animations";

type RevealTag = "div" | "p" | "h1" | "h2" | "h3" | "li" | "span" | "figure";

type RevealProps = {
  children: React.ReactNode;
  /** Which entrance to use. Defaults to a gentle fade-up. */
  variant?: RevealVariantName;
  /** Seconds. Stagger siblings in steps of 0.05–0.06; capped at 0.12. */
  delay?: number;
  as?: RevealTag;
  className?: string;
};

/**
 * Scroll-triggered entrance, built on Motion's whileInView (which uses
 * IntersectionObserver). Fires once, as soon as ~10% of the element is on
 * screen, and is done within 400ms — so a section never looks empty, even
 * straight after a nav-link jump.
 *
 * Content stays in the DOM and in the layout while hidden, so there is no
 * layout shift. Without JS, and under reduced motion, globals.css shows it
 * immediately.
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
