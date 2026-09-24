"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { MenuCard } from "./MenuCard";
import { MenuEmpty } from "./MenuEmpty";
import type { MenuItem } from "@/data/menu";
import { easeOut } from "@/lib/animations";
import type { CategoryFilter } from "@/lib/menuFilters";
import styles from "./menu.module.css";

type MenuGridProps = {
  items: MenuItem[];
  category: CategoryFilter;
  /** Dish ids that have real photography, resolved at build time. */
  imagesAvailable: Set<string>;
  onClear: () => void;
  /** True once the visitor has touched a control — see `reveal` below. */
  interacted: boolean;
};

/** Caps the cascade so a 32-dish result does not take two seconds to arrive. */
const STAGGER_CAP = 7;

export function MenuGrid({
  items,
  category,
  imagesAvailable,
  onClear,
  interacted,
}: MenuGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Gates the first reveal so the cards wait to be scrolled to. The bottom
     margin is generous on purpose: the search and filter controls sit above
     the grid, so on a laptop the grid can still be below the fold while the
     visitor is using them. */
  const seen = useInView(ref, { once: true, margin: "0px 0px 240px 0px" });

  /* Belt and braces for the same problem: the moment someone touches a
     control, show the results whatever the scroll position. Otherwise typing
     a search could report "4 dishes found" over an empty space. */
  const reveal = seen || interacted;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`menu-panel-${category}`}
      aria-labelledby={`menu-tab-${category}`}
      tabIndex={0}
      className={styles.panel}
    >
      {items.length === 0 ? (
        <MenuEmpty onClear={onClear} />
      ) : (
        <ul role="list" className={styles.grid}>
          {/* Keyed per dish, so cards that survive a filter change stay put and
              slide to their new position (layout) instead of being torn down.
              popLayout takes leaving cards out of flow, so the survivors do
              not lurch while the exit plays. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => (
              <m.li
                key={item.id}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={
                  reveal
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: reduce ? 0.2 : 0.55,
                          delay: reduce ? 0 : Math.min(index, STAGGER_CAP) * 0.06,
                          ease: easeOut,
                        },
                      }
                    : { opacity: 0, y: reduce ? 0 : 20 }
                }
                exit={{
                  opacity: 0,
                  y: reduce ? 0 : -8,
                  transition: { duration: reduce ? 0.1 : 0.18, ease: easeOut },
                }}
              >
                <MenuCard
                  item={item}
                  index={index}
                  hasImage={imagesAvailable.has(item.id)}
                />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
