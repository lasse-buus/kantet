import Image from 'next/image'
import Link from 'next/link'

interface Props {
  href: string
  title: string
  meta?: string
  badge?: string
  image?: { asset?: { url: string }; alt?: string }
  /** 'overlay' puts the text on the image (work); 'stacked' puts it below (articles) */
  variant?: 'overlay' | 'stacked'
  className?: string
  sizes?: string
}

export default function ProjectCard({ href, title, meta, badge, image, variant = 'overlay', className = 'aspect-[9/7]', sizes = '(max-width: 640px) 100vw, 33vw' }: Props) {
  const media = (
    <div className={`relative overflow-hidden rounded-[8px] bg-surface ${className}`}>
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
        <span className="absolute top-3 left-3 eyebrow text-[10px] text-white bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {badge}
        </span>
      )}
      {variant === 'overlay' && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-3 pb-3 pt-16 text-white">
          {meta && <p className="eyebrow text-[10px] opacity-85 mb-1">{meta}</p>}
          <h3 className="text-[15px] leading-tight">{title}</h3>
        </div>
      )}
    </div>
  )

  return (
    <Link href={href} className="group block h-full">
      {media}
      {variant === 'stacked' && (
        <div className="pt-3">
          {meta && <p className="text-xs text-muted mb-1">{meta}</p>}
          <h3 className="text-[15px] leading-snug">{title}</h3>
        </div>
      )}
    </Link>
  )
}
