import { existsSync } from "node:fs";
import path from "node:path";
import { MenuBrowser } from "./MenuBrowser";
import { MenuHeader } from "./MenuHeader";
import { menuItems } from "@/data/menu";
import styles from "./menu.module.css";

/**
 * Menu section.
 *
 * Server component: it resolves which dishes actually have photography in
 * /public at build time, the same approach the hero uses for its video. A
 * dish whose file has not been supplied renders a designed placeholder rather
 * than a broken image, and dropping the photo in at
 * /public/images/menu/<id>.webp is all it takes to swap it in.
 */
export function Menu() {
  const imagesAvailable = menuItems
    .filter((item) => existsSync(path.join(process.cwd(), "public", item.image)))
    .map((item) => item.id);

  return (
    <section
      id="menu"
      className={`section tone-alt ${styles.section}`}
      aria-labelledby="menu-heading"
    >
      <div className="container">
        <MenuHeader />
        <MenuBrowser imagesAvailable={imagesAvailable} />
      </div>
    </section>
  );
}
