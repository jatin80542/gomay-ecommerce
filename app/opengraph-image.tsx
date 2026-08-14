import { ImageResponse } from "next/og";
import { brandConfig } from "@/config/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${brandConfig.name} — ${brandConfig.descriptor}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6EFE3",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#301F14",
              color: "#F6EFE3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            G
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#301F14", letterSpacing: -0.5 }}>
            {brandConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, fontWeight: 800, color: "#301F14", lineHeight: 1.05, letterSpacing: -2 }}>
            Pure Gomay.
          </div>
          <div style={{ fontSize: 82, fontWeight: 800, color: "#B4552B", lineHeight: 1.05, letterSpacing: -2 }}>
            Rooted in Bharat.
          </div>
          <div style={{ fontSize: 30, color: "#6B4B33", marginTop: 26 }}>
            {brandConfig.descriptor}
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#6B4B33" }}>
          <div style={{ display: "flex" }}>Retail packs</div>
          <div style={{ display: "flex" }}>Corporate gifting</div>
          <div style={{ display: "flex" }}>Wholesale supply</div>
        </div>
      </div>
    ),
    size,
  );
}
