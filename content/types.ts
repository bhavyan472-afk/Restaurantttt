/**
 * Shapes of the client configuration (content/restaurant.ts). You should not
 * need to edit this file when making a new client version — only the values
 * in content/restaurant.ts.
 */

/* --- Brand & theme -------------------------------------------------------- */

/** Hex colours ("#rrggbb"). Applied as CSS variables on every page. */
export type ThemeColors = {
  /** Page background — the darkest shade. */
  background: string;
  /** Warmer lift used by alternating sections. */
  backgroundAlt: string;
  /** Cards and raised panels. */
  surface: string;
  /** Main text. */
  foreground: string;
  /** Secondary text. */
  muted: string;
  /** Accent: buttons, borders, icons, highlights. */
  accent: string;
  /** Lighter accent for hovers and focus rings. */
  accentHover: string;
  /** Text on accent-filled buttons. */
  onAccent: string;
};

/* --- Contact, hours, social ---------------------------------------------- */

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningHours = {
  /** Display label, e.g. "Monday – Thursday". */
  days: string;
  /** Display hours, e.g. "5:00 PM – 10:00 PM". Use "Closed" for closed days. */
  hours: string;
  /** The days this row covers — used by search engines and the booking form. */
  schemaDays: Weekday[];
  /** 24h "HH:MM". Omit both for closed days. */
  opens?: string;
  closes?: string;
};

export type Address = {
  street: string;
  /** Optional neighbourhood line, e.g. "Downtown". */
  area?: string;
  city: string;
  region: string;
  postalCode: string;
  /** ISO 3166 code, e.g. "US" — shown as the country's name. */
  country: string;
  /** Decimal degrees — optional, used for search-engine data only. */
  latitude?: number;
  longitude?: number;
  /** Getting-there notes. Shown only when set — never invent these. */
  transport?: string;
  parking?: string;
  accessibility?: string;
};

export type SocialPlatform = "instagram" | "facebook" | "x" | "tiktok" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

/* --- Feature switches ----------------------------------------------------- */

export type Features = {
  /** Reservations section, "Reserve a Table" buttons and booking emails. */
  reservations: boolean;
  /** "Order Online" button — shown only when `orderOnline.url` is also set. */
  orderOnline: boolean;
  /** AI Concierge chat and the voice assistant. */
  aiConcierge: boolean;
  /** Reviews section — also hidden automatically when there are no reviews. */
  reviews: boolean;
};

/* --- Media ---------------------------------------------------------------- */

export type Picture = {
  /** Path under /public, e.g. "/images/<client>/dishes/ribeye.jpg". */
  src: string;
  /** Describes the photo for screen readers. */
  alt: string;
};

/* --- Menu ----------------------------------------------------------------- */

export type DietaryTag = "vegetarian" | "vegan" | "gluten-free" | "spicy";

export type MenuCategory = {
  /** Short, unique, lower-case id, e.g. "starters". */
  id: string;
  label: string;
};

export type MenuItem = {
  /** Unique, lower-case, hyphenated, e.g. "truffle-burrata". */
  id: string;
  name: string;
  description: string;
  /** Written as displayed, so any currency works: "$18", "£12.50", "18 €". */
  price: string;
  /** A category `id` from `menu.categories`. */
  category: string;
  dietary?: DietaryTag[];
  /** Shows the "Chef's Favourite" mark and the favourites filter. */
  popular?: boolean;
  /** Shows the dish's photo in the menu list. Needs `image`. */
  featured?: boolean;
  /** Path under /public. Used by featured rows and signature dishes. */
  image?: string;
  /** Muted loop under /public, shown in a featured row instead of `image`. */
  video?: string;
  alt?: string;
};

export type SignatureDish = {
  /** The dish's `id` in the menu — name, price and category come from there. */
  id: string;
  /** Small line above the name, e.g. "Chef's Signature". */
  label: string;
  /** Longer, more evocative than the menu line. */
  description: string;
  /** Portrait photograph (4:5 crop). Falls back to the menu photo. */
  image?: string;
  /** Optional muted loop played over the photograph, path under /public. */
  video?: string;
  alt?: string;
};

/* --- Sections ------------------------------------------------------------- */

/** Heading copy for a section. Wrap a word in *asterisks* for the accent italic. */
export type SectionCopy = {
  eyebrow: string;
  heading: string;
  intro: string;
};

export type StoryContent = SectionCopy & {
  /** Opening line, set large. */
  lead: string;
  paragraphs: string[];
  /** Short sign-off lines. */
  closing: string[];
  images: {
    /** Large portrait, 4:5. */
    main: Picture;
    /** Small square detail overlapping the main image. Optional. */
    detail?: Picture;
  };
  caption: string;
  principles: { title: string; text: string }[];
};

