import Image from 'next/image'
import Link from 'next/link'

interface Props {
  href: string
  title: string
  meta?: string
  badge?: string
  image?: { asset?: { url: string }; alt?: string }
  /** Kept for compatibility — text always sits below the image now */
  variant?: 'overlay' | 'stacked'
  className?: string
  sizes?: string
}

export default function ProjectCard({ href, title, meta, badge, image, className = 'aspect-[4/3]', sizes = '(max-width: 640px) 100vw, 33vw' }: Props) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative">
        <div className={`relative overflow-hidden bg-surface ${className}`}>
          {image?.asset?.url && (
            <Image
              src={image.asset.url}
              alt={image.alt ?? title}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}
          {badge && (
            <span className="absolute top-0 left-0 bg-accent text-accent-ink text-xs font-medium px-2.5 py-1.5">{badge}</span>
          )}
        </div>
        {/* Crop marks appear on hover */}
        <span aria-hidden className="crop absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
      </div>
      <div className="flex items-start justify-between gap-6 pt-4">
        <div>
          <h3 className="text-lg font-medium leading-snug tracking-[-0.01em]">{title}</h3>
          {meta && <p className="text-sm text-muted mt-1">{meta}</p>}
        </div>
        <span
          aria-hidden
          className="flex-none grid place-items-center size-8 border border-line text-ink transition-colors group-hover:bg-accent group-hover:border-accent group-hover:text-accent-ink"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
            <path d="M4 12L12 4M6 4h6v6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
