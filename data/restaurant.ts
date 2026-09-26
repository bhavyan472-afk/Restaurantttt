/**
 * Restaurant facts and feature switches, derived from the client
 * configuration in content/restaurant.ts. Do not put client details here —
 * edit content/restaurant.ts instead.
 */

import { restaurant } from "@/content/restaurant";
import type { Address } from "@/content/types";

export type { OpeningHours, SocialLink, SocialPlatform } from "@/content/types";
export type Location = Address;

const { brand, contact } = restaurant;

/** Demo contact details and hours never reach search-engine data (lib/seo.ts). */
export const restaurantDataIsDemo = restaurant.demo;
/** Demo social links are labelled on screen and left out of `sameAs`. */
export const socialLinksAreDemo = restaurant.demo;

export const location: Location = contact.address;
export const openingHours = restaurant.hours;
export const socialLinks = restaurant.social;

export const restaurantData = {
  name: brand.name,
  tagline: brand.tagline,
  description: brand.description,
  cuisine: brand.cuisine,
  priceRange: brand.priceRange,
  phone: contact.phone,
  phoneDisplay: contact.phoneDisplay,
  email: contact.email,
  /** One line, e.g. "123 Culinary Avenue, Downtown, New York". */
  address: [location.street, location.area, location.city].filter(Boolean).join(", "),
  /**
   * Canonical production URL (metadata, Open Graph, JSON-LD, sitemap). Set
   * NEXT_PUBLIC_SITE_URL at build time — see .env.example.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com",
} as const;

export type RestaurantData = typeof restaurantData;

/* --- Feature switches ---------------------------------------------------- */

const orderUrl = restaurant.orderOnline.url.trim();

/** The "Order Online" link, or null when the feature is off or no URL is set. */
export const orderOnline =
  restaurant.features.orderOnline && orderUrl
    ? { label: restaurant.orderOnline.label, href: orderUrl }
    : null;

export const features = {
  reservations: restaurant.features.reservations,
  orderOnline: orderOnline !== null,
  aiConcierge: restaurant.features.aiConcierge,
  reviews: restaurant.features.reviews,
} as const;

export type Cta = { label: string; href: string; external?: boolean };

/**
 * The page's main call to action: book a table — or, with reservations
 * switched off, order online, or else come and visit. Every "Reserve a
 * Table" button on the site uses this, so switching features never leaves a
 * link to a missing section.
 */
export const bookingCta: Cta = features.reservations
  ? { label: "Reserve a Table", href: "#reservations" }
  : orderOnline
    ? { label: orderOnline.label, href: orderOnline.href, external: true }
    : { label: "Plan Your Visit", href: "#visit" };
