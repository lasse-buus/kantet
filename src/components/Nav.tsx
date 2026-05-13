'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-white dark:bg-neutral-950/80 backdrop-blur-md' : ''}`}>
      <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-xl text-neutral-950 dark:text-white">
          <Image src="/kantet-logo-square-black.svg" alt="" width={58} height={58} className="dark:hidden" aria-hidden />
          <Image src="/kantet-logo-square-white.svg" alt="" width={58} height={58} className="hidden dark:block" aria-hidden />
          {/* kantet */}
        </Link>
        <ul className="flex items-center gap-6 text-sm text-neutral-950 dark:text-white">
          <li><Link href="/cases" className="hover:opacity-60 transition-opacity">Work</Link></li>
          <li><Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link></li>
          <li><ThemeToggle /></li>
        </ul>
      </nav>
    </header>
  )
}
