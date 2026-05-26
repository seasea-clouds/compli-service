/**
 * Get single report by ID
 * GET /api/report/:id
 *
 * Returns transformed data matching ComplianceReport interface.
 */

interface Env {
  DB: any; // D1Database
}

interface DbReport {
  id: string;
  module: string;
  product_name: string;
  hs_code: string | null;
  origin_country: string;
  input_data: string | null;
  result_data: string | null;
  user_email: string | null;
  locale: string | null;
  payment_status: string;
  created_at: string;
  updated_at: string | null;
}

export async function onRequest(context: { request: Request; env: Env; params: { id: string } }) {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { id } = context.params;

  if (!id) {
    return Response.json({ error: 'Missing report ID' }, { status: 400 });
  }

  try {
    const row = await context.env.DB.prepare(
      'SELECT * FROM reports WHERE id = ?'
    ).bind(id).first() as DbReport | null;

    if (!row) {
      return Response.json({ error: 'Report not found' }, { status: 404 });
    }

    // Parse input data if available
    let productInfo = { name: '', category: '', hsCode: '', originCountry: '' };
    let inputData: Record<string, unknown> = {};
    if (row.input_data) {
      try { inputData = JSON.parse(row.input_data); } catch {}
      productInfo = {
        name: (inputData.productName as string) || row.product_name || '',
        category: (inputData.category as string) || '',
        hsCode: (inputData.hsCode as string) || row.hs_code || '',
        originCountry: (inputData.originCountry as string) || row.origin_country || '',
      };
    }

    // Parse result data if available
    let result = {
      requiresRegistration: false,
      isHighRisk: false,
      riskCategory: '',
      summary: '',
      requiredDocuments: [] as string[],
    };
    let nextSteps: string[] = [];
    if (row.result_data) {
      try {
        const parsed = JSON.parse(row.result_data);
        result = parsed.result || result;
        nextSteps = parsed.nextSteps || [];
      } catch {}
    }

    // Build ComplianceReport-compatible response
    const report = {
      id: row.id,
      module: row.module,
      productInfo,
      result,
      nextSteps,
      generatedAt: row.created_at || '',
    };

    return Response.json(report, {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  } catch (err) {
    console.error('Fetch report error:', err);
    return Response.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}
