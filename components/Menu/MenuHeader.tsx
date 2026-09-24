import { Reveal } from "@/components/ui/Reveal";
import styles from "./menu.module.css";

/**
 * Section masthead. Server-rendered — <Reveal> supplies the scroll animation,
 * so none of this copy costs client JS.
 */
export function MenuHeader() {
  return (
    <header className={styles.header}>
      <Reveal>
        <p className={`label ${styles.eyebrow}`}>Our Menu</p>
      </Reveal>

      <Reveal variant="headingReveal" delay={0.1}>
        <h2 id="menu-heading" className={`text-section ${styles.heading}`}>
          Crafted for the <span className="text-accent">table.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className={`text-body-lg ${styles.supporting}`}>
          Seasonal ingredients, fire-led cooking, and carefully crafted dishes
          designed to be shared, savored, and remembered.
        </p>
      </Reveal>
    </header>
  );
}
