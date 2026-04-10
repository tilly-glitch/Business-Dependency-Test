import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background:
            "linear-gradient(135deg, #11114e 0%, #1a1a70 100%)",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            background:
              "conic-gradient(#f687b3 0% 72%, rgba(255,255,255,0.18) 72% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "#11114e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
            }}
          >
            BD
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
