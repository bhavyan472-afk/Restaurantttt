import { Reveal } from "@/components/ui/Reveal";
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
      <Reveal variant="scaleReveal" className={styles.featuredMedia}>
        <SignatureMedia
          src={image}
          alt={dish.alt}
          sizes={SIZES}
          initial={dish.name.charAt(0)}
          className={styles.featuredFrame}
          video={dish.video}
        />
      </Reveal>

      <Reveal delay={0.2} className={styles.featuredInfo}>
        <SignatureDishInfo dish={dish} number={1} headingId={headingId} featured />
      </Reveal>
    </article>
  );
}
