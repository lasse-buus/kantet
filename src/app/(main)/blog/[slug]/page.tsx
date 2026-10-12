import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from '@portabletext/react'
import DetailLayout, { type DetailMeta } from '@/components/DetailLayout'
import { client } from '@/sanity/client'
import { morePostsQuery, postBySlugQuery, postsQuery } from '@/sanity/queries'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

interface MorePost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  tags?: string[]
  coverImage?: { asset: { url: string }; alt?: string }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const readingTime = (body: PortableTextBlock[] = []) => {
  const words = body
    .flatMap((block) => (Array.isArray(block.children) ? block.children : []))
    .map((child) => (typeof child.text === 'string' ? child.text : ''))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

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
  const [data, more] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }).catch(() => null),
    client.fetch<MorePost[]>(morePostsQuery, { slug }).catch(() => []),
  ])

  if (!data) notFound()

  const meta: DetailMeta[] = [
    ...(data.publishedAt ? [{ label: 'Published', value: <time dateTime={data.publishedAt}>{formatDate(data.publishedAt)}</time> }] : []),
    { label: 'Reading time', value: `${readingTime(data.body)} min` },
    ...(data.tags?.length ? [{ label: 'Topics', value: <ul>{data.tags.map((t: string) => <li key={t} className="capitalize">{t}</li>)}</ul> }] : []),
  ]

  return (
    <DetailLayout
      back={{ href: '/blog', label: 'All posts' }}
      title={data.title}
      excerpt={data.excerpt}
      coverImage={data.coverImage}
      meta={meta}
      body={data.body}
      more={{
        title: 'More posts',
        href: '/blog',
        linkLabel: 'All posts',
        variant: 'stacked',
        items: more.map((p) => ({
          _id: p._id,
          href: `/blog/${p.slug.current}`,
          title: p.title,
          meta: p.publishedAt ? formatShortDate(p.publishedAt) : undefined,
          image: p.coverImage,
        })),
      }}
    />
  )
}
