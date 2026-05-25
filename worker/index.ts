/**
 * Proxy Worker: sinotradecompliance.com/compli-service/* → compli-service.pages.dev
 *
 * Routes traffic from the main site's sub-path to the standalone Pages project.
 * Also proxies _next/static assets used by the compli-service app.
 */

const TARGET = 'https://compli-service.pages.dev';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const search = url.search;

    // Determine the target path
    let targetPath: string;

    if (path.startsWith('/compli-service/')) {
      // Remove /compli-service prefix, keep the rest
      targetPath = path.replace(/^\/compli-service/, '') || '/';
    } else if (path.startsWith('/_next/') || path === '/favicon.ico') {
      // Static assets: proxy as-is
      targetPath = path;
    } else {
      return new Response('Not found', { status: 404 });
    }

    // Build target URL
    const targetUrl = `${TARGET}${targetPath}${search}`;

    // Fetch with headers preserved
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'follow',
    });

    return response;
  },
};
