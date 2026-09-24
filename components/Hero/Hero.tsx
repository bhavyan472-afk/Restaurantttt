import { existsSync } from "node:fs";
import path from "node:path";
import { HeroContent } from "./HeroContent";
import { HeroMedia, type VideoSource } from "./HeroMedia";
import { heroMedia } from "@/data/hero";
import styles from "./hero.module.css";

/**
 * Full-screen cinematic hero.
 *
 * Layers, back to front: video → poster → scrim → vignette → content.
 *
 * Server component: it resolves which video files actually exist in /public
 * at build time, so a video that has not been supplied yet is simply not
 * referenced. That avoids a guaranteed 404 and a broken media element, and
 * the hero falls back to the poster — which is designed to carry the section
 * on its own. Dropping the real files in and rebuilding is all it takes.
 */

const MIME: Record<string, string> = {
  ".webm": "video/webm",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
};

function resolveSources(candidates: readonly string[]): VideoSource[] {
  return candidates
    .filter((src) => existsSync(path.join(process.cwd(), "public", src)))
    // Checked on disk as written; served URL-encoded (file names may have spaces).
    .map((src) => ({ src: encodeURI(src), type: MIME[path.extname(src).toLowerCase()] }))
    .filter((source): source is VideoSource => Boolean(source.type));
}

export function Hero() {
  const desktop = resolveSources(heroMedia.desktop);
  // Falls back to the desktop files when no mobile-specific encode exists.
  const mobile = resolveSources(heroMedia.mobile);

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <HeroMedia
        desktop={desktop}
        mobile={mobile.length > 0 ? mobile : desktop}
        poster={heroMedia.poster}
        alt={heroMedia.alt}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <HeroContent />
    </section>
  );
}
