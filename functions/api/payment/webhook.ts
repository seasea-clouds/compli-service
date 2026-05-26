/**
 * Creem 支付 Webhook
 *
 * Handles checkout.completed events.
 * Confirms payment in D1. Report data was already stored by checkout.
 *
 * POST /api/payment/webhook
 */

interface Env {
  DB: any; // D1Database
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  CREEM_WEBHOOK_SECRET: string;
}

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await context.request.json();
    const type = (payload.type ?? "") as string;
    const data = (payload.data ?? payload) as Record<string, unknown>;
    const meta = (data.metadata ?? {}) as Record<string, string>;

    console.log(`Creem webhook: ${type}`, { meta });

    switch (type) {
      case "checkout.completed": {
        const reportId = meta.report_id;
        if (!reportId) {
          console.warn("Webhook missing report_id");
          return Response.json({ ok: true });
        }

        if (context.env.DB) {
          const now = new Date().toISOString();
          await context.env.DB.prepare(`
            UPDATE reports SET
              payment_status = 'completed',
              updated_at = ?
            WHERE id = ?
          `).bind(now, reportId).run();
          console.log(`Payment confirmed for report ${reportId}`);
        }
        break;
      }

      case "subscription.created":
      case "subscription.cancelled":
        console.log(`Subscription ${type}: ${data.id}`);
        break;
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
