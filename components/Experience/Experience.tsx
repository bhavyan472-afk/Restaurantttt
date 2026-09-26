import { existsSync } from "node:fs";
import path from "node:path";
import { experience } from "@/data/experience";
import { ExperienceAside } from "./ExperienceAside";
import { ExperienceCTA } from "./ExperienceCTA";
import { ExperienceHeader } from "./ExperienceHeader";
import { ExperiencePillars } from "./ExperiencePillars";
import { ExperienceVisual } from "./ExperienceVisual";
import styles from "./experience.module.css";

/** The path if the file exists in /public, otherwise null (placeholder). */
function resolve(src: string): string | null {
  return existsSync(path.join(process.cwd(), "public", src)) ? src : null;
}

/**
 * Dining Experience section.
 *
 * Server component: copy from data/experience.ts, photography resolved at
 * build time like every other section. Client JS is limited to the images
 * (art direction, parallax, fallback) and the scroll reveals.
 */
export function Experience() {
  const { visual, aside } = experience;

  return (
    <section
      id="experience"
      className={`section tone-alt ${styles.section}`}
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <ExperienceHeader
          eyebrow={experience.eyebrow}
          heading={experience.heading}
          intro={experience.intro}
          paragraphs={experience.paragraphs}
          closing={experience.closing}
        />

        <ExperienceVisual
          wide={resolve(visual.wide)}
          portrait={resolve(visual.portrait)}
          alt={visual.alt}
          video={visual.video && resolve(visual.video)}
          details={experience.details}
        />

        <div className={styles.pillarsBlock} data-aside={Boolean(aside)}>
          {aside && <ExperienceAside src={resolve(aside.src)} alt={aside.alt} />}

          <div className={styles.pillarsColumn}>
            <ExperiencePillars pillars={experience.pillars} />
            <ExperienceCTA label={experience.cta.label} href={experience.cta.href} />
          </div>
        </div>
      </div>
    </section>
  );
}
