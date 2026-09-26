import { existsSync } from "node:fs";
import path from "node:path";
import { MenuBrowser } from "./MenuBrowser";
import { MenuHeader } from "./MenuHeader";
import { menuItems } from "@/data/menu";
import styles from "./menu.module.css";

/**
 * Full Menu: a compact, printed-menu list, one category at a time.
 *
 * Server component: it checks at build time which FEATURED dishes actually
 * have their photo in /public, so a missing file simply shows no photo —
 * never a broken image. Only featured dishes show a photo.
 */
export function Menu() {
  const imagesAvailable = menuItems
    .filter((item) => {
      const media = item.video ?? item.image;
      return item.featured && media && existsSync(path.join(process.cwd(), "public", media));
    })
    .map((item) => item.id);

  return (
    <section
      id="menu"
      className={`section tone-base ${styles.section}`}
      aria-labelledby="menu-heading"
    >
      <div className="container">
        <MenuHeader />
        <MenuBrowser imagesAvailable={imagesAvailable} />
      </div>
    </section>
  );
}
