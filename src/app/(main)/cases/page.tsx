import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
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
  const [first, ...rest] = cases

  return (
    <main className="px-4 sm:px-6 pt-20 sm:pt-24">
      <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li className="rounded-[8px] bg-surface p-4 sm:p-5 flex flex-col justify-between gap-16 min-h-[22rem]">
          <p className="eyebrow text-[10px] text-brand-fg">Selected work</p>
          <header>
            <h1 className="display text-2xl sm:text-[28px] font-medium mb-4">Websites and products, built with care</h1>
            <p className="text-sm leading-relaxed max-w-md">
              A selection of projects — from small sites to larger products. Each one built in close collaboration, with an eye for the details that make it feel right.
            </p>
          </header>
        </li>

        {cases.length === 0 ? (
          <li className="lg:col-span-2 rounded-[8px] bg-surface p-5 text-muted">No cases yet — check back soon.</li>
        ) : (
          <>
            <li className="lg:col-span-2">
              <ProjectCard href={`/cases/${first.slug.current}`} title={first.title} meta={first.tags?.join(' / ')} badge="Featured" image={first.coverImage} className="aspect-[9/7] lg:aspect-auto lg:h-full lg:min-h-[22rem]" sizes="(max-width: 1024px) 100vw, 66vw" />
            </li>
            {rest.map((c) => (
              <li key={c._id}>
                <ProjectCard href={`/cases/${c.slug.current}`} title={c.title} meta={c.tags?.join(' / ')} image={c.coverImage} />
              </li>
            ))}
          </>
        )}
      </ul>
    </main>
  )
}
