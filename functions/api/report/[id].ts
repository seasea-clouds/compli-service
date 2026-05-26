/**
 * Get single report by ID
 * GET /api/report/:id
 *
 * Note: Report data is stored in localStorage by the frontend
 * before redirecting to Creem. This API is a backup/fallback
 * and will work once D1 binding is configured.
 */

export async function onRequest(context: { request: Request; env: any; params: { id: string } }) {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { id } = context.params;

  if (!id) {
    return Response.json({ error: 'Missing report ID' }, { status: 400 });
  }

  // If D1 is available, try to fetch from DB
  if (context.env?.DB) {
    try {
      const row = await context.env.DB.prepare('SELECT * FROM reports WHERE id = ?').bind(id).first();
      if (row) {
        // Parse and transform
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
        return Response.json({
          id: row.id,
          module: row.module,
          productInfo,
          result: { requiresRegistration: false, isHighRisk: false, riskCategory: '', summary: '', requiredDocuments: [] },
          nextSteps: [],
          generatedAt: row.created_at || '',
        });
      }
    } catch {}
  }

  return Response.json({ error: 'Report not found' }, { status: 404 });
}
