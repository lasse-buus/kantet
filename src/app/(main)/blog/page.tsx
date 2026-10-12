import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function BlogPage() {
  const posts: PostItem[] = await client.fetch(postsQuery).catch(() => [])

  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto pb-24">
      <header className="mb-16">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Blog</h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet — check back soon.</p>
      ) : (
        <ul className="grid gap-px bg-neutral-200 dark:bg-neutral-800">
          {posts.map((p) => (
            <li key={p._id} className="bg-white dark:bg-neutral-950">
              <Link href={`/blog/${p.slug.current}`} className="group flex flex-col sm:flex-row gap-8 p-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                {p.coverImage?.asset?.url && (
                  <div className="relative w-full sm:w-64 aspect-video shrink-0 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={p.coverImage.asset.url}
                      alt={p.coverImage.alt ?? p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  {p.publishedAt && (
                    <time dateTime={p.publishedAt} className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                      {formatDate(p.publishedAt)}
                    </time>
                  )}
                  <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
                  {p.excerpt && <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">{p.excerpt}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
