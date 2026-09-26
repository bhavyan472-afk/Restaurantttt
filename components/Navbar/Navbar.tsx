"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { UserIcon } from "@/components/Login/LoginIcons";
import { LoginModal } from "@/components/Login/LoginModal";
import { Button } from "@/components/ui/Button";
import { navLinks, navSectionIds } from "@/data/navigation";
import { bookingCta, orderOnline, restaurantData } from "@/data/restaurant";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import styles from "./navbar.module.css";

/**
 * Fixed navigation. Transparent over the hero, then fading into a blurred
 * dark bar once the page scrolls.
 *
 * The scrolled state comes from an IntersectionObserver watching a sentinel
 * pinned to the top of the document, rather than a scroll listener — the
 * callback fires twice per crossing instead of on every frame.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const menuId = useId();
  const activeId = useActiveSection(navSectionIds);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  /* The bar stays above the mobile overlay, so Login can be pressed with the
     menu open: close the menu, then open the modal. */
  const openLogin = useCallback(() => {
    setMenuOpen(false);
    setLoginOpen(true);
  }, []);

  return (
    <>
      {/* Pinned to the document top (no positioned ancestor), so it scrolls
          out of view and flips the navbar's state. */}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      <header className={styles.header} data-scrolled={scrolled}>
        <div className={cn("container", styles.inner)}>
          <Link href="/" className={styles.logo}>
            {restaurantData.name}
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ul role="list" className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    data-active={activeId === link.id}
                    aria-current={activeId === link.id ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            {/* Optional: only when an order-online URL is configured. */}
            {orderOnline && bookingCta.href !== orderOnline.href && (
              <div className={styles.orderWrap}>
                <Button variant="secondary" arrow={false} href={orderOnline.href} className={styles.cta}>
                  {orderOnline.label}
                </Button>
              </div>
            )}

            {/* The one main button. */}
            <div className={styles.ctaWrap}>
              <Button href={bookingCta.href} className={styles.cta}>
                {bookingCta.label}
              </Button>
            </div>

            <Button
              variant="secondary"
              arrow={false}
              className={styles.login}
              onClick={openLogin}
              aria-haspopup="dialog"
            >
              <UserIcon size={16} className={styles.loginIcon} />
              Login
            </Button>

            <button
              ref={toggleRef}
              type="button"
              className={styles.burger}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              // The overlay unmounts when closed; never reference a missing id.
              aria-controls={menuOpen ? menuId : undefined}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              data-open={menuOpen}
            >
              <span className={styles.burgerBox} aria-hidden="true">
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id={menuId}
        open={menuOpen}
        onClose={closeMenu}
        activeId={activeId}
        toggleRef={toggleRef}
      />

      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  );
}
