"use client";

import { useEffect, useRef } from "react";

/** Only where it makes sense: a real mouse, a wide screen, motion welcome. */
const QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type MagneticProps = {
  children: React.ReactNode;
  /** Largest horizontal drift in px; vertical is 60% of it. */
  max?: number;
};

/**
 * A very small pull toward the pointer for ONE primary CTA at a time
 * (Reserve a Table). Wraps its child without adding a box (display:
 * contents) and moves it with the CSS `translate` property, which composes
 * with the button's own `transform` (the :active press) instead of fighting
 * it. The drift eases in and out on requestAnimationFrame, and the loop
 * stops as soon as it settles. Off on touch, small screens and reduced
 * motion — the button then behaves exactly as before.
 */
export function Magnetic({ children, max = 5 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = ref.current?.firstElementChild as HTMLElement | null;
    if (!target) return;
    const query = window.matchMedia(QUERY);

    const goal = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      now.x += (goal.x - now.x) * 0.18;
      now.y += (goal.y - now.y) * 0.18;
      const settled = Math.abs(goal.x - now.x) < 0.05 && Math.abs(goal.y - now.y) < 0.05;
      if (settled) {
        now.x = goal.x;
        now.y = goal.y;
      }
      target.style.translate = now.x === 0 && now.y === 0 ? "" : `${now.x.toFixed(2)}px ${now.y.toFixed(2)}px`;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType !== "mouse") return;
      const rect = target.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      goal.x = Math.max(-1, Math.min(1, dx)) * max;
      goal.y = Math.max(-1, Math.min(1, dy)) * max * 0.6;
      run();
    };
    const leave = () => {
      goal.x = 0;
      goal.y = 0;
      run();
    };

    target.dataset.magnetic = "";
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", leave);
      target.style.translate = "";
      delete target.dataset.magnetic;
    };
  }, [max]);

  return (
    <span ref={ref} style={{ display: "contents" }}>
      {children}
    </span>
  );
}
