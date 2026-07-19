import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isProductsApi = request.nextUrl.pathname.startsWith('/api/products');

  // Protect /admin routes
  if (isAdminPath && token !== 'admin-token') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect modifying methods on /api/products
  if (isProductsApi && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
    if (token !== 'admin-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*'],
};
