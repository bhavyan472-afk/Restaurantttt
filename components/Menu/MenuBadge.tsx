import { dietaryLabels, type DietaryTag } from "@/data/menu";
import styles from "./menu.module.css";

/** Chef's-favourite marker: a quiet typographic mark beside the tags. */
export function PopularBadge() {
  return (
    <span className={styles.popular}>
      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path
          d="M6 0.5 7.55 4.2l4 .34-3.03 2.62.91 3.9L6 8.99 2.57 11.06l.91-3.9L.45 4.54l4-.34z"
          fill="currentColor"
        />
      </svg>
      Chef&rsquo;s Favourite
    </span>
  );
}

/**
 * Dietary markers. Always spelled out — the information is never carried by
 * colour or an icon alone.
 */
export function DietaryTags({ tags }: { tags: DietaryTag[] }) {
  return (
    <ul className={styles.dietary} role="list">
      {tags.map((tag) => (
        <li key={tag} className={styles.dietaryTag} data-tag={tag}>
          {dietaryLabels[tag]}
        </li>
      ))}
    </ul>
  );
}
