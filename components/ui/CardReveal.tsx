"use client";

import { m } from "motion/react";
import { cardContent, cardMedia, cardReveal, cardViewport } from "@/lib/animations";

type CardRevealProps = {
  children: React.ReactNode;
  /** Seconds before the card starts; capped at 0.2. */
  delay?: number;
  className?: string;
};

/**
 * Cinematic card entrance (see cardReveal in lib/animations): the card fades
 * up once as it enters the viewport and staggers its <CardRevealPart>
 * children — media first, then content. Reduced motion and no-JS show it
 * immediately through [data-reveal], like <Reveal>.
 */
export function CardReveal({ children, delay = 0, className }: CardRevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={cardReveal}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
    >
      {children}
    </m.div>
  );
}

type CardRevealPartProps = {
  children: React.ReactNode;
  part: "media" | "content";
  className?: string;
};

/** A layer inside <CardReveal>; it inherits the card's hidden/visible state. */
export function CardRevealPart({ children, part, className }: CardRevealPartProps) {
  return (
    <m.div data-reveal className={className} variants={part === "media" ? cardMedia : cardContent}>
      {children}
    </m.div>
  );
}
