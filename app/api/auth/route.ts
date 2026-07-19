import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (username === 'admin' && password === 'admin') {
    const response = NextResponse.json({ success: true, role: 'admin' });
    response.cookies.set('auth_token', 'admin-token', { path: '/' });
    return response;
  }

  if (username === 'user' && password === 'user') {
    const response = NextResponse.json({ success: true, role: 'user' });
    response.cookies.set('auth_token', 'user-token', { path: '/' });
    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
