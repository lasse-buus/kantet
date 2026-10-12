import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/cases', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="mt-auto pt-24">
      <div className="bg-brand text-white px-4 sm:px-6 pt-6 pb-6">
        <div className="grid gap-10 sm:gap-4 sm:grid-cols-12 pb-24 sm:pb-32">
          <Link href="/" className="sm:col-span-6 display font-medium text-[22vw] sm:text-[11vw] leading-[0.8] tracking-[-0.05em]" aria-label="Kantet, home">
            Kantet<sup className="text-[0.3em] align-[0.9em] ml-1">™</sup>
          </Link>
          <ul className="sm:col-span-6 sm:pt-3 space-y-1.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="eyebrow hover:opacity-60 transition-opacity">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-12 gap-4 eyebrow text-[10px]">
          <p className="sm:col-span-6">©{new Date().getFullYear()} Kantet™</p>
          <p className="sm:col-span-6">All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
