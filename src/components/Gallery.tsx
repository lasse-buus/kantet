'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Gallery as PhotoSwipe, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

const pad = (n: number) => String(n).padStart(2, '0')

export interface GalleryImage {
  _key: string
  alt?: string
  asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } }
}

interface Props {
  images: GalleryImage[]
  title: string
}

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    {dir === 'right' ? <path d="M6 3l5 5-5 5" /> : <path d="M10 3L5 8l5 5" />}
  </svg>
)

/**
 * Photo carousel: one large stage (swipe / arrows / keys), a thumbnail strip,
 * and a full-screen PhotoSwipe view when a slide is clicked.
 */
export default function Gallery({ images, title }: Props) {
  const slides = images.filter((img) => img.asset?.url)
  const count = slides.length
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track || !count) return
      const next = Math.max(0, Math.min(count - 1, index))
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
    },
    [count],
  )

  // Keep the counter in sync with swipes and scrolls
  const onScroll = () => {
    const track = trackRef.current
    if (!track?.clientWidth) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    if (index !== current) setCurrent(index)
  }

  // Stay on the same slide when the window is resized
  const currentRef = useRef(0)
  useEffect(() => {
    currentRef.current = current
  }, [current])
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let lastWidth = track.clientWidth
    const ro = new ResizeObserver(() => {
      const width = track.clientWidth
      if (!width || width === lastWidth) return
      lastWidth = width
      track.scrollTo({ left: currentRef.current * width, behavior: 'auto' })
    })
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  // Keep the active thumbnail visible in the strip
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[current] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' })
  }, [current])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(current + 1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(current - 1)
    }
  }

  if (!count) return null

  const arrow =
    'grid place-items-center size-10 border border-line text-ink transition-colors hover:bg-accent hover:border-accent hover:text-accent-ink disabled:opacity-30 disabled:pointer-events-none'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${title} — screenshots`}>
      {/* Stage */}
      <div className="p-4 sm:p-10">
        <div className="crop">
          <PhotoSwipe options={{ bgOpacity: 0.95 }}>
            <div
              ref={trackRef}
              onScroll={onScroll}
              onKeyDown={onKeyDown}
              tabIndex={0}
              aria-label="Use arrow keys to browse"
              className="gallery-track aspect-[4/5] sm:aspect-[16/10] bg-surface"
            >
              {slides.map((img, i) => {
                const alt = img.alt?.trim() || `${title} — image ${i + 1}`
                const { width = 1600, height = 1000 } = img.asset!.metadata?.dimensions ?? {}
                return (
                  <Item key={img._key} original={`${img.asset!.url}?w=2400&fit=max&auto=format`} width={width} height={height} alt={alt}>
                    {({ ref, open }) => (
                      <div className="gallery-slide" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
                        <button
                          type="button"
                          ref={ref as React.Ref<HTMLButtonElement>}
                          onClick={open}
                          className="absolute inset-0 cursor-zoom-in"
                          aria-label={`Open ${alt} in full screen`}
                        >
                          <Image src={img.asset!.url} alt={alt} fill sizes="(max-width: 1280px) 100vw, 1200px" className="object-contain" />
                        </button>
                      </div>
                    )}
                  </Item>
                )
              })}
            </div>
          </PhotoSwipe>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 sm:px-10 pb-4 sm:pb-8">
        <span className="eyebrow text-muted">
          <span className="text-ink">{pad(current + 1)}</span> / {pad(count)}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" className={arrow} onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous image">
            <Chevron dir="left" />
          </button>
          <button type="button" className={arrow} onClick={() => goTo(current + 1)} disabled={current === count - 1} aria-label="Next image">
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="border-t border-line">
          <div ref={thumbsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-10 py-4">
            {slides.map((img, i) => (
              <button
                key={`thumb-${img._key}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={`relative flex-none size-16 overflow-hidden bg-surface transition-opacity ${
                  i === current ? 'outline-2 outline-offset-2 outline-brand-fg' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={img.asset!.url} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
