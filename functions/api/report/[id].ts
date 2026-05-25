/**
 * Get single report by ID
 * GET /api/report/:id
 */

interface Env {
  DB: any; // D1Database
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
    const result = await context.env.DB.prepare(
      'SELECT * FROM reports WHERE id = ?'
    ).bind(id).first();

    if (!result) {
      return Response.json({ error: 'Report not found' }, { status: 404 });
    }

    return Response.json(result, {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  } catch (err) {
    console.error('Fetch report error:', err);
    return Response.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}
