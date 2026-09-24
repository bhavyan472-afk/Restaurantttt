import { SocialIcon, socialLinkLabel } from "@/components/ui/SocialIcon";
import { footerCopy } from "@/data/footer";
import { socialLinks, socialLinksAreDemo } from "@/data/restaurant";
import styles from "./footer.module.css";

/** `socialLinks` from data/restaurant.ts, shared with the Contact section. */
export function FooterSocials() {
  if (socialLinks.length === 0) return null;

  return (
    <div className={styles.group}>
      <h2 className={`label ${styles.groupLabel}`}>{footerCopy.labels.social}</h2>
      <ul role="list" className={styles.socials}>
        {socialLinks.map((link) => (
          <li key={link.platform}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.social}>
              <SocialIcon platform={link.platform} size={18} />
              <span className="visually-hidden">{socialLinkLabel(link)}</span>
            </a>
          </li>
        ))}
      </ul>
      {socialLinksAreDemo && <p className={styles.smallNote}>{footerCopy.socialDemoNote}</p>}
    </div>
  );
}
