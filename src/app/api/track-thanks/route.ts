import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const email = String(body.email ?? "");
  const firstName = String(body.firstName ?? "");

  sendCAPIEvent({
    eventName: "CompleteRegistration",
    email,
    firstName,
    sourceUrl:
      String(body.pageUrl) ||
      "https://business-dependency-test.vercel.app/thank-you",
    eventId: `bdt_thanks_${email}_${Date.now()}`,
    ipAddress: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbp: String(body.fbp ?? ""),
    fbc: String(body.fbc ?? ""),
    customData: {
      currency: "USD",
      content_name: "BDT Thank You",
    },
  }).catch(() => {});

  console.log("[track-thanks] BDT CompleteRegistration CAPI fired for", email);
  return NextResponse.json({ success: true });
}
