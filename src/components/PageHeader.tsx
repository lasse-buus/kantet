import Link from 'next/link'

interface Props {
  label: string
  title: React.ReactNode
  meta?: string
  description?: string
  back?: { href: string; label: string }
  children?: React.ReactNode
}

/** Top block for inner pages: blueprint grid, mono label, large title. */
export default function PageHeader({ label, title, meta, description, back, children }: Props) {
  return (
    <section className="relative overflow-hidden rule">
      <div className="relative frame">
        <div aria-hidden className="absolute inset-0 blueprint" />
        <div className="relative px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="eyebrow text-ink">[ {label} ]</span>
            {meta && <span className="eyebrow text-muted">{meta}</span>}
          </div>
          <h1 className="display text-4xl sm:text-6xl font-semibold mt-5 max-w-4xl">{title}</h1>
          {description && <p className="text-muted text-lg leading-relaxed max-w-xl mt-5">{description}</p>}
          {back && (
            <Link href={back.href} className="inline-block eyebrow text-ink hover:text-brand-fg transition-colors mt-8">
              ← {back.label}
            </Link>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
