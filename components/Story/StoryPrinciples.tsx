import { Reveal } from "@/components/ui/Reveal";
import type { StoryPrinciple } from "@/data/story";
import styles from "./story.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** The manifesto row: three principles between thin rules. */
export function StoryPrinciples({ principles }: { principles: StoryPrinciple[] }) {
  return (
    <ol role="list" className={styles.principles} aria-label="Our principles">
      {principles.map((principle, index) => (
        <li key={principle.title} className={styles.principle}>
          <Reveal delay={index * 0.12}>
            <p className={`label ${styles.principleCount}`} aria-hidden="true">
              <span className={styles.principleNumber}>{pad(index + 1)}</span>
              {" / "}
              {pad(principles.length)}
            </p>
            <h3 className={styles.principleTitle}>{principle.title}</h3>
            <p className={styles.principleText}>{principle.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
