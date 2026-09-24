import { footerCopy } from "@/data/footer";
import { openingHours } from "@/data/restaurant";
import styles from "./footer.module.css";

/** `openingHours` from data/restaurant.ts — the same source as every other section. */
export function FooterHours() {
  return (
    <div className={styles.group}>
      <h2 className={`label ${styles.groupLabel}`}>{footerCopy.labels.hours}</h2>
      <dl className={styles.hours}>
        {openingHours.map((entry) => (
          <div key={entry.days} className={styles.hoursRow}>
            <dt>{entry.days}</dt>
            <dd>{entry.hours}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
