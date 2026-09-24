import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { locationCopy as copy } from "@/data/location";
import { location, openingHours, restaurantData } from "@/data/restaurant";
import { addressLines, directionsUrl } from "@/lib/location";
import styles from "./location.module.css";

/**
 * Address, hours, phone and email as a definition list, then the actions.
 * Every value is read from data/restaurant.ts. Getting-there notes
 * (transport, parking, accessibility) appear only if the data provides them.
 */
export function LocationDetails() {
  const extras = (["transport", "parking", "accessibility"] as const).filter(
    (key) => location[key],
  );

  return (
    <div className={styles.details}>
      <Reveal delay={0.25}>
        <dl className={styles.facts}>
          <div className={`${styles.fact} ${styles.factWide}`}>
            <dt className={`label ${styles.factLabel}`}>{copy.labels.address}</dt>
            <dd>
              <address className={styles.address}>
                <span className={styles.addressName}>{restaurantData.name}</span>
                {addressLines().map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </dd>
          </div>

          <div className={`${styles.fact} ${styles.factWide}`}>
            <dt className={`label ${styles.factLabel}`}>{copy.labels.hours}</dt>
            <dd>
              <ul role="list" className={styles.hours}>
                {openingHours.map((entry) => (
                  <li key={entry.days} className={styles.hoursRow}>
                    <span>{entry.days}</span>
                    <span className={styles.hoursTime}>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className={styles.fact}>
            <dt className={`label ${styles.factLabel}`}>{copy.labels.phone}</dt>
            <dd>
              <a href={`tel:${restaurantData.phone}`} className={`link ${styles.contactLink}`}>
                {restaurantData.phoneDisplay}
              </a>
            </dd>
          </div>

          <div className={styles.fact}>
            <dt className={`label ${styles.factLabel}`}>{copy.labels.email}</dt>
            <dd>
              <a href={`mailto:${restaurantData.email}`} className={`link ${styles.contactLink}`}>
                {restaurantData.email}
              </a>
            </dd>
          </div>

          {extras.map((key) => (
            <div key={key} className={`${styles.fact} ${styles.factWide}`}>
              <dt className={`label ${styles.factLabel}`}>{copy.labels[key]}</dt>
              <dd className={styles.note}>{location[key]}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.35} className={styles.actions}>
        <Button href={directionsUrl()} target="_blank" rel="noopener noreferrer" className={styles.action}>
          {copy.directions}
          <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
        </Button>
        <div className={styles.secondaryActions}>
          <Button variant="secondary" arrow={false} href={`tel:${restaurantData.phone}`} className={styles.action}>
            {copy.call}
          </Button>
          <Button variant="secondary" arrow={false} href={`mailto:${restaurantData.email}`} className={styles.action}>
            {copy.email}
          </Button>
        </div>
        <a href="#reservations" className={`link ${styles.reserve}`}>
          {copy.reserve}
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </div>
  );
}
