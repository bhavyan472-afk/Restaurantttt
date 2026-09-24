import formStyles from "@/components/Reservation/reservation.module.css";
import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { contactCopy as copy } from "@/data/contact";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import styles from "./contact.module.css";

/**
 * Contact section: heading and details on the left, the message card on the
 * right (below, on phones), then a quiet band pointing to Reservations and
 * Location. Server component; only the form is client-side.
 *
 * The form is a FRONT-END DEMO; see lib/contactService.ts.
 */
export function Contact() {
  return (
    <section id="contact" className={`section tone-alt ${styles.section}`} aria-labelledby="contact-heading">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.column}>
            <header className={styles.header}>
              <Reveal>
                <p className={`label ${styles.eyebrow}`}>{copy.eyebrow}</p>
              </Reveal>
              <Reveal variant="headingReveal" delay={0.1}>
                <h2 id="contact-heading" className={`text-section ${styles.heading}`}>
                  <Emphasis text={copy.heading} className="text-accent" />
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className={`text-body-lg ${styles.intro}`}>{copy.intro}</p>
              </Reveal>
            </header>

            <ContactInfo />
          </div>

          <Reveal delay={0.2} className={styles.cardWrap}>
            {/* The id lets the chat launcher step aside over the form on phones. */}
            <div id="contact-form" className={formStyles.card}>
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul role="list" className={styles.ctas}>
            {[copy.ctas.reserve, copy.ctas.directions].map((cta) => (
              <li key={cta.href} className={styles.cta}>
                <p className={styles.ctaLabel}>{cta.label}</p>
                <Button variant="secondary" href={cta.href}>
                  {cta.button}
                </Button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
