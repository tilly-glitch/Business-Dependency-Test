import { createHash } from "crypto";

const PIXEL_ID = "3853078938328170";
const CAPI_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface CAPIEventParams {
  eventName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  sourceUrl?: string;
  eventId?: string;
  customData?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
}

export async function sendCAPIEvent(params: CAPIEventParams): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.log("[capi] META_CAPI_TOKEN not set, skipping server event");
    return;
  }

  const userData: Record<string, unknown> = {};
  if (params.email) userData.em = [sha256(params.email)];
  if (params.firstName) userData.fn = [sha256(params.firstName)];
  if (params.lastName) userData.ln = [sha256(params.lastName)];
  if (params.ipAddress) userData.client_ip_address = params.ipAddress;
  if (params.userAgent) userData.client_user_agent = params.userAgent;
  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;

  const eventData: Record<string, unknown> = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };

  if (params.sourceUrl) eventData.event_source_url = params.sourceUrl;
  if (params.eventId) eventData.event_id = params.eventId;
  if (params.customData) eventData.custom_data = params.customData;

  try {
    const res = await fetch(CAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [eventData],
        access_token: token,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      console.log(`[capi] ${params.eventName} sent successfully`);
    } else {
      const err = await res.text();
      console.warn(`[capi] ${params.eventName} failed:`, res.status, err);
    }
  } catch (err) {
    console.error(`[capi] ${params.eventName} error:`, err);
  }
}
