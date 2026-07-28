/** Generates the social share preview image at build/request time instead of relying on a static file that can drift from the live design. */
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0c0e",
          color: "#f4f2ee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: 22,
              fontWeight: 700,
              color: "#8b76d9",
            }}
          >
            OS
          </div>
          <span style={{ fontSize: 22, color: "rgba(244,242,238,0.6)" }}>
            oluwasegun.dev
          </span>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          Oluwasegun Ogunbanjo
        </div>
        <div style={{ fontSize: 34, marginTop: 20, color: "rgba(244,242,238,0.72)" }}>
          Frontend Developer — React, Next.js, TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}
