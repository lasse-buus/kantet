import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { caseBySlugQuery, casesQuery } from '@/sanity/queries'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

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
  const data = await client.fetch(caseBySlugQuery, { slug }).catch(() => null)

  if (!data) notFound()

  return (
    <main className="pt-24 pb-24">
      <div className="px-6 max-w-7xl mx-auto mb-12">
        <Link href="/cases" className="text-sm text-neutral-500 hover:text-white transition-colors">← Back to work</Link>
      </div>

      {data.coverImage?.asset?.url && (
        <div className="relative w-full aspect-video max-h-[70vh] overflow-hidden mb-16">
          <Image src={data.coverImage.asset.url} alt={data.coverImage.alt ?? data.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="px-6 max-w-4xl mx-auto">
        <header className="mb-16">
          {data.tags && (
            <ul className="flex flex-wrap gap-2 mb-4">
              {data.tags.map((t: string) => (
                <li key={t} className="text-xs text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded-full">{t}</li>
              ))}
            </ul>
          )}
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-4">{data.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
            {data.client && <span>{data.client}</span>}
            {data.year && <span>{data.year}</span>}
            {data.url && (
              <a href={data.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Visit site →
              </a>
            )}
          </div>
        </header>

        {data.body && (
          <div className="prose prose-invert prose-neutral max-w-none">
            <PortableText value={data.body} components={components} />
          </div>
        )}
      </div>
    </main>
  )
}
