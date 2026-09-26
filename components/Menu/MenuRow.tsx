import Image from "next/image";
import { DietaryTags, PopularBadge } from "./MenuBadge";
import type { MenuItem } from "@/data/menu";
import styles from "./menu.module.css";

type MenuRowProps = {
  item: MenuItem;
  /** Featured and its photo exists (resolved at build time). */
  showImage: boolean;
};

/**
 * One dish, as a printed menu sets it: name, dotted leader, price aligned
 * right; the description and tags beneath. Only featured dishes carry a
 * small photo, so a long category stays compact.
 */
export function MenuRow({ item, showImage }: MenuRowProps) {
  const hasMeta = item.popular || (item.dietary && item.dietary.length > 0);

  return (
    <li className={styles.row}>
      {showImage && item.video ? (
        <div className={`frame ${styles.thumb}`}>
          <video
            // Safari/iOS only autoplay when the `muted` attribute is present,
            // which React sets as a property but never renders.
            ref={(video) => {
              if (video) {
                video.muted = true;
                video.setAttribute("muted", "");
              }
            }}
            src={encodeURI(item.video)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label={item.alt ?? item.name}
          />
        </div>
      ) : (
        showImage &&
        item.image && (
          <div className={`frame ${styles.thumb}`}>
            <Image src={item.image} alt={item.alt ?? item.name} fill sizes="80px" />
          </div>
        )
      )}

      <div className={styles.rowBody}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{item.name}</h3>
          <span className={styles.leader} aria-hidden="true" />
          <span className={styles.price}>{item.price}</span>
        </div>

        <p className={styles.description}>{item.description}</p>

        {hasMeta && (
          <div className={styles.meta}>
            {item.popular && <PopularBadge />}
            {item.dietary && item.dietary.length > 0 && <DietaryTags tags={item.dietary} />}
          </div>
        )}
      </div>
    </li>
  );
}
