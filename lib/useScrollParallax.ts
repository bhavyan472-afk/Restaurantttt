"use client";

import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/** Where parallax is worth its cost: wide screens with a real pointer. */
const CAPABLE_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

/**
 * Slow image drift for a framed photograph: returns a `y` to bind to the
 * image's inner layer, moving from -travel% to +travel% as `ref` crosses the
 * viewport.
 *
 * Off on phones, tablets and touch devices, and under reduced motion — `y`
 * then stays at 0. Driven by a motion value set from scroll, never React
 * state, so scrolling causes no re-renders; transform-only, so it stays on
 * the compositor. The inner layer must bleed past its frame by more than
 * `travel` (see `data-parallax` in the section CSS) so no edge is exposed.
 */
export function useScrollParallax(
  ref: RefObject<HTMLElement | null>,
  travel = 5,
): { y: MotionValue<string>; enabled: boolean } {
  const reduce = useReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(CAPABLE_QUERY);
    const update = () => setCapable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const enabled = capable && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useMotionValue("0%");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (enabled) y.set(`${(progress - 0.5) * 2 * travel}%`);
  });

  // Sync immediately when parallax switches on or off, not on the next scroll.
  useEffect(() => {
    y.set(enabled ? `${(scrollYProgress.get() - 0.5) * 2 * travel}%` : "0%");
  }, [enabled, scrollYProgress, travel, y]);

  return { y, enabled };
}
