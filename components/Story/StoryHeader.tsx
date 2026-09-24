import { Reveal } from "@/components/ui/Reveal";
import { Emphasis } from "@/components/ui/Emphasis";
import styles from "./story.module.css";

type StoryHeaderProps = {
  eyebrow: string;
  /** One entry per rendered line. */
  heading: string[];
};

export function StoryHeader({ eyebrow, heading }: StoryHeaderProps) {
  return (
    <header className={styles.header}>
      <Reveal>
        <p className={`label ${styles.eyebrow}`}>{eyebrow}</p>
      </Reveal>

      <h2 id="story-heading" className={`text-section ${styles.heading}`}>
        {heading.map((line, index) => (
          // Each line reveals on its own, so the break is a design decision.
          // The space keeps "fire. Crafted" apart in the accessible name.
          <Reveal key={line} as="span" variant="headingReveal" delay={0.1 + index * 0.1} className={styles.headingLine}>
            {index > 0 && " "}
            <Emphasis text={line} className="text-accent" />
          </Reveal>
        ))}
      </h2>
    </header>
  );
}
