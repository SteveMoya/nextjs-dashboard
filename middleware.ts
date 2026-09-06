import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authConfig } from './auth.config';

const auth = NextAuth(authConfig).auth;
const handleAuth = auth as unknown as (
  request: NextRequest,
) => NextResponse | Response | void | Promise<NextResponse | Response | void>;

export default function middleware(request: NextRequest) {
  // Defensa: NextAuth v5 (beta) crashea en el middleware de producción si no
  // existe AUTH_SECRET (TypeError / MIDDLEWARE_INVOCATION_FAILED en Vercel).
  // Mientras la variable no esté definida, servimos la página normalmente
  // (la protección de rutas se desactiva); al definir AUTH_SECRET, la auth y
  // la protección vuelven a activarse.
  if (!process.env.AUTH_SECRET) {
    return NextResponse.next();
  }
  return handleAuth(request);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};