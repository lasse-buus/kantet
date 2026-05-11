import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { casesQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Work' }
export const revalidate = 60

interface CaseItem {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  year?: number
  tags?: string[]
  excerpt?: string
  coverImage?: { asset: { url: string }; alt?: string }
}

export default async function CasesPage() {
  const cases: CaseItem[] = await client.fetch(casesQuery).catch(() => [])

  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto pb-24">
      <header className="mb-16">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Work</h1>
      </header>

      {cases.length === 0 ? (
        <p className="text-neutral-500">No cases yet — check back soon.</p>
      ) : (
        <ul className="grid gap-px bg-neutral-200 dark:bg-neutral-800">
          {cases.map((c) => (
            <li key={c._id} className="bg-white dark:bg-neutral-950">
              <Link href={`/cases/${c.slug.current}`} className="group flex flex-col sm:flex-row gap-8 p-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                {c.coverImage?.asset?.url && (
                  <div className="relative w-full sm:w-64 aspect-video shrink-0 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={c.coverImage.asset.url}
                      alt={c.coverImage.alt ?? c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  {c.tags && (
                    <ul className="flex flex-wrap gap-2 mb-3">
                      {c.tags.map((t) => (
                        <li key={t} className="text-xs text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded-full">{t}</li>
                      ))}
                    </ul>
                  )}
                  <h2 className="text-xl font-semibold mb-1">{c.title}</h2>
                  {c.client && <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">{c.client} {c.year ? `· ${c.year}` : ''}</p>}
                  {c.excerpt && <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">{c.excerpt}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
