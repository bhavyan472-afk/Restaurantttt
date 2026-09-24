import type { MetadataRoute } from "next";
import { restaurantData } from "@/data/restaurant";

/** Name, colours and icons for "Add to Home Screen". Not an offline PWA. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: restaurantData.name,
    short_name: restaurantData.name,
    description: restaurantData.description,
    start_url: "/",
    display: "browser",
    background_color: "#0f0d0b",
    theme_color: "#0f0d0b",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
