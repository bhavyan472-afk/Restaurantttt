import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Emphasis } from "@/components/ui/Emphasis";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Reveal } from "@/components/ui/Reveal";
import { galleryContent, galleryTiles } from "@/data/gallery";
import { cn } from "@/lib/utils";
import styles from "./gallery.module.css";

const exists = (src: string) => existsSync(path.join(process.cwd(), "public", src));

/** Four columns on laptops, two below; large/wide tiles span two. */
const SIZES = {
  large: "(min-width: 1024px) 50vw, 100vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
  tall: "(min-width: 1024px) 25vw, 50vw",
  base: "(min-width: 1024px) 25vw, 50vw",
};

/**
 * Gallery section: a mosaic of the kitchen's photography, with the short
 * clips playing in place on their tiles.
 *
 * Server component, like every other section: files are checked at build
 * time and a tile whose photograph is missing is dropped rather than shown
 * broken. The only client JS is the scroll reveals and the clip players.
 */
export function Gallery() {
  const tiles = galleryTiles
    .filter((tile) => exists(tile.src))
    .map((tile) => ({ ...tile, video: tile.video && exists(tile.video) ? tile.video : undefined }));

  if (tiles.length === 0) return null;

  return (
    <section id="gallery" className={`section tone-alt ${styles.section}`} aria-labelledby="gallery-heading">
      <div className="container">
        <header className={styles.header}>
          <div>
            <Reveal>
              <p className={`label ${styles.eyebrow}`}>{galleryContent.eyebrow}</p>
            </Reveal>
            <Reveal variant="headingReveal" delay={0.1}>
              <h2 id="gallery-heading" className="text-section">
                <Emphasis text={galleryContent.heading} className="text-accent" />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className={`text-body-lg ${styles.intro}`}>{galleryContent.intro}</p>
          </Reveal>
        </header>

        <ul role="list" className={styles.grid}>
          {tiles.map((tile, index) => (
            <Reveal
              key={tile.src + tile.caption}
              as="li"
              // Short cascade per row of four, not one long wait down the page.
              delay={(index % 4) * 0.08}
              className={cn(styles.tile, tile.size && styles[tile.size])}
            >
              <figure className={`frame ${styles.frame}`}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes={SIZES[tile.size ?? "base"]}
                  className={styles.image}
                />
                {tile.video && (
                  <LoopVideo
                    src={tile.video}
                    className={cn(styles.image, tile.cropMark && "video--crop-mark")}
                  />
                )}
                <figcaption className={`label ${styles.caption}`}>{tile.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
