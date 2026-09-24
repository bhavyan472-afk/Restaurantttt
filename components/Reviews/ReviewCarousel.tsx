"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";
import styles from "./reviews.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ back }: { back?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false"
      style={back ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The remaining reviews as a scroll-snap row: three across on laptops, two
 * on tablets, one (with the next peeking in) on phones.
 *
 * Native scrolling does the heavy lifting — touch swipe, trackpads and arrow
 * keys on the focused row all work without a carousel library. Buttons step
 * one review at a time. No autoplay: nothing moves unless the guest moves
 * it, and every review is in the DOM for screen readers either way.
 */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [view, setView] = useState({ first: 0, visible: 1, atStart: true, atEnd: false });

  /** Distance from one slide to the next (width + gap). */
  const step = () => {
    const track = trackRef.current;
    const [a, b] = track ? Array.from(track.children) as HTMLElement[] : [];
    if (!a) return 0;
    return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
  };

  const measure = useCallback(() => {
    const track = trackRef.current;
    const distance = step();
    if (!track || !distance) return;
    const first = Math.round(track.scrollLeft / distance);
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / distance));
    setView({
      first: Math.min(first, reviews.length - 1),
      visible: Math.min(visible, reviews.length),
      atStart: track.scrollLeft <= 2,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    });
  }, [reviews.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(onScroll);
    resize.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      resize.disconnect();
    };
  }, [measure]);

  const go = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * step(), behavior: reduce ? "auto" : "smooth" });
  };

  const last = Math.min(view.first + view.visible, reviews.length);
  const position =
    view.visible > 1
      ? `${pad(view.first + 1)}–${pad(last)}`
      : pad(view.first + 1);

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="More guest reviews">
      <div
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-label="Guest reviews — scroll or use the arrow keys"
        onKeyDown={(event) => {
          // One review per key press, matching the buttons.
          if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${reviews.length}`}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <p className={styles.position} aria-hidden="true">
          <span className={styles.positionCurrent}>{position}</span>
          <span className={styles.positionTotal}> / {pad(reviews.length)}</span>
        </p>
        {/* The same, in words, announced as it changes. */}
        <p className="visually-hidden" aria-live="polite">
          {view.visible > 1
            ? `Showing reviews ${view.first + 1} to ${last} of ${reviews.length}`
            : `Showing review ${view.first + 1} of ${reviews.length}`}
        </p>

        <div
          className={styles.progress}
          aria-hidden="true"
          style={{ "--progress": `${(last / reviews.length) * 100}%` } as React.CSSProperties}
        />

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous reviews"
            aria-disabled={view.atStart}
            onClick={() => !view.atStart && go(-1)}
          >
            <Arrow back />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next reviews"
            aria-disabled={view.atEnd}
            onClick={() => !view.atEnd && go(1)}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
