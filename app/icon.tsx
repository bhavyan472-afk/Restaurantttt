import { ImageResponse } from "next/og";
import { theme } from "@/lib/theme";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser-tab icon: the flame mark in the client's theme colours. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.background,
          borderRadius: 12,
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64">
          <path
            d="M32 12c2 8 12 12 12 24a12 12 0 0 1-24 0c0-6 3-9 5-12 1 4 3 5 4 5-1-6-1-11 3-17z"
            fill={theme.accent}
          />
        </svg>
      </div>
    ),
    size,
  );
}
