import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { locationCopy as copy } from "@/data/location";
import { location, restaurantData, restaurantDataIsDemo } from "@/data/restaurant";
import { directionsUrl, fullAddress, streetName } from "@/lib/location";
import { LocationDetails } from "./LocationDetails";
import { LocationMap } from "./LocationMap";
import styles from "./location.module.css";

/**
 * Location section: heading and details on the left, the map on the right
 * (below, on phones). Server component; the map is the only client piece.
 */
export function Location() {
  return (
    <section id="location" className={`section tone-base ${styles.section}`} aria-labelledby="location-heading">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.info}>
            <header className={styles.header}>
              <Reveal>
                <p className={`label ${styles.eyebrow}`}>{copy.eyebrow}</p>
              </Reveal>
              <Reveal variant="headingReveal" delay={0.1}>
                <h2 id="location-heading" className={`text-section ${styles.heading}`}>
                  <Emphasis text={copy.heading} className="text-accent" />
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className={`text-body-lg ${styles.intro}`}>{copy.intro}</p>
              </Reveal>
            </header>

            <LocationDetails />
          </div>

          <Reveal variant="imageReveal" delay={0.15} className={styles.mapReveal}>
            <LocationMap
              name={restaurantData.name}
              address={fullAddress()}
              street={streetName()}
              directionsUrl={directionsUrl()}
              embedUrl={location.mapEmbedUrl}
              isDemo={restaurantDataIsDemo}
              labels={{
                demoNote: copy.demoMapNote,
                unavailable: copy.mapUnavailable,
                viewDirections: copy.viewDirections,
              }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
