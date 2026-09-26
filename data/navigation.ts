/**
 * The page's sections, in page order, and the links built from them.
 *
 * `pageSections` mirrors app/page.tsx. The navbar shows the sections that
 * have a `nav` label; the active-link tracker watches every section, so a
 * link only lights up while ITS section is on screen (never a stale one).
 * Sections switched off in content/restaurant.ts drop out everywhere.
 */

import { features } from "./restaurant";
import { showReviews } from "./reviews";

export type NavLink = {
  label: string;
  /** Anchor href, e.g. "#menu" */
  href: string;
  /** Section id, e.g. "menu" */
  id: string;
};

type PageSection = {
  id: string;
  /** Label in the navbar; omit to leave the section out of the navbar. */
  nav?: string;
  /** Label in the footer's Explore list. */
  footer: string;
  enabled: boolean;
};

export const pageSections: PageSection[] = [
  { id: "home", footer: "Home", enabled: true },
  { id: "signature-dishes", footer: "Signature Dishes", enabled: true },
  { id: "story", nav: "Our Story", footer: "Our Story", enabled: true },
  { id: "menu", nav: "Menu", footer: "Menu", enabled: true },
  { id: "experience", nav: "Experience", footer: "Experience", enabled: true },
  { id: "gallery", nav: "Gallery", footer: "Gallery", enabled: true },
  { id: "reviews", nav: "Reviews", footer: "Reviews", enabled: showReviews },
  { id: "reservations", footer: "Reservations", enabled: features.reservations },
  { id: "visit", nav: "Visit Us", footer: "Visit Us", enabled: true },
].filter((section) => section.enabled);

export const navLinks: NavLink[] = pageSections
  .filter((section) => section.nav)
  .map(({ id, nav }) => ({ id, label: nav!, href: `#${id}` }));

/** Every section on the page, in order — for active-section tracking. */
export const navSectionIds: string[] = pageSections.map((section) => section.id);

export const footerLinks: NavLink[] = pageSections.map(({ id, footer }) => ({
  id,
  label: footer,
  href: `#${id}`,
}));
