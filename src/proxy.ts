import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE, isAuthenticated, isLocked } from '@/lib/siteAuth'

export function proxy(request: NextRequest) {
  if (!isLocked()) return NextResponse.next()

  // Skip the studio (behind Sanity login) and the gate itself
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/studio') || pathname === '/gate') {
    return NextResponse.next()
  }

  if (isAuthenticated(request.cookies.get(AUTH_COOKIE)?.value)) {
    return NextResponse.next()
  }

  // Everything else is gated, whatever the Accept header says
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const url = request.nextUrl.clone()
  url.pathname = '/gate'
  url.search = ''
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
