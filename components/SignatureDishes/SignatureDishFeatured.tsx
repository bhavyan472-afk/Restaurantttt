import { CardReveal, CardRevealPart } from "@/components/ui/CardReveal";
import type { ResolvedSignatureDish } from "@/lib/signatureDishes";
import { SignatureDishInfo } from "./SignatureDishInfo";
import { SignatureMedia } from "./SignatureMedia";
import styles from "./signature.module.css";

/** About seven of twelve columns on a laptop, capped at the container. */
const SIZES = "(min-width: 1440px) 800px, (min-width: 1024px) 56vw, 100vw";

type SignatureDishFeaturedProps = {
  dish: ResolvedSignatureDish;
  image: string | null;
};

/**
 * The hero of the section: a large portrait photograph with the dish set
 * beside it at display scale. Image first, then its text, so the reveal reads
 * in the same order as the eye.
 */
export function SignatureDishFeatured({ dish, image }: SignatureDishFeaturedProps) {
  const headingId = `signature-${dish.id}`;

  return (
    <article className={`${styles.item} ${styles.featured}`} aria-labelledby={headingId}>
      {/* Two grid columns, so each side is its own card reveal; the text
          side waits a beat so it still lands after the photograph. */}
      <CardReveal className={styles.featuredMedia}>
        <CardRevealPart part="media">
          <SignatureMedia
            src={image}
            alt={dish.alt}
            sizes={SIZES}
            initial={dish.name.charAt(0)}
            className={styles.featuredFrame}
            video={dish.video}
          />
        </CardRevealPart>
      </CardReveal>

      <CardReveal delay={0.18} className={styles.featuredInfo}>
        <CardRevealPart part="content">
          <SignatureDishInfo dish={dish} number={1} headingId={headingId} featured />
        </CardRevealPart>
      </CardReveal>
    </article>
  );
}
