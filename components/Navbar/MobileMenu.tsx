"use client";

import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/navigation";
import { bookingCta, orderOnline, restaurantData } from "@/data/restaurant";
import { easeOut } from "@/lib/animations";
import styles from "./navbar.module.css";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  activeId: string | null;
  /** The hamburger. Stays visible above the overlay, so it joins the focus trap. */
  toggleRef: React.RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Full-screen navigation overlay.
 *
 * Opening: the backdrop fades in, then links reveal in sequence, CTA last.
 * Closing reverses it. Under prefers-reduced-motion the sequence collapses to
 * a short fade — MotionConfig (set in MotionProvider) already strips the
 * transforms, and the stagger is zeroed here so nothing arrives late.
 */
export function MobileMenu({
  id,
  open,
  onClose,
  activeId,
  toggleRef,
}: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  /** Anchor to scroll to once the overlay has finished closing. */
  const pendingHash = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  /* Body scroll lock. The gutter left by the vanishing scrollbar is added back
     as padding on <body> and, via --scrollbar-gap, on the fixed header, so
     nothing shifts sideways when the menu opens. */
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const { body } = document;
    const gap = window.innerWidth - root.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) {
      body.style.paddingRight = `${gap}px`;
      root.style.setProperty("--scrollbar-gap", `${gap}px`);
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      root.style.removeProperty("--scrollbar-gap");
    };
  }, [open]);

  /* Escape to close, and a focus trap spanning the hamburger + the overlay. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const overlay = overlayRef.current;
      if (!overlay) return;

      const inOverlay = Array.from(
        overlay.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (inOverlay.length === 0) return;

      const toggle = toggleRef.current;
      const trapped = toggle ? [toggle, ...inOverlay] : inOverlay;
      const active = document.activeElement as HTMLElement | null;
      const index = active ? trapped.indexOf(active) : -1;

      // Focus sitting on the overlay container itself: enter the list.
      if (index === -1) {
        event.preventDefault();
        (event.shiftKey
          ? inOverlay[inOverlay.length - 1]
          : inOverlay[0]
        ).focus();
        return;
      }

      const atEdge = event.shiftKey ? index === 0 : index === trapped.length - 1;
      if (atEdge) {
        event.preventDefault();
        (event.shiftKey ? trapped[trapped.length - 1] : trapped[0]).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, toggleRef]);

  /* Move focus into the dialog on open; hand it back to the hamburger on close.
     On close the overlay is still mounted (it is mid-exit), so focus is
     usually still inside it — check for that as well as a dropped focus, and
     leave it alone if the user has already moved somewhere else. */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      overlayRef.current?.focus();
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;

    const active = document.activeElement;
    const insideOverlay = !!active && !!overlayRef.current?.contains(active);
    if (!active || active === document.body || insideOverlay) {
      toggleRef.current?.focus();
    }
  }, [open, toggleRef]);

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Close first, then scroll — scrolling while the body is locked would
      // do nothing, and the overlay would cover the destination anyway.
      event.preventDefault();
      pendingHash.current = href;
      onClose();
    },
    [onClose],
  );

  const scrollToPending = useCallback(() => {
    const href = pendingHash.current;
    pendingHash.current = null;
    if (!href) return;

    const target = document.querySelector(href);
    if (!target) return; // Section arrives in a later step.

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", href);
  }, [reduceMotion]);

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.15 : 0.45,
        ease: easeOut,
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: reduceMotion ? 0.1 : 0.35,
        ease: easeOut,
        when: "afterChildren",
        staggerChildren: reduceMotion ? 0 : 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.15 : 0.5, ease: easeOut },
    },
    exit: {
      opacity: 0,
      y: 8,
      transition: { duration: reduceMotion ? 0.1 : 0.2, ease: easeOut },
    },
  };

  return (
    <AnimatePresence onExitComplete={scrollToPending}>
      {open && (
        <m.div
          id={id}
          ref={overlayRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${restaurantData.name} navigation`}
          tabIndex={-1}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.overlayInner}>
            <nav aria-label="Mobile" className={styles.overlayNav}>
              <ul role="list" className={styles.overlayList}>
                {navLinks.map((link, index) => (
                  <m.li key={link.id} variants={itemVariants}>
                    <a
                      href={link.href}
                      className={styles.overlayLink}
                      data-active={activeId === link.id}
                      aria-current={activeId === link.id ? "true" : undefined}
                      onClick={(event) => handleLinkClick(event, link.href)}
                    >
                      <span className={styles.overlayIndex} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div variants={itemVariants} className={styles.overlayFooter}>
              <div className={styles.overlayCtas}>
                <Button
                  href={bookingCta.href}
                  className={styles.overlayCta}
                  {...(bookingCta.external
                    ? {}
                    : { onClick: (event: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(event, bookingCta.href) })}
                >
                  {bookingCta.label}
                </Button>
                {orderOnline && bookingCta.href !== orderOnline.href && (
                  <Button variant="secondary" arrow={false} href={orderOnline.href} className={styles.overlayCta}>
                    {orderOnline.label}
                  </Button>
                )}
              </div>

              <button
                type="button"
                className={styles.overlayClose}
                onClick={onClose}
              >
                Close
                <span aria-hidden="true">&times;</span>
              </button>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
