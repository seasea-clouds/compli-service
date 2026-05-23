/**
 * Report generation API
 *
 * Triggered after payment success via webhook or client-side callback.
 * Generates PDF, sends email, and updates D1 record.
 *
 * POST /api/report/generate
 * Body: { reportId, email?, module, inputData }
 */

interface Env {
  DB: any; // D1Database
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  CREEM_API_KEY: string;
  R2?: any; // R2Bucket
  ASSETS: any; // Fetcher
}

export async function onRequest(context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
}) {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { reportId, email, module, inputData } = await context.request.json();

    if (!reportId || !module || !inputData) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Generate report data
    const report = generateReportData(module, inputData);

    // 2. Generate PDF
    const pdfService = await import("../../src/core/pdf/generator");
    const pdfBuffer = await pdfService.generateReportPdf({
      reportId,
      module: getModuleLabel(module),
      generatedAt: new Date().toISOString().split("T")[0],
      productInfo: {
        name: inputData.productName ?? "",
        category: inputData.category ?? "",
        hsCode: inputData.hsCode,
        originCountry: inputData.originCountry ?? "",
      },
      result: report.result,
      nextSteps: report.nextSteps,
    });

    // 3. Upload PDF to R2 (if available)
    let pdfPath = "";
    if (context.env.R2) {
      const key = `reports/${reportId}.pdf`;
      await context.env.R2.put(key, pdfBuffer, {
        httpMetadata: { contentType: "application/pdf" },
      });
      pdfPath = key;
    }

    // 4. Send email (if email provided)
    if (email) {
      const emailService = await import("../../src/core/email/service");
      const reportUrl = `/compli-service/report/${reportId}`;

      await emailService.sendReportEmail({
        to: email,
        reportId,
        reportUrl,
        productName: inputData.productName ?? "your product",
        module: getModuleLabel(module),
        pdfBase64: pdfBuffer.toString("base64"),
      });
    }

    // 5. Save to D1
    if (context.env.DB) {
      await context.env.DB.prepare(
        `UPDATE reports SET 
          result_data = ?,
          pdf_path = ?,
          payment_status = 'completed'
        WHERE id = ?`
      )
        .bind(JSON.stringify(report), pdfPath, reportId)
        .run();
    }

    return Response.json({
      ok: true,
      reportId,
      pdfGenerated: true,
      emailSent: !!email,
    });
  } catch (err) {
    console.error("Report generation error:", err);
    return new Response(
      JSON.stringify({ error: "Generation failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

function generateReportData(module: string, input: Record<string, unknown>) {
  // Use GACC module logic as default
  const { checkGacc } = require("../../modules/gacc/rules");
  const { generateGaccReport } = require("../../modules/gacc/report");

  const result = checkGacc(input);
  const report = generateGaccReport({
    category: input.category,
    originCountry: input.originCountry,
    productName: input.productName,
    hsCode: input.hsCode,
  });

  return report;
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
