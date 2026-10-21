import Link from 'next/link'

const pad = (n: number) => String(n).padStart(2, '0')

interface Props {
  index?: number
  total?: number
  label: string
  action?: { href: string; label: string }
  children: React.ReactNode
  className?: string
}

/**
 * A full-bleed section on the page grid: rule underneath, rails left/right,
 * crosshairs at the corners and an index row — [ 01 / 03 ]  LABEL ...... action
 */
export default function Section({ index, total, label, action, children, className = '' }: Props) {
  return (
    <section className={`rule ${className}`}>
      <div className="frame cross">
        <header className="relative flex items-center justify-between h-11 px-4 sm:px-6 border-b border-line">
          <span aria-hidden className="absolute inset-y-0 -left-px w-[2px] bg-brand-fg" />
          <h2 className="eyebrow text-muted flex items-center gap-4">
            {index ? (
              <span>
                <span className="text-ink">[ {pad(index)}</span>
                {total ? <span> / {pad(total)}</span> : null}
                <span className="text-ink"> ]</span>
              </span>
            ) : null}
            <span>{label}</span>
          </h2>
          {action && (
            <Link href={action.href} className="eyebrow text-ink hover:text-brand-fg transition-colors">
              {action.label} <span aria-hidden>→</span>
            </Link>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
