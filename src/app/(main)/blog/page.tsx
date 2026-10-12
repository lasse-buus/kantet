import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
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
    <main className="px-4 sm:px-6 pt-20 sm:pt-24">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        <header className="border-y border-line py-5 flex flex-col justify-between gap-16 min-h-[18rem]">
          <h1 className="display text-2xl sm:text-[28px] font-medium max-w-sm">Notes, stories and thoughts from the studio</h1>
          <p className="text-sm leading-relaxed max-w-sm">
            Thoughts on design, development and running a small studio — plus the occasional story about how I got here.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="lg:col-span-2 text-muted">No posts yet — check back soon.</p>
        ) : (
          <>
            <div className="lg:col-span-2">
              <ProjectCard href={`/blog/${first.slug.current}`} title={first.title} meta={postMeta(first)} badge="Latest" image={first.coverImage} className="aspect-[9/7] lg:aspect-auto lg:h-full lg:min-h-[18rem]" sizes="(max-width: 1024px) 100vw, 66vw" />
            </div>
            <ul className="lg:col-span-3 grid gap-x-4 sm:gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 pt-4">
              {rest.map((p) => (
                <li key={p._id}>
                  <ProjectCard href={`/blog/${p.slug.current}`} title={p.title} meta={postMeta(p)} image={p.coverImage} variant="stacked" className="aspect-[3/2]" />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  )
}
