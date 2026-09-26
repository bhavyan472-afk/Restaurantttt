import { location, restaurantData, type Location } from "@/data/restaurant";

/**
 * Everything the page says about where the restaurant is, derived from the
 * ONE address in content/restaurant.ts — so the address, the map label
 * and the directions link can never drift apart.
 */

/** "US" → "United States". Falls back to the code itself. */
export function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** The address as it is written on an envelope, one line each. */
export function addressLines(loc: Location = location): string[] {
  return [
    loc.street,
    loc.area ?? "",
    `${loc.city}, ${loc.region} ${loc.postalCode}`.replace(/,\s*$/, ""),
    countryName(loc.country),
  ].filter(Boolean);
}

/** One line, for map queries and accessible labels. */
export function fullAddress(loc: Location = location): string {
  return [loc.street, loc.city, loc.region, loc.postalCode, countryName(loc.country)]
    .filter(Boolean)
    .join(", ");
}

/**
 * Google Maps "directions to" link — the public Maps URLs format, which needs
 * no API key. Built from the name and address, so it follows the data.
 */
export function directionsUrl(loc: Location = location): string {
  const destination = `${restaurantData.name}, ${fullAddress(loc)}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

/**
 * Google Maps embed for the Visit section, built from the name and address
 * in content/restaurant.ts. The public embed URL needs no API key.
 */
export function mapEmbedUrl(loc: Location = location): string {
  const query = `${restaurantData.name}, ${fullAddress(loc)}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}
