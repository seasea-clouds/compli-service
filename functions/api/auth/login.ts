/**
 * Login API
 * POST /api/auth/login
 * Body: { email, password, rememberMe? }
 */

import { verifyPassword } from './password';
import { signToken } from './jwt';

interface Env {
  DB: any;
  JWT_SECRET: string;
}

export async function onRequest(context: { request: Request; env: Env }) {
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email, password, rememberMe } = await context.request.json();
    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Find user
    const user = await context.env.DB.prepare(
      'SELECT id, email, name, password_hash FROM users WHERE email = ?'
    ).bind(email).first() as any;

    if (!user || !user.password_hash) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate token
    const expiresIn = rememberMe ? '30d' : '24h';
    const token = await signToken({ userId: user.id, email: user.email }, context.env, expiresIn);

    return Response.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
      expiresIn,
    });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Login failed' }, { status: 500 });
  }
}
