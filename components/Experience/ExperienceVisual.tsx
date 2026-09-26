"use client";

import { getImageProps } from "next/image";
import { m } from "motion/react";
import { useRef, useState } from "react";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useScrollParallax } from "@/lib/useScrollParallax";
import styles from "./experience.module.css";

type ExperienceVisualProps = {
  /** Landscape photograph for tablet and up; null if not supplied. */
  wide: string | null;
  /** Portrait photograph for phones; null if not supplied. */
  portrait: string | null;
  alt: string;
  /** Muted loop over the photograph, tablet and up; null/absent for none. */
  video?: string | null;
  details: string[];
};

const WIDE_SIZES = "(min-width: 1440px) 1360px, 100vw";
const PORTRAIT_SIZES = "100vw";

/**
 * Art-directed photograph: a separate portrait for phones rather than a
 * centre crop of the landscape, which would cut guests or the fire out of
 * frame. One <img> inside a <picture>, so the browser downloads only the
 * photograph for the current viewport.
 *
 * If only one of the two is supplied it serves every viewport.
 */
function Photograph({
  wide,
  portrait,
  alt,
  onError,
}: {
  wide: string;
  portrait: string;
  alt: string;
  onError: () => void;
}) {
  const { props: base } = getImageProps({
    src: portrait,
    alt,
    fill: true,
    sizes: wide === portrait ? WIDE_SIZES : PORTRAIT_SIZES,
  });

  if (wide === portrait) {
    return <img {...base} alt={alt} className={styles.photo} onError={onError} />;
  }

  const {
    props: { srcSet, sizes },
  } = getImageProps({ src: wide, alt, fill: true, sizes: WIDE_SIZES });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={srcSet} sizes={sizes} />
      <img {...base} alt={alt} className={styles.photo} onError={onError} />
    </picture>
  );
}

export function ExperienceVisual({
  wide,
  portrait,
  alt,
  video,
  details,
}: ExperienceVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { y, enabled } = useScrollParallax(ref, 4);
  const [failed, setFailed] = useState(false);

  const wideSrc = wide ?? portrait;
  const portraitSrc = portrait ?? wide;
  const showImage = wideSrc !== null && portraitSrc !== null && !failed;

  return (
    <figure className={styles.visual}>
      <Reveal variant="imageReveal" className={styles.imageReveal}>
        <div ref={ref} className={cn("frame", styles.visualFrame)}>
          <m.div className={styles.mediaInner} data-parallax={enabled} style={{ y }}>
            {showImage ? (
              <Photograph
                wide={wideSrc}
                portrait={portraitSrc}
                alt={alt}
                onError={() => setFailed(true)}
              />
            ) : (
              /* Candlelit stand-in until photography is supplied: pools of
                 warm light at table height across a dark room. */
              <span className={styles.visualPlaceholder} aria-hidden="true" />
            )}
            {showImage && video && (
              <LoopVideo src={video} media="(min-width: 768px)" className={styles.photo} />
            )}
          </m.div>
        </div>
      </Reveal>

      <figcaption>
        <Reveal variant="fadeIn" delay={0.12}>
          <ul role="list" className={styles.details}>
            {details.map((detail) => (
              <li key={detail} className={`label ${styles.detail}`}>
                {detail}
              </li>
            ))}
          </ul>
        </Reveal>
      </figcaption>
    </figure>
  );
}
