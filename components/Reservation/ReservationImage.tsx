"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./reservation.module.css";

type ReservationImageProps = {
  /** Resolved at build time; null when the file has not been supplied. */
  src: string | null;
  alt: string;
};

/** Atmosphere photograph, or a candlelit placeholder if it is missing. */
export function ReservationImage({ src, alt }: ReservationImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`frame ${styles.imageFrame}`}>
      {src !== null && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={styles.imagePlaceholder} aria-hidden="true" />
      )}
    </div>
  );
}
