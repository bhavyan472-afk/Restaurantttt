"use client";

import { useEffect, useState } from "react";

/**
 * Areas a floating button must never sit over on a phone: the menu list
 * (prices are right-aligned, under the launchers' corner) and the two forms
 * (full-width fields and submit buttons).
 */
export const STEP_ASIDE_IDS = ["menu-list", "reservations", "contact-form"];

/**
 * True on phones (< 768px) while any of those areas is on screen, so the
 * AI Concierge and voice launchers can step aside. IntersectionObserver
 * only — nothing runs on scroll. `menu-list` is re-created when the menu
 * changes category, so its id is re-looked-up on DOM changes.
 */
export function useStepAside(ids: string[] = STEP_ASIDE_IDS): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const onScreen = new Set<Element>();
    const observed = new Set<Element>();

    const update = () => setHidden(phone.matches && onScreen.size > 0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        update();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    const sync = () => {
      const current = new Set<Element>(
        ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null),
      );
      for (const el of observed) {
        if (!current.has(el)) {
          observer.unobserve(el);
          observed.delete(el);
          onScreen.delete(el);
        }
      }
      for (const el of current) {
        if (!observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      }
      update();
    };

    sync();
    // The menu list is swapped when its category changes.
    const mutations = new MutationObserver(sync);
    const main = document.getElementById("main") ?? document.body;
    mutations.observe(main, { childList: true, subtree: true });
    phone.addEventListener("change", update);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      phone.removeEventListener("change", update);
    };
  }, [ids]);

  return hidden;
}
