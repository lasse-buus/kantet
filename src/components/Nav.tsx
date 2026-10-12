'use client'

import Image from 'next/image'
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
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-[10px] bg-[#c8cbcf]/70 dark:bg-[#3a3b3d]/70 backdrop-blur-md p-1 pl-2.5 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]">
        <Link href="/" className="flex items-center mr-2 sm:mr-4" aria-label="Kantet, home">
          <Image src="/kantet-logo-square-black.svg" alt="" width={28} height={28} className="dark:hidden" aria-hidden />
          <Image src="/kantet-logo-square-white.svg" alt="" width={28} height={28} className="hidden dark:block" aria-hidden />
        </Link>
        <ul className="flex items-center text-[13px]">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`)
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-[7px] px-2.5 sm:px-3 py-1.5 transition-colors ${active ? 'bg-paper/80 text-ink' : 'text-ink/75 hover:text-ink'}`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
