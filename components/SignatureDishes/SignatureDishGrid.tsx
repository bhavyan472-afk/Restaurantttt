import type { ResolvedSignatureDish } from "@/lib/signatureDishes";
import { SignatureDishCard } from "./SignatureDishCard";
import styles from "./signature.module.css";

type SignatureDishGridProps = {
  dishes: { dish: ResolvedSignatureDish; image: string | null }[];
  /** Number of the first card; the featured dish is 01. */
  startAt: number;
};

/**
 * The supporting dishes, set as a staggered editorial grid rather than an even
 * card wall — offsets and column spans live in the CSS, keyed to position.
 */
export function SignatureDishGrid({ dishes, startAt }: SignatureDishGridProps) {
  return (
    <ol role="list" className={styles.grid}>
      {dishes.map(({ dish, image }, index) => (
        <li key={dish.id} className={styles.gridItem}>
          <SignatureDishCard
            dish={dish}
            image={image}
            number={startAt + index}
            delay={(index % 3) * 0.1}
          />
        </li>
      ))}
    </ol>
  );
}
