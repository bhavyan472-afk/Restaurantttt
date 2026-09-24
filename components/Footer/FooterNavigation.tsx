import { footerCopy } from "@/data/footer";
import { footerLinks } from "@/data/navigation";
import styles from "./footer.module.css";

/** In-page links; smooth scrolling and the navbar offset come from globals.css. */
export function FooterNavigation() {
  return (
    <nav className={styles.group} aria-labelledby="footer-explore">
      <h2 id="footer-explore" className={`label ${styles.groupLabel}`}>
        {footerCopy.labels.explore}
      </h2>
      <ul role="list" className={styles.navList}>
        {footerLinks.map((link) => (
          <li key={link.id}>
            <a href={link.href} className={`link ${styles.navLink}`}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
