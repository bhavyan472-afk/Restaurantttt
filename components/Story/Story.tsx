import { existsSync } from "node:fs";
import path from "node:path";
import { story, type StoryImage as StoryImageData } from "@/data/story";
import { StoryContent } from "./StoryContent";
import { StoryCTA } from "./StoryCTA";
import { StoryHeader } from "./StoryHeader";
import { StoryImage, type ResolvedStoryImage } from "./StoryImage";
import { StoryPrinciples } from "./StoryPrinciples";
import styles from "./story.module.css";

/** Null when the file has not been supplied, so the placeholder shows instead. */
function resolve(image: StoryImageData): ResolvedStoryImage {
  const exists = existsSync(path.join(process.cwd(), "public", image.src));
  return { src: exists ? image.src : null, alt: image.alt };
}

/**
 * Restaurant Story section.
 *
 * Server component: copy comes from data/story.ts and photography is resolved
 * at build time, like the menu and signature dishes. The only client JS is
 * the image (parallax, fallback) and the scroll reveals.
 */
export function Story() {
  const { images } = story;

  return (
    <section id="story" className={`section tone-alt ${styles.section}`} aria-labelledby="story-heading">
      <div className="container">
        {/* Source order is the mobile order: header, image, story. The grid
            moves the image beside the text from 1024px up. */}
        <div className={styles.layout}>
          <StoryHeader eyebrow={story.eyebrow} heading={story.heading} />

          <StoryImage
            main={resolve(images.main)}
            detail={images.detail && resolve(images.detail)}
            caption={story.caption}
          />

          <StoryContent
            lead={story.lead}
            paragraphs={story.paragraphs}
            closing={story.closing}
          />
        </div>

        <StoryPrinciples principles={story.principles} />
        <StoryCTA label={story.cta.label} href={story.cta.href} />
      </div>
    </section>
  );
}
