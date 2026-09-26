/**
 * Footer wording. The statement and backdrop word come from
 * content/restaurant.ts → brand; the facts (address, phone, email, hours,
 * social links) from the same file via data/restaurant.ts; the Explore links
 * from `footerLinks` in data/navigation.ts.
 */

import { restaurant } from "@/content/restaurant";
import { bookingCta } from "./restaurant";

export const footerCopy = {
  statement: restaurant.brand.statement,

  /** Large, low-contrast word behind the footer. Decorative only. */
  backdropWord: restaurant.brand.backdropWord,

  cta: {
    heading: "Ready for an evening to *remember?*",
    text: "Join us at the table.",
    button: bookingCta.label,
    href: bookingCta.href,
  },

  labels: {
    explore: "Explore",
    visit: "Visit",
    contact: "Contact",
    hours: "Opening Hours",
    social: "Follow Along",
  },

  directions: "Get Directions",
  socialDemoNote: "Demo links — not the restaurant's own accounts.",

  rights: "All rights reserved.",
  backToTop: "Back to top",

  /**
   * Legal pages. Leave `href` undefined until the page exists: the item is
   * then shown as plain text and announced as "coming soon", never as a
   * dead link. Add e.g. href: "/privacy" once the page is built.
   */
  legal: [
    { label: "Privacy", href: undefined as string | undefined },
    { label: "Terms", href: undefined as string | undefined },
  ],
};
