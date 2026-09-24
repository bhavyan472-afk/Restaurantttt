"use client";

import Image from "next/image";
import { useState } from "react";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { DietaryTags, PopularBadge } from "./MenuBadge";
import { menuCategories, type MenuItem } from "@/data/menu";
import styles from "./menu.module.css";

const categoryLabel = Object.fromEntries(
  menuCategories.map((category) => [category.id, category.label]),
) as Record<MenuItem["category"], string>;

/** Matches the grid: one column, then two, then three. */
const SIZES = "(min-width: 1120px) 33vw, (min-width: 768px) 50vw, 100vw";

type MenuCardProps = {
  item: MenuItem;
  /** Whether the dish's photograph exists — resolved at build time. */
  hasImage: boolean;
  /** Position in the grid; only used to vary the placeholder. */
  index: number;
};

export function MenuCard({ item, hasImage, index }: MenuCardProps) {
  const [failed, setFailed] = useState(false);
  const showImage = hasImage && !failed;

  return (
    <article className={styles.card}>
      <div className={`frame ${styles.media}`}>
        {showImage ? (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes={SIZES}
            className={styles.image}
            // Below the fold, so lazy loading is the right default.
            onError={() => setFailed(true)}
          />
        ) : (
          /* Designed stand-in, not a broken-image box. The dish name is
             already in the heading below, so this is decorative. */
          <span
            className={styles.placeholder}
            style={{ "--i": index } as React.CSSProperties}
            aria-hidden="true"
          >
            {item.name.charAt(0)}
          </span>
        )}

        {showImage && item.video && (
          <LoopVideo src={item.video} className={styles.image} />
        )}

        {item.popular && <PopularBadge />}
      </div>

      <div className={styles.body}>
        <p className={`label ${styles.category}`}>{categoryLabel[item.category]}</p>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{item.name}</h3>
          <span className={styles.leader} aria-hidden="true" />
          <span className={styles.price}>{item.price}</span>
        </div>

        <p className={styles.description}>{item.description}</p>

        {item.dietary && item.dietary.length > 0 && (
          <DietaryTags tags={item.dietary} />
        )}
      </div>
    </article>
  );
}
