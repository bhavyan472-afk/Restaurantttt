import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./experience.module.css";

type ExperienceHeaderProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  paragraphs: string[];
  closing: string[];
};

/**
 * Oversized heading on the left, the longer copy set against it on the right
 * from 1024px up; stacked below that.
 */
export function ExperienceHeader({
  eyebrow,
  heading,
  intro,
  paragraphs,
  closing,
}: ExperienceHeaderProps) {
  return (
    <div className={styles.intro}>
      <header className={styles.header}>
        <Reveal>
          <p className={`label ${styles.eyebrow}`}>{eyebrow}</p>
        </Reveal>

        <Reveal variant="headingReveal" delay={0.1}>
          <h2 id="experience-heading" className={styles.heading}>
            <Emphasis text={heading} className="text-accent" />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className={`text-body-lg ${styles.introText}`}>{intro}</p>
        </Reveal>
      </header>

      <Reveal delay={0.3} className={styles.copy}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <Emphasis text={paragraph} className={styles.highlight} />
          </p>
        ))}

        <p className={styles.closing}>
          {closing.map((line) => (
            <span key={line} className={styles.closingLine}>
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </div>
  );
}
