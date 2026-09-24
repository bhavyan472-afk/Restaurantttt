"use client";

import { useEffect, useRef, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Things a guest can act on — the halo opens up over them. */
const INTERACTIVE =
  'a[href], button:not([disabled]), [role="tab"], [role="radio"], summary, select, label[for], input[type="radio"], input[type="checkbox"]';
/** Where a caret matters more than decoration — the halo steps away. */
const TEXT_ENTRY = 'input:not([type="radio"]):not([type="checkbox"]), textarea, [contenteditable="true"]';

/**
 * A soft ember ring that trails the pointer on desktop.
 *
 * It sits ALONGSIDE the system cursor, never replacing it, so precision,
 * cursor shapes and OS accessibility settings are untouched. Rendered only
 * for a fine pointer with motion allowed; nothing at all on touch devices
 * or under reduced motion. One passive pointermove listener feeds a
 * requestAnimationFrame loop that stops once the ring has caught up.
 */
export function CursorHalo() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    if (!enabled || !ring) return;

    const goal = { x: -100, y: -100 };
    const now = { x: -100, y: -100 };
    let frame = 0;
    let shown = false;

    const tick = () => {
      now.x += (goal.x - now.x) * 0.22;
      now.y += (goal.y - now.y) * 0.22;
      ring.style.transform = `translate3d(${now.x}px, ${now.y}px, 0)`;
      const settled = Math.abs(goal.x - now.x) < 0.1 && Math.abs(goal.y - now.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      goal.x = event.clientX;
      goal.y = event.clientY;
      if (!shown) {
        // Appear where the pointer is, not sliding in from a corner.
        now.x = goal.x;
        now.y = goal.y;
        shown = true;
        ring.dataset.visible = "true";
      }
      const el = event.target instanceof Element ? event.target : null;
      // A modal <dialog> sits in the top layer, above the halo: step away.
      ring.dataset.state = el?.closest(TEXT_ENTRY) || el?.closest("dialog")
        ? "text"
        : el?.closest(INTERACTIVE)
          ? "active"
          : "idle";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const hide = () => {
      shown = false;
      ring.dataset.visible = "false";
    };
    const out = (event: PointerEvent) => {
      if (!event.relatedTarget) hide(); // left the window
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
      window.removeEventListener("blur", hide);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ringRef} className="cursor-halo" data-visible="false" data-state="idle" aria-hidden="true">
      <span className="cursor-halo__ring" />
    </div>
  );
}
