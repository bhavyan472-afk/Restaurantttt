import { restaurantData } from "@/data/restaurant";

/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Absolute URL for a site path, based on the configured siteUrl. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, restaurantData.siteUrl).toString();
}

/** Deliberately permissive: something@domain.tld. The real check is delivery. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** `tel:` href that strips formatting characters. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
