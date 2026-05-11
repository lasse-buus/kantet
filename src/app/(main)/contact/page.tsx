import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto pb-24">
      <div className="max-w-2xl">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-6">Let&apos;s talk.</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
            Have a project in mind? Drop me a line and I&apos;ll get back to you within a day or two.
          </p>
        </header>

        <form action="/api/contact" method="POST" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-neutral-500 dark:text-neutral-400">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-neutral-500 dark:text-neutral-400">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm text-neutral-500 dark:text-neutral-400">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none"
              placeholder="Tell me about your project…"
            />
          </div>

          <button
            type="submit"
            className="self-start bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Send message
          </button>
        </form>

        <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Prefer email?</p>
          <a href="mailto:lassebuus91@gmail.com" className="text-white hover:opacity-60 transition-opacity">
            lassebuus91@gmail.com
          </a>
        </div>
      </div>
    </main>
  )
}
