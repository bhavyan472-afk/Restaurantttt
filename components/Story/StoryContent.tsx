import { Reveal } from "@/components/ui/Reveal";
import { Emphasis } from "@/components/ui/Emphasis";
import styles from "./story.module.css";

type StoryContentProps = {
  lead: string;
  paragraphs: string[];
  closing: string[];
};

/**
 * The story itself: a large opening line, the body, and a short sign-off.
 * Revealed in three beats rather than line by line — it is meant to be read.
 */
export function StoryContent({ lead, paragraphs, closing }: StoryContentProps) {
  return (
    <div className={styles.content}>
      <Reveal delay={0.2}>
        <p className={styles.lead}>{lead}</p>
      </Reveal>

      <Reveal delay={0.3} className={styles.body}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <Emphasis text={paragraph} className={styles.highlight} />
          </p>
        ))}
      </Reveal>

      <Reveal delay={0.4}>
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
