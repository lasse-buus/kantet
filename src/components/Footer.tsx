import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/cases', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Rails run on down to the footer */}
      <div aria-hidden className="frame h-20 sm:h-28" />

      <div className="bg-brand text-white">
        <div className="relative mx-auto max-w-[80rem] border-x border-white/20">
          {/* Blueprint grid on the cobalt */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: 'var(--grid-cell) var(--grid-cell)',
              backgroundPosition: 'center top',
              maskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
            }}
          />

          {/* Call to action */}
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-14 sm:pb-20 border-b border-white/20">
            <h2 className="display text-4xl sm:text-6xl font-semibold max-w-2xl">Have a project in mind?</h2>
            <Link href="/contact" className="self-start sm:self-auto inline-flex items-center h-12 px-6 bg-white text-[#14161b] font-medium hover:bg-[#14161b] hover:text-white transition-colors">
              Start a project
            </Link>
          </div>

          {/* Info cells */}
          <div className="relative grid sm:grid-cols-3">
            <div className="px-4 sm:px-6 lg:px-10 py-8 border-b sm:border-b-0 sm:border-r border-white/20">
              <Link href="/" className="inline-flex items-end gap-1 text-[26px] font-semibold tracking-[-0.04em] leading-none" aria-label="Kantet, home">
                Kantet
                <span aria-hidden className="size-2 bg-white mb-[3px]" />
              </Link>
              <p className="text-sm text-white/70 leading-relaxed mt-4 max-w-[28ch]">
                Independent web design &amp; development studio.
              </p>
            </div>
            <nav className="px-4 sm:px-6 lg:px-10 py-8 border-b sm:border-b-0 sm:border-r border-white/20" aria-label="Footer">
              <p className="text-sm text-white/60 mb-3">Pages</p>
              <ul className="space-y-1.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white/60 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-4 sm:px-6 lg:px-10 py-8">
              <p className="text-sm text-white/60 mb-3">Get in touch</p>
              <Link href="/contact" className="underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="relative flex justify-between gap-4 px-4 sm:px-6 lg:px-10 py-5 border-t border-white/20 text-xs text-white/60">
            <p>© {new Date().getFullYear()} Kantet</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
