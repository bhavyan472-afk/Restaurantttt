/**
 * Experience section, from content/restaurant.ts → experience. Edit it there.
 */

import { restaurant } from "@/content/restaurant";
import type { ExperienceContent as ExperienceConfig, ExperienceIcon } from "@/content/types";
import { bookingCta } from "./restaurant";

export type { ExperienceIcon };
export type ExperiencePillar = ExperienceConfig["pillars"][number];
export type ExperienceContent = ExperienceConfig & { cta: { label: string; href: string } };

export const experience: ExperienceContent = {
  ...restaurant.experience,
  cta: bookingCta,
};
