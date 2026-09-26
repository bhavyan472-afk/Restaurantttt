import { CardReveal, CardRevealPart } from "@/components/ui/CardReveal";
import type { ResolvedSignatureDish } from "@/lib/signatureDishes";
import { SignatureDishInfo } from "./SignatureDishInfo";
import { SignatureMedia } from "./SignatureMedia";
import styles from "./signature.module.css";

/** One column on phones, two on tablets, four or five of twelve on laptops. */
const SIZES =
  "(min-width: 1440px) 520px, (min-width: 1024px) 38vw, (min-width: 768px) 50vw, 100vw";

type SignatureDishCardProps = {
  dish: ResolvedSignatureDish;
  image: string | null;
  number: number;
  /** Stagger within a row, in seconds. */
  delay: number;
};

export function SignatureDishCard({ dish, image, number, delay }: SignatureDishCardProps) {
  const headingId = `signature-${dish.id}`;

  return (
    <article className={styles.item} aria-labelledby={headingId}>
      <CardReveal delay={delay}>
        <CardRevealPart part="media">
          <SignatureMedia
            src={image}
            alt={dish.alt}
            sizes={SIZES}
            initial={dish.name.charAt(0)}
            className={styles.cardFrame}
            video={dish.video}
          />
        </CardRevealPart>
        <CardRevealPart part="content">
          <SignatureDishInfo dish={dish} number={number} headingId={headingId} />
        </CardRevealPart>
      </CardReveal>
    </article>
  );
}
