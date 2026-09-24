import { footerCopy } from "@/data/footer";
import { restaurantData } from "@/data/restaurant";
import styles from "./footer.module.css";

/** Name, tagline and statement. The name is a paragraph, not a heading:
    the page's only h1 is the hero's. */
export function FooterBrand() {
  return (
    <div className={styles.brand}>
      <p className={styles.brandName}>{restaurantData.name}</p>
      <p className={`label ${styles.tagline}`}>{restaurantData.tagline}</p>
      <p className={styles.statement}>{footerCopy.statement}</p>
    </div>
  );
}
