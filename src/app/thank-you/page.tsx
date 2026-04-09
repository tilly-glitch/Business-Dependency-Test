"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function ThankYouContent() {
  const params = useSearchParams();
  const firstName = params.get("name") || "there";
  const email = params.get("email") || "";
  const score = Number(params.get("score")) || 0;
  const monthlyCost = Number(params.get("monthlyCost")) || 0;
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Client-side CompleteRegistration pixel
    try {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      w.fbq?.("track", "CompleteRegistration", {
        content_name: "BDT Thank You",
      });
    } catch {}

    // Server-side CAPI
    try {
      const cookies = document.cookie;
      const fbp = cookies.match(/_fbp=([^;]+)/)?.[1] ?? "";
      const fbc = cookies.match(/_fbc=([^;]+)/)?.[1] ?? "";
      fetch("/api/track-thanks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          pageUrl: window.location.href,
          fbp,
          fbc,
        }),
      }).catch(() => {});
    } catch {}
  }, [firstName, email]);

  const monthlyCostFormatted = monthlyCost
    ? `$${monthlyCost.toLocaleString()}`
    : null;

  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(135deg, #11114e 0%, #1a1a70 100%)",
      }}
    >
      <section className="py-16 px-4">
        <div className="max-w-[480px] mx-auto">
          {/* Brand */}
          <p className="text-base font-bold tracking-wider text-center mb-8">
            <span className="text-white">Efficiency</span>
            <span style={{ color: "#fbb6ce" }}> Integration</span>
          </p>

          {/* Card */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div className="text-5xl text-center mb-4">📬</div>
            <h1
              className="text-2xl text-center mb-3 leading-tight"
              style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
            >
              Got it, {firstName}.
            </h1>
            <p
              className="text-base text-center mb-2 font-semibold"
              style={{ color: "#11114E" }}
            >
              Your full breakdown is on its way to your inbox.
            </p>
            <p
              className="text-sm text-center leading-relaxed mb-6"
              style={{ color: "#666" }}
            >
              Check your email in the next few minutes. It&apos;ll have your
              dependency score, your biggest gaps, and what I&apos;d fix first
              if I were you.
            </p>

            {monthlyCostFormatted && (
              <div
                className="rounded-xl p-4 mb-6"
                style={{
                  backgroundColor: "rgba(229, 62, 62, 0.06)",
                  border: "1px solid rgba(229, 62, 62, 0.2)",
                }}
              >
                <p className="text-sm text-center leading-relaxed" style={{ color: "#11114E" }}>
                  Right now you&apos;re losing{" "}
                  <strong style={{ color: "#E53E3E" }}>
                    {monthlyCostFormatted}/month
                  </strong>{" "}
                  to crashes. The sooner we plug the leak, the sooner that
                  stops.
                </p>
              </div>
            )}

            {/* What happens next */}
            <h2
              className="text-lg mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
            >
              While you wait...
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">📧</span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#11114E" }}
                  >
                    Watch for an email from me
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                    From <strong>tilly@efficiencyintegration.com</strong> — if
                    it lands in spam, drag it to your inbox so the next ones
                    don&apos;t get lost.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">💬</span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#11114E" }}
                  >
                    Hit reply and tell me what landed hardest
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                    I read every reply. No bots. Tell me which part of your
                    results made you feel something — and I&apos;ll send back
                    something specific to your situation.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">🛌</span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#11114E" }}
                  >
                    Rest. Seriously.
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                    You just took an honest look at your business on a hard
                    day. That was the brave part. The next part is mine.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Optional: book a call */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-sm text-center mb-4"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Already know you need help and want to skip the back-and-forth?
            </p>
            <a
              href="https://hello.efficiencyintegration.com/widget/booking/7DqSkUoG7rRJwARIlF6n"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)",
                color: "#11114e",
                minHeight: 44,
                boxShadow: "0 0 20px rgba(246,135,179,0.3)",
              }}
            >
              Book a free 30-min call →
            </a>
          </div>

          <p className="text-center text-xs text-white/50 pb-4">
            efficiencyintegration.io
          </p>
        </div>
      </section>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
