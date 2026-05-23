/**
 * Creem 支付 Webhook
 *
 * Handles checkout.completed and subscription.created events.
 * Triggers report generation after successful payment.
 *
 * POST /api/payment/webhook
 */

interface Env {
  DB: any; // D1Database
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  CREEM_API_KEY: string;
  CREEM_WEBHOOK_SECRET: string;
  R2?: any; // R2Bucket
  ASSETS: any; // Fetcher
}

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await context.request.json();
    const signature = context.request.headers.get("x-creem-signature") ?? "";

    // TODO: Verify Creem webhook signature
    // const isValid = verifyCreemSignature(payload, signature, env.CREEM_WEBHOOK_SECRET);
    // if (!isValid) return new Response("Invalid signature", { status: 401 });

    const event = payload as Record<string, unknown>;
    const type = event.type as string;
    const data = (event.data ?? event) as Record<string, unknown>;
    const meta = (data.metadata ?? {}) as Record<string, string>;

    console.log(`Creem webhook: ${type}`, { meta });

    switch (type) {
      case "checkout.completed": {
        const reportId = meta.report_id;
        const email = meta.email ?? "";
        const module = meta.module ?? "gacc";
        const inputData = meta.input_data ? JSON.parse(meta.input_data) : {};

        if (!reportId) {
          console.warn("Webhook missing report_id");
          return Response.json({ ok: true }); // Acknowledge but skip
        }

        // Save payment info to D1
        if (context.env.DB) {
          await context.env.DB.prepare(
            `UPDATE reports SET payment_status = 'completed' WHERE id = ?`
          ).bind(reportId).run();
        }

        // Trigger report generation (call internal or dispatch)
        // For now, log success — actual generation can happen async
        console.log(`Payment completed for report ${reportId}`);

        break;
      }

      case "subscription.created": {
        const customerEmail = (data.customer as Record<string, string>)?.email ?? "";
        const subscriptionId = data.id as string;

        console.log(`Subscription created: ${subscriptionId} for ${customerEmail}`);
        break;
      }

      case "subscription.cancelled": {
        console.log(`Subscription cancelled: ${data.id}`);
        break;
      }
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
