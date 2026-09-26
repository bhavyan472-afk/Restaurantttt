import type { CSSProperties } from "react";
import { restaurant } from "@/content/restaurant";

/**
 * The client's colours (content/restaurant.ts → theme) as the CSS variables
 * globals.css is built on. Set on <html> in app/layout.tsx, so they override
 * the stylesheet's fallback values on every page, with no extra request.
 */

export const theme = restaurant.theme;

/** "#c6a462" → "198 164 98", for rgb(var(--accent-rgb) / 0.2) tints. */
function rgbTriple(hex: string): string {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const n = Number.parseInt(full, 16);
  if (!/^[0-9a-f]{6}$/i.test(full) || Number.isNaN(n)) {
    throw new Error(`Theme colour "${hex}" in content/restaurant.ts must be a hex colour like "#c6a462".`);
  }
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

export function themeStyle(): CSSProperties {
  return {
    "--background": theme.background,
    "--background-alt": theme.backgroundAlt,
    "--surface": theme.surface,
    "--foreground": theme.foreground,
    "--muted": theme.muted,
    "--accent": theme.accent,
    "--accent-hover": theme.accentHover,
    "--on-accent": theme.onAccent,
    "--bg-rgb": rgbTriple(theme.background),
    "--bg-alt-rgb": rgbTriple(theme.backgroundAlt),
    "--ivory-rgb": rgbTriple(theme.foreground),
    "--muted-rgb": rgbTriple(theme.muted),
    "--accent-rgb": rgbTriple(theme.accent),
    "--highlight-rgb": rgbTriple(theme.accentHover),
  } as CSSProperties;
}
