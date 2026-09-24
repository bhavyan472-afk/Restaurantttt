import type { ResolvedSignatureDish } from "@/lib/signatureDishes";
import { cn } from "@/lib/utils";
import styles from "./signature.module.css";

type SignatureDishInfoProps = {
  dish: ResolvedSignatureDish;
  /** 1-based position, shown as the editorial "01", "02"… */
  number: number;
  headingId: string;
  featured?: boolean;
};

/**
 * The text half of a signature dish: index rule, label, name, description and
 * price. Shared by the featured dish and the cards so the hierarchy is
 * identical and only the scale changes.
 */
export function SignatureDishInfo({
  dish,
  number,
  headingId,
  featured = false,
}: SignatureDishInfoProps) {
  return (
    <div className={cn(styles.info, featured && styles.infoFeatured)}>
      <p className={styles.meta}>
        <span className={styles.number} aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.category}>{dish.category}</span>
      </p>

      <p className={`label label--accent ${styles.dishLabel}`}>{dish.label}</p>

      <h3 id={headingId} className={styles.name}>
        {dish.name}
      </h3>

      <p className={styles.description}>{dish.description}</p>

      <p className={styles.price}>
        <span className="visually-hidden">Price: </span>
        {dish.price}
      </p>
    </div>
  );
}
