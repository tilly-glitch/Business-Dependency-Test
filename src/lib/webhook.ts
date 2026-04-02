export async function submitToWebhook(
  data: Record<string, unknown>
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!url) {
    console.warn("[webhook] No NEXT_PUBLIC_WEBHOOK_URL configured");
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("[webhook] Data sent successfully");
  } catch (err) {
    console.error("[webhook] Failed to send:", err);
  }
}
