'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass = "bg-transparent border-b border-line px-0 py-3 text-lg outline-none placeholder:text-subtle focus:border-ink transition-colors"

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <main className="px-4 sm:px-6 pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <p className="eyebrow text-muted mb-6">Contact</p>
          <h1 className="display text-5xl sm:text-7xl font-medium mb-6">Let&apos;s talk.</h1>
          <p className="text-muted text-lg leading-relaxed max-w-md">
            Have a project in mind? Drop me a line and I&apos;ll get back to you within a day or two.
          </p>
        </header>

        {status === 'success' ? (
          <p className="lg:col-span-7 display text-2xl sm:text-[28px] font-medium">
            Message sent — I&apos;ll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="eyebrow text-muted">Name</label>
              <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="eyebrow text-muted">Email</label>
              <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="eyebrow text-muted">Message</label>
              <textarea id="message" name="message" required rows={6} className={`${inputClass} resize-none`} placeholder="Tell me about your project…" />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">Something went wrong — please try again or email directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="self-start inline-flex items-center gap-3 bg-ink text-paper rounded-[4px] py-1.5 pl-1.5 pr-4 text-sm hover:opacity-85 transition-opacity disabled:opacity-50"
            >
              <span aria-hidden className="grid place-items-center size-6 rounded-[2px] bg-accent text-accent-ink">→</span>
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}

        <div className="lg:col-start-6 lg:col-span-7 pt-8 border-t border-line">
          <p className="eyebrow text-muted mb-2">Prefer email?</p>
          <a href="mailto:lassebuus91@gmail.com" className="text-lg underline decoration-subtle underline-offset-4 hover:decoration-ink transition-colors">
            lassebuus91@gmail.com
          </a>
        </div>
      </div>
    </main>
  )
}
