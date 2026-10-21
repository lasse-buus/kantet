import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
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
    <main>
      <PageHeader
        label="Selected work"
        meta={cases.length ? `${String(cases.length).padStart(2, '0')} ${cases.length === 1 ? 'project' : 'projects'}` : undefined}
        title="Websites and products, built with care"
        description="A selection of projects — from small sites to larger products. Each one built in close collaboration, with an eye for the details that make it feel right."
      />

      <Section label="All work">
        {cases.length === 0 ? (
          <p className="px-4 sm:px-6 py-10 text-muted">No cases yet — check back soon.</p>
        ) : (
          <ul className="cell-grid sm:grid-cols-2 lg:grid-cols-3">
            <li className="p-4 sm:p-6 sm:col-span-2">
              <ProjectCard
                href={`/cases/${first.slug.current}`}
                title={first.title}
                meta={first.tags?.join(' / ')}
                badge="Featured"
                image={first.coverImage}
                className="aspect-[9/7] sm:aspect-[16/9]"
                sizes="(max-width: 640px) 100vw, 66vw"
              />
            </li>
            {rest.map((c) => (
              <li key={c._id} className="p-4 sm:p-6">
                <ProjectCard href={`/cases/${c.slug.current}`} title={c.title} meta={c.tags?.join(' / ')} image={c.coverImage} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  )
}
