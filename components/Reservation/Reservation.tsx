import { existsSync } from "node:fs";
import path from "node:path";
import { VoiceAssistant } from "@/components/CallAssistant/VoiceAssistant";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { reservationCopy as copy } from "@/data/reservations";
import { features, openingHours } from "@/data/restaurant";
import { emailEnabled } from "@/lib/mail";
import { ReservationForm } from "./ReservationForm";
import { ReservationImage } from "./ReservationImage";
import styles from "./reservation.module.css";

/**
 * Reservation section.
 *
 * Server component: the heading, hours and image are static; only the form
 * card is client-side. Hours come from `openingHours` in data/restaurant.ts —
 * the same source as the SEO structured data — so there is one place to
 * change them.
 *
 * Requests are emailed to the restaurant when email is configured (see
 * app/actions/reservation.ts); otherwise the form runs as a labelled demo.
 * Not rendered when reservations are switched off in content/restaurant.ts.
 */
export function Reservation() {
  if (!features.reservations) return null;

  const image = existsSync(path.join(process.cwd(), "public", copy.image.src))
    ? copy.image.src
    : null;

  return (
    <section
      id="reservations"
      className={`section tone-base ${styles.section}`}
      aria-labelledby="reservations-heading"
    >
      <div className="container">
        {/* Source order is the phone order: heading, form, details. From
            1024px the details move under the heading, beside the form. */}
        <div className={styles.layout}>
          <header className={styles.intro}>
            <Reveal>
              <p className={`label ${styles.eyebrow}`}>{copy.eyebrow}</p>
            </Reveal>
            <Reveal variant="headingReveal" delay={0.05}>
              <h2 id="reservations-heading" className={`text-section ${styles.heading}`}>
                <Emphasis text={copy.heading} className="text-accent" />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={`text-body-lg ${styles.introText}`}>{copy.intro}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className={styles.aside}>{copy.aside}</p>
            </Reveal>
          </header>

          <Reveal delay={0.1} className={styles.cardWrap}>
            <div className={styles.card}>
              <ReservationForm emailEnabled={emailEnabled()} />
            </div>
          </Reveal>

          <div className={styles.details}>
            <Reveal delay={0.05} className={styles.info}>
              <div className={styles.infoBlock}>
                <h3 className={`label ${styles.infoLabel}`}>{copy.hoursLabel}</h3>
                <dl className={styles.hours}>
                  {openingHours.map((entry) => (
                    <div key={entry.days} className={styles.hoursRow}>
                      <dt>{entry.days}</dt>
                      <dd>{entry.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={`label ${styles.infoLabel}`}>{copy.noteLabel}</h3>
                <p className={styles.note}>{copy.note}</p>
              </div>

              {/* "Need help?" — opens the voice assistant. */}
              {features.aiConcierge && <VoiceAssistant />}
            </Reveal>

            <Reveal variant="imageReveal" delay={0.1} className={styles.imageReveal}>
              <ReservationImage src={image} alt={copy.image.alt} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
