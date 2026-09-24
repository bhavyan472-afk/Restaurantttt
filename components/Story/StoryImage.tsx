"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useScrollParallax } from "@/lib/useScrollParallax";
import styles from "./story.module.css";

export type ResolvedStoryImage = {
  /** Resolved at build time; null when the file has not been supplied. */
  src: string | null;
  alt: string;
};

type StoryImageProps = {
  main: ResolvedStoryImage;
  detail?: ResolvedStoryImage;
  caption: string;
};

/** Five of twelve columns on a laptop, most of the width below that. */
const MAIN_SIZES = "(min-width: 1440px) 620px, (min-width: 1024px) 44vw, 90vw";
const DETAIL_SIZES = "(min-width: 1024px) 240px, 40vw";

/** One photograph, or the firelit stand-in if it is missing or fails. */
function Photo({
  image,
  sizes,
  monogram,
}: {
  image: ResolvedStoryImage;
  sizes: string;
  monogram?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (image.src === null || failed) {
    return (
      <span className={styles.placeholder} aria-hidden="true">
        {monogram && <span className={styles.monogram}>E&amp;S</span>}
      </span>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      // Below the fold: next/image lazy-loads by default.
      onError={() => setFailed(true)}
    />
  );
}

/**
 * The large portrait with its curtain reveal and slow parallax, a small
 * square detail set over its lower corner, and a caption.
 */
export function StoryImage({ main, detail, caption }: StoryImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { y, enabled } = useScrollParallax(ref, 4);

  return (
    <figure className={styles.visual}>
      {/* The detail sits outside the curtain-revealed frame: inside it, the
          clip-path would cut off the part that overhangs. */}
      <div className={styles.visualMedia}>
        <Reveal variant="imageReveal" delay={0.15} className={styles.imageReveal}>
          <div ref={ref} className={cn("frame", styles.mainFrame)}>
            <m.div className={styles.mediaInner} data-parallax={enabled} style={{ y }}>
              <Photo image={main} sizes={MAIN_SIZES} monogram />
            </m.div>
          </div>
        </Reveal>

        {detail && (
          <Reveal delay={0.55} className={styles.detail}>
            <div className={cn("frame", styles.detailFrame)}>
              <Photo image={detail} sizes={DETAIL_SIZES} />
            </div>
          </Reveal>
        )}
      </div>

      <figcaption className={`label ${styles.caption}`}>
        <Reveal variant="fadeIn" delay={0.7} as="span">
          {caption}
        </Reveal>
      </figcaption>
    </figure>
  );
}
