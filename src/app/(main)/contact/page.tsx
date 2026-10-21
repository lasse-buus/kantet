'use client'

import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'

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
    <main>
      <PageHeader
        label="Contact"
        title="Let's talk."
        description="Have a project in mind? Drop me a line and I'll get back to you within a day or two."
      />

      <Section label="Get in touch">
        <div className="grid lg:grid-cols-12">
          <aside className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-line">
            <div className="px-4 sm:px-6 py-6 border-b border-line">
              <p className="eyebrow text-muted mb-2">Prefer email?</p>
              <a href="mailto:lassebuus91@gmail.com" className="text-lg underline decoration-subtle underline-offset-4 hover:decoration-ink transition-colors">
                lassebuus91@gmail.com
              </a>
            </div>
            <div className="px-4 sm:px-6 py-6">
              <p className="eyebrow text-muted mb-2">Response time</p>
              <p className="text-lg">Within a day or two</p>
            </div>
          </aside>

          <div className="lg:col-span-7 px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
            {status === 'success' ? (
              <p className="display text-2xl sm:text-[28px] font-semibold">Message sent — I&apos;ll be in touch soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                  className="self-start inline-flex items-center h-11 px-5 bg-accent text-accent-ink font-medium hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </main>
  )
}