export type ExperienceIcon = "flame" | "leaf" | "users" | "heart";

export type ExperienceContent = SectionCopy & {
  paragraphs: string[];
  closing: string[];
  visual: {
    /** Landscape, ~21:9 — tablet and up. */
    wide: string;
    /** Portrait, 4:5 — phones. */
    portrait: string;
    alt: string;
    video?: string;
  };
  /** Short descriptive labels beneath the main visual. */
  details: string[];
  aside?: Picture;
  pillars: { keyword: string; title: string; description: string; icon: ExperienceIcon }[];
};

export type GalleryTile = Picture & {
  /** Short label over the tile, e.g. the dish name. */
  caption: string;
  /** Mosaic shape on laptops: "large" 2×2, "wide" 2×1, "tall" 1×2, else 1×1. */
  size?: "large" | "wide" | "tall";
  /** Optional short muted loop played over the photo. */
  video?: string;
  /** The clip has a watermark in its bottom-right corner; crop it away. */
  cropMark?: boolean;
};

export type ReviewSource = "Guest" | "Direct" | "Google" | "Tripadvisor" | "Yelp" | "OpenTable";

export type Review = {
  id: string;
  author: string;
  /** 1–5, halves allowed. */
  rating: number;
  quote: string;
  /** Name a platform ONLY for a real review that can be verified there. */
  source: ReviewSource;
  /** ISO date, e.g. "2026-09-12". */
  date?: string;
  occasion?: string;
  /** The one review shown large. Defaults to the first. */
  featured?: boolean;
  /**
   * Template sample. Sample reviews are shown ONLY while `demo` is true, so
   * placeholder reviews can never reach a live client site.
   */
  sample?: boolean;
};

export type ReservationSettings = {
  /**
   * Where booking requests are emailed (needs RESEND_API_KEY in .env).
   * Leave empty to keep the demo form.
   */
  notifyEmail: string;
  minGuests: number;
  maxGuests: number;
  defaultGuests: number;
  /** Length of a seating; a slot is offered only if it ends by closing. */
  durationMinutes: number;
  /** How far ahead of now a same-day booking must be. */
  minLeadMinutes: number;
  /** How far ahead bookings open. */
  maxAdvanceDays: number;
  /** Seating times, "h:mm AM/PM". */
  timeSlots: string[];
  /** Specific closed dates, "YYYY-MM-DD". */
  closedDates: string[];
  /** Prefix for booking references, e.g. "ES" → "ES-2026-4821". */
  referencePrefix: string;
};

export type RestaurantConfig = {
  /**
   * True while any content is template sample data. Keeps demo facts out of
   * search-engine data and labels demo parts on screen. Set false for a
   * real client.
   */
  demo: boolean;
  brand: {
    name: string;
    tagline: string;
    /** Search/social description — not shown on the page. */
    description: string;
    cuisine: string[];
    priceRange: string;
    /** Large faint word behind the footer. */
    backdropWord: string;
    /** One sentence under the logo in the footer. */
    statement: string;
  };
  theme: ThemeColors;
  contact: {
    /** E.164, e.g. "+12125550142" — for tel: links. */
    phone: string;
    /** How the number is written on the page. */
    phoneDisplay: string;
    email: string;
    address: Address;
  };
  hours: OpeningHours[];
  social: SocialLink[];
  features: Features;
  orderOnline: {
    /** Slice, Toast, DoorDash, Uber Eats… Leave empty to hide the button. */
    url: string;
    label: string;
  };
  reservations: ReservationSettings & {
    copy: SectionCopy & { aside: string; image: Picture };
  };
  hero: {
    label: string;
    /** One entry per line; `accent` sets that line in the accent italic. */
    headingLines: { text: string; accent: boolean }[];
    supporting: string;
    /** Shown instantly, and on its own when no video is available. */
    image: Picture;
    /**
     * Optional background video, in preference order (WebM, then MP4).
     * Missing files are skipped; with none, the image carries the hero.
     */
    video: { desktop: string[]; mobile: string[] };
  };
  signature: SectionCopy & { dishes: SignatureDish[] };
  story: StoryContent;
  menu: SectionCopy & {
    categories: MenuCategory[];
    items: MenuItem[];
  };
  experience: ExperienceContent;
  gallery: SectionCopy & { tiles: GalleryTile[] };
  reviews: SectionCopy & {
    items: Review[];
    /** From a real platform, e.g. { average: 4.8, count: 312, label: "Google rating" }. Omit to average the reviews above. */
    rating?: { average: number; count: number; label: string };
  };
  visit: SectionCopy;
};
