import { ContactForm } from "@/components/Contact/ContactForm";
import { SocialLinks } from "@/components/Contact/SocialLinks";
import formStyles from "@/components/Reservation/reservation.module.css";
import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { visitCopy as copy } from "@/data/contact";
import { location, openingHours, restaurantData } from "@/data/restaurant";
import { addressLines, directionsUrl, fullAddress, mapEmbedUrl } from "@/lib/location";
import { emailEnabled } from "@/lib/mail";
import { telHref } from "@/lib/utils";
import styles from "./visit.module.css";

/**
 * Visit Us — everything needed to get here or get in touch, each fact once:
 * address, hours, phone and email beside a live Google map, then the contact
 * form. Every value comes from content/restaurant.ts.
 *
 * Server component; the form is the only client piece. The map is a plain
 * Google Maps embed built from the address — no API key.
 */
export function Visit() {
  const extras = (["transport", "parking", "accessibility"] as const).filter((key) => location[key]);

  return (
    <section id="visit" className={`section tone-alt ${styles.section}`} aria-labelledby="visit-heading">
      <div className="container">
        <header className={styles.header}>
          <Reveal>
            <p className={`label ${styles.eyebrow}`}>{copy.eyebrow}</p>
          </Reveal>
          <Reveal variant="headingReveal" delay={0.03}>
            <h2 id="visit-heading" className={`text-section ${styles.heading}`}>
              <Emphasis text={copy.heading} className="text-accent" />
            </h2>
          </Reveal>
          {copy.intro && (
            <Reveal delay={0.05}>
              <p className={`text-body-lg ${styles.intro}`}>{copy.intro}</p>
            </Reveal>
          )}
        </header>

        <div className={styles.top}>
          <Reveal className={styles.details}>
            <dl className={styles.facts}>
              <div className={`${styles.fact} ${styles.factWide}`}>
                <dt className={`label ${styles.factLabel}`}>{copy.labels.address}</dt>
                <dd>
                  <address className={styles.address}>
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
                  <a href={telHref(restaurantData.phone)} className={`link ${styles.contactLink}`}>
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

            <Button
              href={directionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directions}
            >
              {copy.directions}
              <span className="visually-hidden"> {copy.directionsHint}</span>
            </Button>
          </Reveal>

          <Reveal variant="fadeIn" delay={0.03} className={styles.mapWrap}>
            <div className={`frame ${styles.map}`}>
              <iframe
                className={styles.embed}
                src={mapEmbedUrl()}
                title={copy.mapTitle(restaurantData.name, fullAddress())}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <Reveal className={styles.aside}>
            <p className={`label ${styles.factLabel}`}>{copy.message.label}</p>
            <h3 className={`text-sub ${styles.asideHeading}`}>
              <Emphasis text={copy.message.heading} className="text-accent" />
            </h3>
            <p className={styles.asideText}>{copy.message.text}</p>
            <SocialLinks label={copy.labels.social} demoNote={copy.socialDemoNote} />
          </Reveal>

          <Reveal delay={0.03} className={styles.cardWrap}>
            {/* The id lets the floating launchers step aside over the form on phones. */}
            <div id="contact-form" className={formStyles.card}>
              <ContactForm emailEnabled={emailEnabled()} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
