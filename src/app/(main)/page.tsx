import Link from 'next/link'
import { client } from '@/sanity/client'
import { servicesQuery } from '@/sanity/queries'

interface Service {
  _id: string
  title: string
  description: string
}

export const revalidate = 60

export default async function HomePage() {
  const services: Service[] = await client.fetch(servicesQuery).catch(() => [])

  return (
    <main>
      {/* Hero */}
      <section className="min-h-svh flex flex-col justify-end px-6 pb-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-8">
            Design &amp; development<br />that moves people.
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg sm:text-xl max-w-xl mb-10">
            Kantet is an independent agency building web experiences that combine sharp design with solid engineering.
          </p>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            See the work
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="px-6 py-24 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-16">Services</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800">
            {services.map((s) => (
              <li key={s._id} className="bg-white dark:bg-neutral-950 p-8">
                <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-24 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-sm">
          Got a project in mind?
        </h2>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-full text-sm hover:border-neutral-950 dark:hover:border-white transition-colors"
        >
          Get in touch
          <span aria-hidden>→</span>
        </Link>
      </section>
    </main>
  )
}
