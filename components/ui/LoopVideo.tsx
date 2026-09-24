"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./loopVideo.module.css";

type LoopVideoProps = {
  /** Muted MP4 loop, path under /public. */
  src: string;
  /** Only play when this media query matches, e.g. "(min-width: 768px)". */
  media?: string;
  className?: string;
};

/**
 * A short muted loop laid over a framed photograph (the photograph stays
 * underneath as the poster). It plays only while on screen, fades in once it
 * is actually playing, and is never loaded for reduced-motion or data-saver
 * visitors — they keep the still. Decorative: the photograph carries the alt.
 */
export function LoopVideo({ src, media, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce) return setAllowed(false);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return;
    if (!media) return setAllowed(true);
    const query = window.matchMedia(media);
    const update = () => setAllowed(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduce, media]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !allowed) return;
    video.muted = true;
    video.setAttribute("muted", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [allowed]);

  if (!allowed || failed) return null;

  return (
    <video
      ref={ref}
      className={cn(styles.video, className)}
      data-playing={playing}
      src={encodeURI(src)}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onError={() => setFailed(true)}
    />
  );
}
