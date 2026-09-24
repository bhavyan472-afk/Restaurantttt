/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Single source of truth for everything client-specific. UI components read
 *  from here and never hard-code restaurant details, so this file (plus
 *  data/menu.ts and data/reviews.ts) is all that changes per client.
 */

export type OpeningHours = {
  /** Display label, e.g. "Monday – Thursday" */
  days: string;
  /** Display hours, e.g. "5:00 PM – 10:00 PM". Use "Closed" for closed days. */
  hours: string;
  /** schema.org day names — used for structured data. */
  schemaDays: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  /** 24h "HH:MM". Omit both for closed days. */
  opens?: string;
  closes?: string;
};

export type SocialPlatform = "instagram" | "facebook" | "x" | "tiktok" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type Location = {
  street: string;
  /** Optional neighbourhood line, e.g. "Downtown". */
  area?: string;
  city: string;
  region: string;
  postalCode: string;
  /** ISO 3166 code, e.g. "US" — shown as the country's name. */
  country: string;
  /** Decimal degrees */
  latitude: number;
  longitude: number;
  /** Full maps link / embed source, filled in per client. */
  mapUrl: string;
  /**
   * A map embed URL (e.g. Google Maps "Share → Embed a map" src). When set,
   * the Location section shows the live map; otherwise an illustrated map.
   * Only set it for the client's REAL address.
   */
  mapEmbedUrl?: string;
  /**
   * Getting-there details. Shown only when provided — never invent parking,
   * transit or accessibility facts.
   */
  transport?: string;
  parking?: string;
  accessibility?: string;
};

/**
 * True while the address, phone, email and hours are demo values. Keeps them
 * out of search-engine structured data (lib/seo.ts) and labels the map as
 * illustrative. Set to false once real client information is in.
 */
export const restaurantDataIsDemo = true;

export const restaurantData = {
  // DEMO DATA — REPLACE WITH CLIENT INFORMATION
  name: "EMBER & SAGE",
  tagline: "Where Fire Meets Flavor.",
  /** Search/social description (meta, Open Graph, JSON-LD) — not shown on the page. */
  description:
    "Discover EMBER & SAGE, an intimate dining experience shaped by open fire, seasonal ingredients, thoughtful craft, and warm hospitality.",
  cuisine: ["Wood-fired", "Contemporary American", "Seasonal"],
  priceRange: "$$$",

  // DEMO DATA — REPLACE WITH CLIENT INFORMATION
  /** E.164, for tel: links and structured data. 555-01xx is reserved for fiction. */
  phone: "+12125550142",
  /** How the number is written on the page. */
  phoneDisplay: "+1 (212) 555-0142",
  email: "hello@example.com",
  address: "123 Culinary Avenue, Downtown, New York",

  /**
   * Canonical production URL for metadataBase, canonical, Open Graph, JSON-LD,
   * sitemap and robots. Set NEXT_PUBLIC_SITE_URL at build time (see
   * .env.example); the fallback is the reserved example.com placeholder.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com",

  // Reservation link / provider — wired up in a later step.
  reservationUrl: "#reservations",
} as const;

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const location: Location = {
  street: "123 Culinary Avenue",
  area: "Downtown",
  city: "New York",
  region: "NY",
  postalCode: "10001",
  country: "US",
  latitude: 40.7484,
  longitude: -73.9857,
  mapUrl: "https://maps.google.com/?q=123+Culinary+Avenue+New+York",
};

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const openingHours: OpeningHours[] = [
  {
    days: "Monday – Thursday",
    hours: "5:00 PM – 10:00 PM",
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "17:00",
    closes: "22:00",
  },
  {
    days: "Friday – Saturday",
    hours: "5:00 PM – 11:30 PM",
    schemaDays: ["Friday", "Saturday"],
    opens: "17:00",
    closes: "23:30",
  },
  {
    days: "Sunday",
    hours: "4:00 PM – 9:00 PM",
    schemaDays: ["Sunday"],
    opens: "16:00",
    closes: "21:00",
  },
];

/**
 * True while the social links below are placeholders (each platform's home
 * page, never someone else's account). Keeps them out of the structured
 * data's `sameAs` and marks them as demo links on the page. Set to false
 * once the URLs point at the restaurant's own profiles.
 */
export const socialLinksAreDemo = true;

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const socialLinks: SocialLink[] = [
  { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
  { platform: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
  { platform: "tiktok", label: "TikTok", url: "https://www.tiktok.com/" },
];

export type RestaurantData = typeof restaurantData;
