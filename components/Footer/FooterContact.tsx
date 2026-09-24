import { footerCopy } from "@/data/footer";
import { restaurantData } from "@/data/restaurant";
import { addressLines, directionsUrl } from "@/lib/location";
import styles from "./footer.module.css";

/** Address with the Location section's directions link. */
export function FooterVisit() {
  return (
    <div className={styles.group}>
      <h2 className={`label ${styles.groupLabel}`}>{footerCopy.labels.visit}</h2>
      <address className={styles.address}>
        {addressLines().map((line) => (
          <span key={line}>{line}</span>
        ))}
      </address>
      <a
        href={directionsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`link ${styles.textAction}`}
      >
        {footerCopy.directions}
        <span aria-hidden="true">→</span>
        <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
      </a>
    </div>
  );
}

/** Phone and email, from data/restaurant.ts. */
export function FooterContact() {
  return (
    <div className={styles.group}>
      <h2 className={`label ${styles.groupLabel}`}>{footerCopy.labels.contact}</h2>
      <ul role="list" className={styles.contactList}>
        <li>
          <a href={`tel:${restaurantData.phone}`} className={`link ${styles.contactLink}`}>
            {restaurantData.phoneDisplay}
          </a>
        </li>
        <li>
          <a href={`mailto:${restaurantData.email}`} className={`link ${styles.contactLink}`}>
            {restaurantData.email}
          </a>
        </li>
      </ul>
    </div>
  );
}
