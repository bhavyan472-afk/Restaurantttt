import { Reveal } from "@/components/ui/Reveal";
import type { Review } from "@/data/reviews";
import { reviewMeta } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import styles from "./reviews.module.css";

/**
 * The one review given room: a large serif quote under an oversized ember
 * quotation mark. Distinct from the cards by scale and type, not by colour.
 */
export function FeaturedReview({ review }: { review: Review }) {
  return (
    <Reveal delay={0.05}>
      <figure className={styles.featured}>
        <span className={styles.quoteMark} aria-hidden="true">
          “
        </span>
        <StarRating rating={review.rating} size={16} animate className={styles.featuredStars} />
        <blockquote className={styles.featuredQuote}>
          <p>{review.quote}</p>
        </blockquote>
        <figcaption className={styles.featuredCaption}>
          <span className={styles.author}>— {review.author}</span>
          <span className={styles.meta}>{reviewMeta(review)}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
