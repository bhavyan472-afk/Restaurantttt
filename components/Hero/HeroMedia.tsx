"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

export type VideoSource = { src: string; type: string };

type HeroMediaProps = {
  desktop: VideoSource[];
  mobile: VideoSource[];
  poster: string;
  alt: string;
};

/**
 * Background layer: poster image with the looping video over it.
 *
 * The poster is always rendered and priority-loaded, so the section paints
 * immediately and still looks finished if the video never arrives. The video
 * fades in only once it is actually playing, which avoids a flash of black.
 *
 * The <source> elements are attached after mount rather than during SSR. That
 * lets us pick the right encode for the viewport without loading two, keeps
 * the video off the critical path, and means a reduced-motion visitor never
 * downloads it at all.
 */
export function HeroMedia({ desktop, mobile, poster, alt }: HeroMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<VideoSource[] | null>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return; // No motion wanted — poster only, and no video bytes.
    // Data saver or a slow connection: the poster carries the hero alone.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (connection?.saveData || /(^|-)2g|3g/.test(connection?.effectiveType ?? "")) return;
    const list = window.matchMedia("(max-width: 767px)").matches
      ? mobile
      : desktop;
    if (list.length > 0) setSources(list);
  }, [reduce, desktop, mobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sources) return;
    // React sets the `muted` property but never renders the attribute, and
    // Safari/iOS consult the attribute when deciding whether autoplay is
    // allowed. Set both, before load(), or playback is refused.
    video.muted = true;
    video.setAttribute("muted", "");
    video.load();
    // Autoplay can still be refused (data saver, battery saver). The poster
    // stays visible if it is, so there is nothing to recover from.
    void video.play().catch(() => {});
  }, [sources]);

  /* Slow push-in as the hero leaves — transform only, so it stays on the
     compositor. Skipped entirely under reduced motion: these are style
     bindings rather than animations, so MotionConfig does not strip them. */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "10%"]);

  return (
    <div ref={wrapRef} className={styles.media}>
      <m.div className={styles.mediaInner} style={{ scale, y }}>
        <Image
          src={poster}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className={styles.poster}
        />

        {sources && (
          <video
            ref={videoRef}
            className={styles.video}
            data-playing={playing}
            // No `poster` attribute: the optimised <Image> above already shows
            // it, and the attribute would fetch the full-size original again.
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onError={() => setPlaying(false)}
          >
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}
      </m.div>
    </div>
  );
}
