/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Wording for the footer only. The FACTS — name, tagline, address, phone,
 *  email, hours and social links — come from data/restaurant.ts; the Explore
 *  links from `footerLinks` in data/navigation.ts.
 */

export const footerCopy = {
  statement:
    "An intimate dining experience shaped by fire, craft, seasonal ingredients, and thoughtful hospitality.",

  /** Large, low-contrast word behind the footer. Decorative only. */
  backdropWord: "EMBER",

  cta: {
    heading: "Ready for an evening to *remember?*",
    text: "Join us at the table.",
    button: "Reserve a Table",
    href: "#reservations",
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
