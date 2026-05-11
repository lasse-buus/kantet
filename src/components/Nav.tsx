import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg text-neutral-950 dark:text-white">
          kantet
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
