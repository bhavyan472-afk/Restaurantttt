import { reviews, type Review } from "@/data/reviews";

/** "2026-09-06" → "September 2026". Parsed as a local date, never UTC. */
export function formatReviewDate(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return "";
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** "Guest · September 2026 · Anniversary" */
export function reviewMeta(review: Review): string {
  return [
    review.source,
    review.date ? formatReviewDate(review.date) : "",
    review.occasion ?? "",
  ]
    .filter(Boolean)
    .join(" · ");
}

/** The featured review, and the rest in their original order. */
export function splitReviews(): { featured: Review | undefined; rest: Review[] } {
  const featured = reviews.find((review) => review.featured) ?? reviews[0];
  return { featured, rest: reviews.filter((review) => review !== featured) };
}

/** "5", "4.5" — the way a rating is read out. */
export const formatRating = (rating: number) =>
  Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
