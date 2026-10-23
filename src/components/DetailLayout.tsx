import Image from 'next/image'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import Gallery, { type GalleryImage } from './Gallery'
import PageHeader from './PageHeader'
import ProjectCard from './ProjectCard'
import Section from './Section'
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
  gallery?: GalleryImage[]
  more: { title: string; href: string; linkLabel: string; items: DetailMoreItem[]; variant?: 'overlay' | 'stacked' }
}

export default function DetailLayout({ back, eyebrow, title, excerpt, coverImage, meta, body, gallery, more }: Props) {
  const label = back.href === '/cases' ? 'Case' : 'Article'

  return (
    <main>
      <PageHeader label={label} meta={eyebrow} title={title} back={back} />

      {coverImage?.asset?.url && (
        <section className="rule">
          <div className="frame p-4 sm:p-10">
            <div className="crop">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-surface">
              <Image src={coverImage.asset.url} alt={coverImage.alt ?? title} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" loading="eager" fetchPriority="high" />
            </div>
            </div>
          </div>
        </section>
      )}

      <section className="rule">
        <div className="frame grid lg:grid-cols-12">
          {/* Facts, as rows of cells */}
          <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-line">
            <dl className="lg:sticky lg:top-24 grid grid-cols-2 lg:grid-cols-1">
              {meta.map((m) => (
                <div key={m.label} className="px-4 sm:px-6 py-5 border-b border-line odd:border-r lg:odd:border-r-0">
                  <dt className="eyebrow text-muted mb-1.5">{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="lg:col-span-8 px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
            {excerpt && (
              <div className="mb-12">
                <p className="eyebrow text-muted mb-4">Summary</p>
                <p className="display text-2xl sm:text-[28px] font-semibold">{excerpt}</p>
              </div>
            )}
            {body && (
              <div className="prose prose-lg max-w-2xl">
                <PortableText value={body} components={portableTextComponents} />
              </div>
            )}
          </div>
        </div>
      </section>

      {gallery?.length ? (
        <Section label="Gallery">
          <Gallery images={gallery} title={title} />
        </Section>
      ) : null}

      {more.items.length > 0 && (
        <Section label={more.title} action={{ href: more.href, label: more.linkLabel }}>
          <ul className="cell-grid sm:grid-cols-2 lg:grid-cols-3">
            {more.items.map((item) => (
              <li key={item._id} className="p-4 sm:p-6">
                <ProjectCard href={item.href} title={item.title} meta={item.meta} image={item.image} variant={more.variant} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  )
}
