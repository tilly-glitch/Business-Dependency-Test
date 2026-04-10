import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Business Dependency Test";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #11114e 0%, #1a1a70 100%)",
          padding: "70px 80px",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 22,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: 4,
              color: "#fbb6ce",
              display: "flex",
            }}
          >
            EFFICIENCY INTEGRATION
          </div>

          {/* Headline */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#ffffff",
                display: "flex",
              }}
            >
              The Business
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#ffffff",
                display: "flex",
              }}
            >
              Dependency Test
            </div>
            <div
              style={{
                marginTop: 18,
                width: 84,
                height: 6,
                background:
                  "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)",
                borderRadius: 3,
                display: "flex",
              }}
            />
            <div
              style={{
                marginTop: 26,
                fontSize: 34,
                fontStyle: "italic",
                color: "#fbb6ce",
                lineHeight: 1.25,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>How dependent is your business</span>
              <span>on your good days?</span>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 22,
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "rgba(255,255,255,0.75)",
                display: "flex",
              }}
            >
              A 90-second diagnostic for women with autoimmune conditions.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 22px",
                borderRadius: 22,
                background: "rgba(251,182,206,0.12)",
                border: "1px solid rgba(251,182,206,0.35)",
                alignSelf: "flex-start",
                fontSize: 18,
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#fbb6ce",
              }}
            >
              dependency.efficiencyintegration.com
            </div>
          </div>
        </div>

        {/* Right column: score circle */}
        <div
          style={{
            width: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "conic-gradient(#f687b3 0% 72%, rgba(255,255,255,0.10) 72% 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 262,
                height: 262,
                borderRadius: "50%",
                background: "#11114e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                72%
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  letterSpacing: 3,
                  color: "#fbb6ce",
                  display: "flex",
                }}
              >
                DEPENDENT
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
