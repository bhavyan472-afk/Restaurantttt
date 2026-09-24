import type { Review } from "@/data/reviews";
import { reviewMeta } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import styles from "./reviews.module.css";

/** One testimonial: rating, the quote, who said it and when. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className={styles.card}>
      <StarRating rating={review.rating} />
      <blockquote className={styles.quote}>
        <p>“{review.quote}”</p>
      </blockquote>
      <figcaption className={styles.caption}>
        <span className={styles.author}>— {review.author}</span>
        <span className={styles.meta}>{reviewMeta(review)}</span>
      </figcaption>
    </figure>
  );
}
