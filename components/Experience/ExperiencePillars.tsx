import type { ExperiencePillar as Pillar } from "@/data/experience";
import { ExperiencePillar } from "./ExperiencePillar";
import styles from "./experience.module.css";

export function ExperiencePillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <ol role="list" className={styles.pillars} aria-label="The experience">
      {pillars.map((pillar, index) => (
        <ExperiencePillar key={pillar.title} pillar={pillar} index={index} />
      ))}
    </ol>
  );
}
