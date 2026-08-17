import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori's default font has no Japanese glyphs and embedding a CJK subset
// is out of scope for now, so this OG image uses the Latin product name
// rather than risk rendering blank boxes for 日本語. The page itself stays
// Japanese-only per requirements.md.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: i % 2 === 0 ? 90 : 50,
                borderRadius: 6,
                background: "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 68, fontWeight: 700 }}>DNA Complement Tool</div>
        <div style={{ fontSize: 30, marginTop: 20, color: "rgba(255,255,255,0.85)" }}>
          Reverse complement · mRNA · restriction sites
        </div>
      </div>
    ),
    { ...size }
  );
}
