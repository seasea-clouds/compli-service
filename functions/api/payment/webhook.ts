/**
 * Creem 支付 Webhook
 *
 * POST /api/payment/webhook
 * On checkout.completed: send confirmation email with report link.
 * PDF is stored in localStorage by frontend before redirect.
 */

interface Env {
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  CREEM_WEBHOOK_SECRET: string;
}

async function verifySignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const sigBytes = new Uint8Array(signature.length / 2);
    for (let i = 0; i < signature.length; i += 2) {
      sigBytes[i / 2] = parseInt(signature.substring(i, i + 2), 16);
    }
    const bodyBytes = encoder.encode(body);
    return await crypto.subtle.verify("HMAC", key, sigBytes, bodyBytes);
  } catch {
    return false;
  }
}

function getModuleLabel(module: string): string {
  const labels: Record<string, string> = {
    gacc: "GACC Food Registration",
    label: "Chinese Label Compliance",
    ccc: "CCC Certification",
    nmpa: "Cosmetics Filing (NMPA)",
    crossborder: "Cross-Border E-commerce",
    trademark: "Brand Protection",
  };
  return labels[module] ?? "Compliance Report";
}

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const bodyText = await context.request.text();
    const payload = JSON.parse(bodyText);
    const signature =
      context.request.headers.get("x-creem-signature") ?? "";

    // Verify webhook signature
    if (context.env.CREEM_WEBHOOK_SECRET && signature) {
      const isValid = await verifySignature(
        bodyText,
        signature,
        context.env.CREEM_WEBHOOK_SECRET
      );
      if (!isValid) {
        console.error("Invalid webhook signature");
        return new Response("Invalid signature", { status: 401 });
      }
    }

    const type = (payload.type ?? "") as string;
    const data = (payload.data ?? payload) as Record<string, unknown>;
    const meta = (data.metadata ?? {}) as Record<string, string>;

    console.log(`Creem webhook: ${type}`, { meta });

    if (type === "checkout.completed") {
      const reportId = meta.report_id;
      const email = meta.email ?? "";
      const module = meta.module ?? "gacc";

      if (reportId && email) {
        const reportUrl = `https://sinotradecompliance.com/compli-service/report/?id=${reportId}`;
        const productName = (meta.productName as string) ?? "your product";

        const emailHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin:0 auto; padding:20px;">
  <div style="background:#1B365D; color:#fff; padding:24px; border-radius:8px 8px 0 0; text-align:center;">
    <h1 style="margin:0; font-size:20px;">Your Compliance Report</h1>
    <p style="margin:8px 0 0; opacity:0.8;">${getModuleLabel(module)}</p>
  </div>
  <div style="background:#fff; border:1px solid #e5e7eb; padding:24px; border-radius:0 0 8px 8px;">
    <p>Hi,</p>
    <p>Your compliance report for <strong>${productName}</strong> is ready.</p>
    <p>Report ID: <strong>${reportId}</strong></p>
    <div style="text-align:center; margin:24px 0;">
      <a href="${reportUrl}" style="display:inline-block; background:#D4AF37; color:#1B365D; text-decoration:none; padding:12px 32px; border-radius:6px; font-weight:bold; font-size:14px;">View Full Report</a>
    </div>
    <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
    <p style="font-size:12px; color:#999; text-align:center;">SinoTrade Compliance<br>david@sinotradecompliance.com | sinotradecompliance.com</p>
  </div>
</body></html>`;

        const emailRes = await fetch("https://api.resend.com/email", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: context.env.EMAIL_FROM || "send@sinotradecompliance.com",
            to: email,
            subject: `Your Compliance Report — ${getModuleLabel(module)} — SinoTrade Compliance`,
            html: emailHtml,
          }),
        });

        if (emailRes.ok) {
          console.log(`Email sent to ${email} for report ${reportId}`);
        } else {
          console.error(`Email failed: ${await emailRes.text()}`);
        }
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return Response.json({ error: String(err) }, { status: 400 });
  }
}
