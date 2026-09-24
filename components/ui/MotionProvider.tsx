"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Global motion setup.
 * - LazyMotion loads only the DOM animation features (much smaller than the
 *   full `motion` bundle); components use the lightweight `m.*` elements.
 * - reducedMotion="user" honours prefers-reduced-motion: transform and layout
 *   animations are disabled, opacity transitions are kept.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
