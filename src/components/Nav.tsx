'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/cases', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 rule glass">
      <nav className="frame flex items-center justify-between h-16 px-4 sm:px-6">
        <Link href="/" className="flex items-end gap-1 text-[22px] font-semibold tracking-[-0.04em] leading-none" aria-label="Kantet, home">
          Kantet
          <span aria-hidden className="size-[7px] bg-accent mb-[3px]" />
        </Link>

        <ul className="flex items-center gap-1 sm:gap-6 text-sm sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`)
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative block px-2 py-1.5 transition-colors ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {l.label}
                  {active && <span aria-hidden className="absolute left-1/2 -translate-x-1/2 -bottom-[13px] size-[5px] bg-accent" />}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center h-9 px-4 bg-ink text-paper text-sm hover:bg-accent hover:text-accent-ink transition-colors"
          >
            Start a project
          </Link>
        </div>
      </nav>
    </header>
  )
}
