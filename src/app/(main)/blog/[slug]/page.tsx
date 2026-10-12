import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/client'
import { postBySlugQuery, postsQuery } from '@/sanity/queries'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset?.url ? (
        <figure className="my-10">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ''}
            width={value.asset.metadata?.dimensions?.width ?? 1600}
            height={value.asset.metadata?.dimensions?.height ?? 900}
            className="w-full h-auto rounded"
          />
        </figure>
      ) : null,
  },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  return {
    title: data?.title ?? 'Blog',
    description: data?.excerpt,
    openGraph: data?.coverImage?.asset?.url ? { images: [data.coverImage.asset.url] } : undefined,
  }
}

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery).catch(() => [])
  return posts.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const data = await client.fetch(postBySlugQuery, { slug }).catch(() => null)

  if (!data) notFound()

  return (
    <main className="pt-24 pb-24">
      <div className="px-6 max-w-3xl mx-auto mb-12">
        <Link href="/blog" className="text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors">← Back to blog</Link>
      </div>

      <article className="px-6 max-w-3xl mx-auto">
        <header className="mb-12">
          {data.publishedAt && (
            <time dateTime={data.publishedAt} className="block text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {formatDate(data.publishedAt)}
            </time>
          )}
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">{data.title}</h1>
          {data.excerpt && <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">{data.excerpt}</p>}
        </header>

        {data.coverImage?.asset?.url && (
          <div className="relative w-full aspect-video overflow-hidden rounded mb-12 bg-neutral-100 dark:bg-neutral-800">
            <Image src={data.coverImage.asset.url} alt={data.coverImage.alt ?? data.title} fill className="object-cover" priority />
          </div>
        )}

        {data.body && (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PortableText value={data.body} components={components} />
          </div>
        )}
      </article>
    </main>
  )
}
