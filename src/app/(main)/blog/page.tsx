import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import { client } from '@/sanity/client'
import { postsQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Blog' }
export const revalidate = 60

interface PostItem {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  excerpt?: string
  tags?: string[]
  coverImage?: { asset: { url: string }; alt?: string }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const postMeta = (p: PostItem) => [p.publishedAt && formatDate(p.publishedAt), ...(p.tags ?? []).slice(0, 2)].filter(Boolean).join(' / ')

export default async function BlogPage() {
  const posts: PostItem[] = await client.fetch(postsQuery).catch(() => [])
  const [first, ...rest] = posts

  return (
    <main>
      <PageHeader
        label="Blog"
        meta={posts.length ? `${String(posts.length).padStart(2, '0')} ${posts.length === 1 ? 'post' : 'posts'}` : undefined}
        title="Notes, stories and thoughts from the studio"
        description="Thoughts on design, development and running a small studio — plus the occasional story about how I got here."
      />

      <Section label="All posts">
        {posts.length === 0 ? (
          <p className="px-4 sm:px-6 py-10 text-muted">No posts yet — check back soon.</p>
        ) : (
          <ul className="cell-grid sm:grid-cols-2 lg:grid-cols-3">
            <li className="p-4 sm:p-6 sm:col-span-2">
              <ProjectCard
                href={`/blog/${first.slug.current}`}
                title={first.title}
                meta={postMeta(first)}
                badge="Latest"
                image={first.coverImage}
                className="aspect-[9/7] sm:aspect-[16/9]"
                sizes="(max-width: 640px) 100vw, 66vw"
              />
            </li>
            {rest.map((p) => (
              <li key={p._id} className="p-4 sm:p-6">
                <ProjectCard href={`/blog/${p.slug.current}`} title={p.title} meta={postMeta(p)} image={p.coverImage} variant="stacked" className="aspect-[3/2]" />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  )
}
