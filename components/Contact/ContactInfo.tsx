import { Reveal } from "@/components/ui/Reveal";
import { contactCopy as copy } from "@/data/contact";
import { openingHours, restaurantData } from "@/data/restaurant";
import { addressLines, directionsUrl } from "@/lib/location";
import { SocialLinks } from "./SocialLinks";
import styles from "./contact.module.css";

function Arrow() {
  return (
    <svg className={styles.methodArrow} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Call / email / find-us rows, dinner hours, social links and the
 * hospitality note. Every fact is read from data/restaurant.ts; the Find Us
 * row reuses the Location section's directions link (lib/location.ts).
 */
export function ContactInfo() {
  return (
    <div className={styles.info}>
      <Reveal delay={0.2}>
        <ul role="list" className={styles.methods}>
          <li>
            <a href={`tel:${restaurantData.phone}`} className={styles.method}>
              <span className={`label ${styles.methodLabel}`}>{copy.methods.call}</span>
              <span className={styles.methodValue}>{restaurantData.phoneDisplay}</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href={`mailto:${restaurantData.email}`} className={styles.method}>
              <span className={`label ${styles.methodLabel}`}>{copy.methods.email}</span>
              <span className={styles.methodValue}>{restaurantData.email}</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a
              href={directionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.method}
            >
              <span className={`label ${styles.methodLabel}`}>{copy.methods.find}</span>
              <address className={`${styles.methodValue} ${styles.address}`}>
                <span className={styles.addressName}>{restaurantData.name}</span>
                {addressLines().map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <span className="visually-hidden"> {copy.methods.findHint}</span>
              <Arrow />
            </a>
          </li>
        </ul>
      </Reveal>

      <div className={styles.aside}>
        <Reveal delay={0.1} className={styles.block}>
          <h3 className={`label ${styles.blockLabel}`}>{copy.hoursLabel}</h3>
          <dl className={styles.hours}>
            {openingHours.map((entry) => (
              <div key={entry.days} className={styles.hoursRow}>
                <dt>{entry.days}</dt>
                <dd>{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <SocialLinks label={copy.socialLabel} demoNote={copy.socialDemoNote} />
        </Reveal>

        <Reveal delay={0.2} className={`${styles.block} ${styles.hospitality}`}>
          <h3 className={`label ${styles.blockLabel}`}>{copy.hospitality.label}</h3>
          <p className={styles.hospitalityText}>{copy.hospitality.text}</p>
        </Reveal>
      </div>
    </div>
  );
}
