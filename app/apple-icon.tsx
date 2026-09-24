import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon for iOS, which does not accept SVG. Same flame mark as
 * app/icon.svg, drawn full-bleed: iOS applies its own rounded mask.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0d0b",
        }}
      >
        <svg width="132" height="132" viewBox="8 8 48 48">
          <path
            d="M32 12c2 8 12 12 12 24a12 12 0 0 1-24 0c0-6 3-9 5-12 1 4 3 5 4 5-1-6-1-11 3-17z"
            fill="#c96a32"
          />
        </svg>
      </div>
    ),
    size,
  );
}
