import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const password = data.get('password')

  if (password === process.env.SITE_PASSWORD) {
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('site-auth', process.env.SITE_PASSWORD!, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  }

  const response = NextResponse.redirect(new URL('/gate?error=1', request.url))
  return response
}
