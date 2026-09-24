import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { footerCopy as copy } from "@/data/footer";
import { restaurantData } from "@/data/restaurant";
import { FooterBrand } from "./FooterBrand";
import { FooterContact, FooterVisit } from "./FooterContact";
import { FooterHours } from "./FooterHours";
import { FooterNavigation } from "./FooterNavigation";
import { FooterSocials } from "./FooterSocials";
import styles from "./footer.module.css";

/**
 * Site footer, rendered once in app/layout.tsx after <main>.
 *
 * Server component. Source order is the phone order — brand, reservation
 * CTA, explore, visit, contact, hours, social — and grid areas rearrange it
 * on wider screens. Every fact is read from data/restaurant.ts.
 *
 * Reveal order (short delays, so it is usable at once): brand, explore,
 * visit, contact, hours, the reservation invitation, social, bottom bar.
 */
export function Footer() {
  // Rendered at build time (the page is static); a rebuild rolls the year.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.backdrop} aria-hidden="true">
        {copy.backdropWord}
      </p>

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <Reveal className={styles.areaBrand}>
            <FooterBrand />
          </Reveal>

          <Reveal delay={0.32} className={styles.areaCta}>
            <div className={styles.cta}>
              <h2 className={styles.ctaHeading}>
                <Emphasis text={copy.cta.heading} className="text-accent" />
              </h2>
              <p className={styles.ctaText}>{copy.cta.text}</p>
              <Magnetic>
                <Button href={copy.cta.href} className={styles.ctaButton}>
                  {copy.cta.button}
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.08} className={styles.areaExplore}>
            <FooterNavigation />
          </Reveal>
          <Reveal delay={0.14} className={styles.areaVisit}>
            <FooterVisit />
          </Reveal>
          <Reveal delay={0.2} className={styles.areaContact}>
            <FooterContact />
          </Reveal>
          <Reveal delay={0.26} className={styles.areaHours}>
            <FooterHours />
          </Reveal>
          <Reveal delay={0.38} className={styles.areaSocial}>
            <FooterSocials />
          </Reveal>
        </div>

        <Reveal variant="fadeIn" delay={0.2} className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} {restaurantData.name}. {copy.rights}
          </p>

          <ul role="list" className={styles.legal}>
            {copy.legal.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className={`link ${styles.legalLink}`}>
                    {item.label}
                  </a>
                ) : (
                  // Page not built yet: plain text, never a dead link.
                  <span className={styles.legalPending}>
                    {item.label}
                    <span className="visually-hidden"> (page coming soon)</span>
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* A link, not a scripted scroll: it scrolls smoothly (globals.css,
              off under reduced motion) and moves keyboard focus to the top. */}
          <a href="#home" className={styles.backToTop}>
            {copy.backToTop}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
