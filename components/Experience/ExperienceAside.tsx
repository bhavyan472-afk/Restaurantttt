"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./experience.module.css";

type ExperienceAsideProps = {
  /** Resolved at build time; null when the file has not been supplied. */
  src: string | null;
  alt: string;
};

/** Portrait that stays in view beside the pillars (laptops and up only). */
export function ExperienceAside({ src, alt }: ExperienceAsideProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.aside}>
      <Reveal variant="imageReveal" className={styles.imageReveal}>
        <div className={`frame ${styles.asideFrame}`}>
          {src !== null && !failed ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1440px) 420px, 30vw"
              onError={() => setFailed(true)}
            />
          ) : (
            <span className={styles.asidePlaceholder} aria-hidden="true" />
          )}
        </div>
      </Reveal>
    </div>
  );
}
