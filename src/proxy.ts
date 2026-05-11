import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD

export function proxy(request: NextRequest) {
  // Skip the studio and the auth endpoint itself
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/studio') || pathname === '/api/auth') {
    return NextResponse.next()
  }

  // No password set → site is public
  if (!PASSWORD) return NextResponse.next()

  const cookie = request.cookies.get('site-auth')
  if (cookie?.value === PASSWORD) return NextResponse.next()

  // Show the gate for HTML requests; let assets through
  const acceptsHtml = request.headers.get('accept')?.includes('text/html')
  if (!acceptsHtml) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/gate'
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
