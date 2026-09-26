import { Reveal } from "@/components/ui/Reveal";
import type { ExperiencePillar as Pillar } from "@/data/experience";
import { ExperienceIcon } from "./ExperienceIcon";
import styles from "./experience.module.css";

type ExperiencePillarProps = {
  pillar: Pillar;
  /** 0-based position; drives the number and the reveal stagger. */
  index: number;
};

/**
 * One editorial row: number, keyword, title, description, icon. Not
 * interactive — the hover state is decoration only, and every word is
 * visible without it.
 */
export function ExperiencePillar({ pillar, index }: ExperiencePillarProps) {
  return (
    <li className={styles.pillar}>
      <Reveal delay={index * 0.05} className={styles.pillarInner}>
        <span className={styles.pillarIndex} aria-hidden="true">
          <span className={styles.pillarNumber}>{String(index + 1).padStart(2, "0")}</span>
          <svg
            className={styles.pillarArrow}
            width="14"
            height="14"
            viewBox="0 0 18 18"
            fill="none"
            focusable="false"
          >
            <path
              d="M3 9h11M10 4.5 14.5 9 10 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div>
          <p className={`label ${styles.pillarKeyword}`}>{pillar.keyword}</p>
          <h3 className={styles.pillarTitle}>{pillar.title}</h3>
          <p className={styles.pillarText}>{pillar.description}</p>
        </div>

        <ExperienceIcon name={pillar.icon} className={styles.pillarIcon} />
      </Reveal>
    </li>
  );
}
