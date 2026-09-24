/**
 * Navigation structure.
 *
 * `id` is the DOM id of the section each link scrolls to. Sections are added
 * in later steps — the navbar works whether or not a target exists yet, and
 * active-section detection observes only the ones present in the document.
 */
export type NavLink = {
  label: string;
  /** Anchor href, e.g. "#menu" */
  href: string;
  /** Section id, e.g. "menu" */
  id: string;
};

// "About" is the Story section. Reviews stays reachable from the footer.
const ids = [
  "home",
  "story",
  "menu",
  "experience",
  "gallery",
  "reservations",
  "contact",
] as const;

const labels: Record<(typeof ids)[number], string> = {
  home: "Home",
  story: "About",
  menu: "Menu",
  experience: "Experience",
  gallery: "Gallery",
  reservations: "Reservations",
  contact: "Contact",
};

export const navLinks: NavLink[] = ids.map((id) => ({
  id,
  label: labels[id],
  href: `#${id}`,
}));

/** Stable array identity — safe to pass straight into useActiveSection. */
export const navSectionIds: string[] = navLinks.map((l) => l.id);

/**
 * Footer "Explore" links. Wider than the navbar: it also reaches the
 * sections that have no navbar item (Story, Location).
 */
export const footerLinks: NavLink[] = (
  [
    ["home", "Home"],
    ["menu", "Menu"],
    ["experience", "Experience"],
    ["story", "Our Story"],
    ["gallery", "Gallery"],
    ["reviews", "Reviews"],
    ["location", "Location"],
    ["contact", "Contact"],
  ] as const
).map(([id, label]) => ({ id, label, href: `#${id}` }));
