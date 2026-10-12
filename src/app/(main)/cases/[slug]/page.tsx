import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DetailLayout, { type DetailMeta } from '@/components/DetailLayout'
import { client } from '@/sanity/client'
import { caseBySlugQuery, casesQuery, moreCasesQuery } from '@/sanity/queries'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

interface MoreCase {
  _id: string
  title: string
  slug: { current: string }
  tags?: string[]
  coverImage?: { asset: { url: string }; alt?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch(caseBySlugQuery, { slug }).catch(() => null)
  return {
    title: data?.title ?? 'Case',
    description: data?.excerpt,
    openGraph: data?.coverImage?.asset?.url ? { images: [data.coverImage.asset.url] } : undefined,
  }
}

export async function generateStaticParams() {
  const cases = await client.fetch(casesQuery).catch(() => [])
  return cases.map((c: { slug: { current: string } }) => ({ slug: c.slug.current }))
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const [data, more] = await Promise.all([
    client.fetch(caseBySlugQuery, { slug }).catch(() => null),
    client.fetch<MoreCase[]>(moreCasesQuery, { slug }).catch(() => []),
  ])

  if (!data) notFound()

  const meta: DetailMeta[] = [
    ...(data.client ? [{ label: 'Client', value: data.client }] : []),
    ...(data.year ? [{ label: 'Year', value: data.year }] : []),
    ...(data.tags?.length ? [{ label: 'Services', value: <ul>{data.tags.map((t: string) => <li key={t}>{t}</li>)}</ul> }] : []),
    ...(data.url
      ? [{
          label: 'Link',
          value: (
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="underline decoration-subtle underline-offset-4 hover:decoration-ink">
              Visit site ↗
            </a>
          ),
        }]
      : []),
  ]

  return (
    <DetailLayout
      back={{ href: '/cases', label: 'All work' }}
      eyebrow={data.tags?.join(' / ')}
      title={data.title}
      excerpt={data.excerpt}
      coverImage={data.coverImage}
      meta={meta}
      body={data.body}
      more={{
        title: 'More work',
        href: '/cases',
        linkLabel: 'All work',
        items: more.map((c) => ({
          _id: c._id,
          href: `/cases/${c.slug.current}`,
          title: c.title,
          meta: c.tags?.join(' / '),
          image: c.coverImage,
        })),
      }}
    />
  )
}
