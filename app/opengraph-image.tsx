import { ImageResponse } from "next/og";
import { restaurantData } from "@/data/restaurant";

export const alt = `${restaurantData.name} — ${restaurantData.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated from configuration so the share card is never missing.
 * Replace with a photographic /public/images/og-image.jpg once available.
 */
export default function OpenGraphImage() {
  // ImageResponse needs a single text node per element.
  const area = restaurantData.address.split(",").slice(-2).join(",").trim();
  const kicker = `${restaurantData.cuisine[0]} · ${area}`.toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0f0d0b",
          color: "#f3ece0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.3em",
            color: "#c96a32",
            fontFamily: "sans-serif",
          }}
        >
          {kicker}
        </div>
        <div style={{ fontSize: 128, marginTop: 28, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {restaurantData.name}
        </div>
        <div style={{ fontSize: 44, marginTop: 28, color: "#a39a8c", fontStyle: "italic" }}>
          {restaurantData.tagline}
        </div>
      </div>
    ),
    size,
  );
}
