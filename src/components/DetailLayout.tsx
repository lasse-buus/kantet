import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import ProjectCard from './ProjectCard'
import { portableTextComponents } from './portableText'

type SanityImage = { asset?: { url: string }; alt?: string }

export interface DetailMeta {
  label: string
  value: React.ReactNode
}

export interface DetailMoreItem {
  _id: string
  href: string
  title: string
  meta?: string
  image?: SanityImage
}

interface Props {
  back: { href: string; label: string }
  eyebrow?: string
  title: string
  excerpt?: string
  coverImage?: SanityImage
  meta: DetailMeta[]
  body?: PortableTextBlock[]
  more: { title: string; href: string; linkLabel: string; items: DetailMoreItem[]; variant?: 'overlay' | 'stacked' }
}

export default function DetailLayout({ back, eyebrow, title, excerpt, coverImage, meta, body, more }: Props) {
  return (
    <main className="px-4 sm:px-6 pt-28 sm:pt-32">
      <article className="mx-auto max-w-7xl">
        <header className="text-center flex flex-col items-center">
          <Link href={back.href} className="eyebrow text-[10px] text-muted hover:text-ink transition-colors mb-5">← {back.label}</Link>
          <h1 className="display text-3xl sm:text-5xl font-medium max-w-3xl">{title}</h1>
          {eyebrow && <p className="eyebrow text-[10px] text-muted mt-5">{eyebrow}</p>}
        </header>

        {coverImage?.asset?.url && (
          <div className="relative mt-12 sm:mt-16 aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-[8px] bg-surface">
            <Image src={coverImage.asset.url} alt={coverImage.alt ?? title} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" priority />
          </div>
        )}

        <div className="mt-12 sm:mt-16 grid gap-12 lg:grid-cols-12 border-t border-line pt-8">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <dl className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow text-muted mb-1.5">{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="lg:col-span-8">
            {excerpt && (
              <section className="mb-12">
                <h2 className="eyebrow text-muted mb-4">Summary</h2>
                <p className="display text-2xl sm:text-[28px] font-medium">{excerpt}</p>
              </section>
            )}
            {body && (
              <div className="prose prose-lg max-w-2xl">
                <PortableText value={body} components={portableTextComponents} />
              </div>
            )}
          </div>
        </div>
      </article>

      {more.items.length > 0 && (
        <section className="mx-auto max-w-7xl pt-32">
          <div className="flex items-center justify-between gap-6 border-t border-line pt-4 mb-4">
            <h2 className="eyebrow text-[10px]">{more.title}</h2>
            <Link href={more.href} className="pill">{more.linkLabel}</Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.items.map((item) => (
              <li key={item._id}>
                <ProjectCard href={item.href} title={item.title} meta={item.meta} image={item.image} variant={more.variant} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
