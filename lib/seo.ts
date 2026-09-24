import {
  location,
  openingHours,
  restaurantData,
  restaurantDataIsDemo,
  socialLinks,
  socialLinksAreDemo,
} from "@/data/restaurant";
import { absoluteUrl } from "@/lib/utils";

/**
 * schema.org Restaurant structured data, built entirely from configuration.
 * Deliberately omits aggregateRating / review markup: only add those once real,
 * verifiable reviews exist.
 *
 * While `restaurantDataIsDemo` is true, the address, coordinates, phone,
 * email and hours are left out too: search engines must never be told that
 * demo contact details are real facts.
 */
export function buildRestaurantJsonLd() {
  const base = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: restaurantData.name,
    description: restaurantData.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    priceRange: restaurantData.priceRange,
    servesCuisine: [...restaurantData.cuisine],
    // Placeholder profile links must not be claimed as the restaurant's own.
    ...(socialLinksAreDemo ? {} : { sameAs: socialLinks.map((s) => s.url) }),
  };

  if (restaurantDataIsDemo) return base;

  return {
    ...base,
    telephone: restaurantData.phone,
    email: restaurantData.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: openingHours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.schemaDays,
        opens: h.opens,
        closes: h.closes,
      })),
  };
}
