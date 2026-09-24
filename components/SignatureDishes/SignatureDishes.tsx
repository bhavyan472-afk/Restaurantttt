import { existsSync } from "node:fs";
import path from "node:path";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { menuCategories, menuItems } from "@/data/menu";
import { restaurantData } from "@/data/restaurant";
import { resolveSignatureDishes } from "@/lib/signatureDishes";
import { SignatureDishFeatured } from "./SignatureDishFeatured";
import { SignatureDishGrid } from "./SignatureDishGrid";
import styles from "./signature.module.css";

/** First candidate photograph that actually exists in /public, if any. */
function resolveImage(candidates: string[]): string | null {
  return (
    candidates.find((src) => existsSync(path.join(process.cwd(), "public", src))) ??
    null
  );
}

/**
 * Signature Dishes section.
 *
 * Server component, like the menu: photography is resolved at build time, so a
 * dish without its portrait falls back to its menu photo, then to a designed
 * placeholder — never a broken image. The only client JS is the image
 * parallax and the scroll reveals.
 */
export function SignatureDishes() {
  const [featured, ...rest] = resolveSignatureDishes().map((dish) => ({
    dish,
    image: resolveImage(dish.images),
  }));

  if (!featured) return null;

  return (
    <section
      id="signature-dishes"
      className={`section tone-base ${styles.section}`}
      aria-labelledby="signature-heading"
    >
      <div className="container">
        <header className={styles.header}>
          <div>
            <Reveal>
              <p className={`label ${styles.eyebrow}`}>From the Ember</p>
            </Reveal>

            <Reveal variant="headingReveal" delay={0.1}>
              <h2 id="signature-heading" className="text-section">
                Signature <span className="text-accent">dishes.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className={`text-body-lg ${styles.supporting}`}>
              A collection of dishes that define the {restaurantData.name}{" "}
              experience — crafted with seasonal ingredients, fire, and
              intention.
            </p>
          </Reveal>
        </header>

        <SignatureDishFeatured dish={featured.dish} image={featured.image} />

        {rest.length > 0 && <SignatureDishGrid dishes={rest} startAt={2} />}

        <Reveal className={styles.cta}>
          <p className="text-small">
            The full menu — {menuItems.length} dishes across{" "}
            {menuCategories.length} categories.
          </p>
          <Button variant="secondary" href="#menu">
            Explore Full Menu
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
