"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view, via IntersectionObserver — no
 * scroll listener, so nothing runs on the main thread between crossings.
 *
 * Sections that don't exist yet are skipped, so this can be wired up before
 * the sections themselves are built. `ids` must be a stable array (define it
 * at module scope or memoise it), since it keys the effect.
 *
 * The rootMargin collapses the viewport to a band across the middle: a section
 * becomes active once it crosses that band, which tracks reading position far
 * better than raw intersection.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const inView = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        const next = ids.find((id) => inView.has(id));
        // Between bands nothing intersects — keep the last active link rather
        // than flickering to none.
        setActive((prev) => next ?? prev);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
