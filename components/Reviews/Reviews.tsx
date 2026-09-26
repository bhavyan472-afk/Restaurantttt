import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { ratingSummary, reviewsAreDemo, reviewsCopy as copy, showReviews } from "@/data/reviews";
import { formatRating, splitReviews } from "@/lib/reviews";
import { FeaturedReview } from "./FeaturedReview";
import { ReviewCarousel } from "./ReviewCarousel";
import { StarRating } from "./StarRating";
import styles from "./reviews.module.css";

/**
 * Reviews section. Server component; the only client JS is the carousel
 * and the star entrance.
 *
 * Reviews come only from content/restaurant.ts. Template sample reviews
 * are shown only in demo mode (and labelled); with no reviews, or the
 * feature off, the section is not rendered at all. No rating markup is
 * emitted for search.
 */
export function Reviews() {
  if (!showReviews) return null;

  const { featured, rest } = splitReviews();

  return (
    <section id="reviews" className={`section tone-alt ${styles.section}`} aria-labelledby="reviews-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.headline}>
            <Reveal>
              <p className={`label ${styles.eyebrow}`}>{copy.eyebrow}</p>
            </Reveal>
            <Reveal variant="headingReveal" delay={0.05}>
              <h2 id="reviews-heading" className={`text-section ${styles.heading}`}>
                <Emphasis text={copy.heading} className="text-accent" />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={`text-body-lg ${styles.intro}`}>{copy.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className={styles.summary}>
            <p className={styles.average}>
              {formatRating(ratingSummary.average)}
              <span className="visually-hidden"> out of 5</span>
            </p>
            <div className={styles.summaryText}>
              <StarRating rating={ratingSummary.average} size={15} />
              <p className={`label ${styles.summaryLabel}`}>{ratingSummary.label}</p>
              <p className={styles.summaryCount}>
                Based on {ratingSummary.count.toLocaleString("en-US")} reviews
              </p>
            </div>
            {reviewsAreDemo && <p className={styles.demoNote}>{copy.demoNote}</p>}
          </Reveal>
        </header>

        {featured && <FeaturedReview review={featured} />}

        {rest.length > 0 && (
          <Reveal delay={0.05}>
            <ReviewCarousel reviews={rest} />
          </Reveal>
        )}

        <Reveal className={styles.cta}>
          <p className={styles.ctaLead}>{copy.cta.lead}</p>
          <Button href={copy.cta.href}>{copy.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
