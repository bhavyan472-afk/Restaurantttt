import type { MetadataRoute } from "next";
import { theme } from "@/lib/theme";
import { restaurantData } from "@/data/restaurant";

/** Name, colours and icons for "Add to Home Screen". Not an offline PWA. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: restaurantData.name,
    short_name: restaurantData.name,
    description: restaurantData.description,
    start_url: "/",
    display: "browser",
    background_color: theme.background,
    theme_color: theme.background,
    icons: [
      { src: "/icon", type: "image/png", sizes: "64x64" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
