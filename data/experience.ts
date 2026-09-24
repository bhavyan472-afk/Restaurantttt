/**
 * ============================================================================
 *  DEMO CONTENT — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Copy and imagery for the Dining Experience section. Illustrative writing
 *  for the website concept, not a description of a real restaurant. Do not
 *  add figures (seats, years, awards) unless the client supplies them.
 *
 *  Emphasis: wrap a word in *asterisks* for the display italic (ember in the
 *  heading, cream elsewhere).
 *
 *  Images: any path under /public — currently the client's uploaded
 *  photography and clips (see `photo` / `clip` in data/menu.ts). Any file not
 *  supplied shows a designed placeholder — see public/images/experience/.
 */

import { photo } from "./menu";

export type ExperienceIcon = "flame" | "leaf" | "users" | "heart";

export type ExperiencePillar = {
  /** Short keyword above the title, e.g. "Fire". */
  keyword: string;
  title: string;
  description: string;
  icon: ExperienceIcon;
};

export type ExperienceContent = {
  eyebrow: string;
  heading: string;
  /** One-line introduction beneath the heading. */
  intro: string;
  paragraphs: string[];
  /** Short closing lines, set in the display italic. */
  closing: string[];
  /** The main atmosphere visual, art-directed per viewport. */
  visual: {
    /** Landscape, ~21:9 — tablet and up. */
    wide: string;
    /** Portrait, 4:5 — phones. Its own photograph, not a crop of `wide`. */
    portrait: string;
    alt: string;
    /** Optional muted loop over the wide photograph, tablet and up. */
    video?: string;
  };
  /** Descriptive labels beneath the main visual. No invented numbers. */
  details: string[];
  /** Portrait beside the pillars on laptops and up. Optional. */
  aside?: { src: string; alt: string };
  pillars: ExperiencePillar[];
  cta: { label: string; href: string };
};

// DEMO CONTENT — REPLACE WITH CLIENT INFORMATION
export const experience: ExperienceContent = {
  eyebrow: "The Experience",
  heading: "More than a *meal.*",
  intro:
    "An intimate setting where fire, flavor, music, and conversation come together around the table.",
  paragraphs: [
    "At EMBER & SAGE, dinner unfolds slowly.",
    "The glow of the open kitchen, the sound of the fire, the aroma of ingredients over flame, and the rhythm of conversation become part of the meal.",
  ],
  closing: ["Come for the food.", "Stay for the atmosphere."],
  visual: {
    wide: photo.oldFashioned,
    portrait: photo.oldFashioned,
    alt: "An old fashioned with a flamed orange twist and a wisp of smoke, candles and decanters glowing across the bar.",
  },
  details: ["Open fire", "Seasonal menu", "Intimate tables", "Evening dining"],
  aside: {
    src: photo.lambChops,
    alt: "Grilled lamb chops standing over roasted vegetables, a glass of red wine and candlelight behind.",
  },
  pillars: [
    {
      keyword: "Fire",
      title: "Open-Fire Cooking",
      description:
        "Watch ingredients transform over flame as our kitchen brings smoke, char, and depth to every plate.",
      icon: "flame",
    },
    {
      keyword: "Seasonal",
      title: "Seasonal Ingredients",
      description:
        "Our menu evolves with the ingredients, allowing each season to shape the experience.",
      icon: "leaf",
    },
    {
      keyword: "Intimate",
      title: "Intimate Dining",
      description:
        "Warm lighting, thoughtful details, and a setting designed for lingering conversations.",
      icon: "users",
    },
    {
      keyword: "Hospitality",
      title: "Effortless Hospitality",
      description:
        "From the first welcome to the final course, every detail is designed to make you feel at home.",
      icon: "heart",
    },
  ],
  cta: { label: "Reserve Your Table", href: "#reservations" },
};
