import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { menuCopy } from "@/data/menu";
import styles from "./menu.module.css";

/**
 * Section masthead. Server-rendered — <Reveal> supplies the scroll animation,
 * so none of this copy costs client JS.
 */
export function MenuHeader() {
  return (
    <header className={styles.header}>
      <Reveal>
        <p className={`label ${styles.eyebrow}`}>{menuCopy.eyebrow}</p>
      </Reveal>

      <Reveal variant="headingReveal" delay={0.05}>
        <h2 id="menu-heading" className={`text-section ${styles.heading}`}>
          <Emphasis text={menuCopy.heading} className="text-accent" />
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className={`text-body-lg ${styles.supporting}`}>{menuCopy.intro}</p>
      </Reveal>
    </header>
  );
}
