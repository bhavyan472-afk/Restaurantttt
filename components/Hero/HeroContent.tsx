"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { heroContent } from "@/data/hero";
import { location } from "@/data/restaurant";
import styles from "./hero.module.css";

/**
 * Hero copy and calls to action.
 *
 * Entrance runs once on load, in a deliberate order: label → heading lines →
 * supporting copy → buttons → footer cues. Each heading line rides up out of
 * an overflow-hidden mask, which reads as a print reveal rather than a slide.
 * It is CSS (see "Entrance" in hero.module.css) so it never waits on
 * hydration; `--i` is each element's place in the stagger.
 */

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function HeroContent() {
  /* Scroll-out: the copy drifts down more slowly than the page and dims,
     against the media's own push-in (HeroMedia), for a little depth; the
     scroll cue fades as soon as scrolling starts. Style bindings are not
     stripped by MotionConfig, so the movement is zeroed by hand under
     reduced motion — the cue's fade is kept, it is not motion. */
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "16%"]);

  /* The fades are written straight to the elements from the same scroll
     progress — a direct style write, no re-render. The entrance animates
     the children, never these two, so the two never fight over opacity. */
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - progress / 0.12));
    if (innerRef.current) {
      innerRef.current.style.opacity = reduce ? "" : String(1 - Math.min(progress / 0.75, 1) * 0.7);
    }
  });

  return (
    <div ref={rootRef} className={styles.content}>
      <m.div ref={innerRef} className={`container ${styles.inner}`} style={{ y: copyY }}>
        <p className={`label ${styles.brand} ${styles.enter}`} style={step(0)}>
          {heroContent.label}
        </p>

        <h1 id="hero-heading" className={styles.heading}>
          {heroContent.headingLines.map((line, index) => (
            <span key={line.text} className={styles.line}>
              <span
                className={line.accent ? styles.lineAccent : undefined}
                style={step(1 + index)}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <p
          className={`${styles.supporting} ${styles.enter}`}
          style={step(1 + heroContent.headingLines.length)}
        >
          {heroContent.supporting}
        </p>

        <div
          className={`btn-group cluster ${styles.enter}`}
          style={step(2 + heroContent.headingLines.length)}
        >
          <Magnetic>
            <Button href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Button>
          </Magnetic>
          <Button variant="secondary" href={heroContent.secondaryCta.href}>
            {heroContent.secondaryCta.label}
          </Button>
        </div>
      </m.div>

      {/* Outside .inner so it stays pinned to the bottom of the viewport
          while the copy above it centres or sits low. The outer layer
          carries the scroll fade, the inner one the entrance. */}
      <div ref={cueRef}>
        <div
          className={`container ${styles.foot} ${styles.enter}`}
          style={step(3 + heroContent.headingLines.length)}
        >
          <a href={heroContent.scrollHref} className={styles.scroll}>
            <span className="label">{heroContent.scrollLabel}</span>
            <span className={styles.scrollTrack} aria-hidden="true">
              <span className={styles.scrollDot} />
            </span>
          </a>

          <p className={`label ${styles.meta}`}>
            {location.city}, {location.region}
          </p>
        </div>
      </div>
    </div>
  );
}
