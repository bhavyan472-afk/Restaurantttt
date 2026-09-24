import { SocialIcon, socialLinkLabel } from "@/components/ui/SocialIcon";
import { socialLinks, socialLinksAreDemo } from "@/data/restaurant";
import styles from "./contact.module.css";

/**
 * The restaurant's social profiles, from `socialLinks` in data/restaurant.ts.
 * Each icon is a real link with a spoken name. While the links are demo
 * placeholders that is said both in the accessible name and on screen.
 */
export function SocialLinks({ label, demoNote }: { label: string; demoNote: string }) {
  if (socialLinks.length === 0) return null;

  return (
    <div className={styles.block}>
      <h3 className={`label ${styles.blockLabel}`}>{label}</h3>
      <ul role="list" className={styles.socials}>
        {socialLinks.map((link) => (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              <SocialIcon platform={link.platform} />
              <span className="visually-hidden">{socialLinkLabel(link)}</span>
            </a>
          </li>
        ))}
      </ul>
      {socialLinksAreDemo && <p className={styles.smallNote}>{demoNote}</p>}
    </div>
  );
}
