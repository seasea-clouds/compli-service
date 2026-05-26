/**
 * Creem Checkout API
 *
 * Creates a checkout session and returns the payment URL.
 * Frontend calls this when user clicks "Get Report — $1"
 *
 * POST /api/checkout
 * Body: { productId, reportId, email?, locale?, metadata }
 */

interface Env {
  CREEM_API_KEY: string;
  CREEM_PRODUCT_ID_SINGLE: string;
  CREEM_PRODUCT_ID_SUBSCRIBE: string;
  DB: any;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}) {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { productId, reportId, email, locale, metadata } = await context.request.json();

    if (!reportId) {
      return Response.json({ error: "Missing reportId" }, { status: 400 });
    }

    const pid = productId ?? context.env.CREEM_PRODUCT_ID_SINGLE;

    // ── Insert report record immediately ───────────────────────────
    if (context.env.DB) {
      const module = (metadata?.module as string) ?? "gacc";
      const now = new Date().toISOString();
      await context.env.DB.prepare(`
        INSERT OR IGNORE INTO reports (id, module, product_name, hs_code, origin_country, input_data, user_email, locale, payment_status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
      `).bind(
        reportId,
        module,
        metadata?.productName ?? null,
        metadata?.hsCode ?? null,
        metadata?.originCountry ?? null,
        metadata ? JSON.stringify(metadata) : null,
        email ?? null,
        locale ?? 'en',
        now
      ).run();
    }

    // ── Build Creem checkout session ──────────────────────────────
    const body: Record<string, unknown> = {
      product_id: pid,
      success_url: `https://sinotradecompliance.com/${locale ?? 'en'}/compli-service/report/?id=${reportId}`,
      metadata: {
        report_id: reportId,
        ...(email && { email }),
        ...(metadata ?? {}),
      },
    };

    const res = await fetch("https://test-api.creem.io/v1/checkouts", {
      method: "POST",
      headers: {
        "x-api-key": context.env.CREEM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Creem checkout failed:", err);
      return Response.json({ error: "Checkout creation failed" }, { status: 502 });
    }

    const data = await res.json();

    // Update payment_id on the report record
    if (context.env.DB) {
      await context.env.DB.prepare(
        `UPDATE reports SET payment_id = ? WHERE id = ?`
      ).bind(data.id, reportId).run();
    }

    return Response.json({
      checkoutUrl: data.checkout_url,
      sessionId: data.id,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
