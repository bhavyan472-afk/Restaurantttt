"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useRef, useState } from "react";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { cn } from "@/lib/utils";
import { useScrollParallax } from "@/lib/useScrollParallax";
import styles from "./signature.module.css";

type SignatureMediaProps = {
  /** Resolved at build time; null when no photograph has been supplied. */
  src: string | null;
  alt: string;
  sizes: string;
  /** Shown in the placeholder when there is no photograph. */
  initial: string;
  /** Sets the frame's aspect ratio. */
  className?: string;
  /** Optional muted loop over the photograph. */
  video?: string;
};

/**
 * Framed dish photograph with a very slow scroll parallax (desktop only — see
 * useScrollParallax): the image drifts a few percent inside a frame that
 * clips it.
 */
export function SignatureMedia({
  src,
  alt,
  sizes,
  initial,
  className,
  video,
}: SignatureMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { y, enabled } = useScrollParallax(ref);
  const [failed, setFailed] = useState(false);
  const showImage = src !== null && !failed;

  return (
    <div ref={ref} className={cn("frame", styles.media, className)}>
      <m.div
        className={styles.mediaInner}
        data-parallax={enabled}
        style={{ y }}
      >
        {showImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={styles.image}
            // Below the fold: next/image lazy-loads by default.
            onError={() => setFailed(true)}
          />
        ) : (
          /* Designed stand-in until photography is supplied. The dish name is
             in the heading beside it, so this is decorative. */
          <span className={styles.placeholder} aria-hidden="true">
            {initial}
          </span>
        )}
        {showImage && video && <LoopVideo src={video} className={styles.image} />}
      </m.div>
    </div>
  );
}
