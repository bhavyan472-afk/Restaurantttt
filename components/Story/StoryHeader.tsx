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

      {/* One reveal for the whole heading; each line is still its own block,
          so the break is a design decision. The space keeps "fire. Crafted"
          apart in the accessible name. */}
      <Reveal variant="headingReveal" delay={0.05}>
        <h2 id="story-heading" className={`text-section ${styles.heading}`}>
          {heading.map((line, index) => (
            <span key={line} className={styles.headingLine}>
              {index > 0 && " "}
              <Emphasis text={line} className="text-accent" />
            </span>
          ))}
        </h2>
      </Reveal>
    </header>
  );
}
