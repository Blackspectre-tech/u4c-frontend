import { ImageResponse } from "next/og";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

// Route segment config
export const runtime = "edge";
export const alt = "United4Change — Transparent Blockchain Donations for Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamically generated 1200x630 Open Graph image. Replaces the previous
 * `.svg` reference, which social platforms and Google do NOT render.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1120 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            lineHeight: 1.35,
            color: "#cbd5e1",
            maxWidth: 900,
          }}
        >
          {DEFAULT_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
