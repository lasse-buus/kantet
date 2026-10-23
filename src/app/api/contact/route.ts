import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { clientIp, rateLimit } from '@/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : ''
}

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never see this field, bots tend to fill it in
  if (body.company) return NextResponse.json({ success: true })

  // Strip line breaks from fields that end up in the subject or headers
  const name = field(body.name, 100).replace(/[\r\n]+/g, ' ')
  const email = field(body.email, 200)
  const message = field(body.message, 5000)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: 'lassebuus91@gmail.com',
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
