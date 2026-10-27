import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import { client } from '@/sanity/client'
import { casesQuery, homepageQuery, postsQuery, servicesQuery } from '@/sanity/queries'

interface Service {
	_id: string
	title: string
	description: string
	icon?: { asset?: { url: string } }
}

interface Homepage {
	heroImage?: { asset?: { url: string }; alt?: string }
	heroTitle?: string
	heroDescription?: string
}

interface CaseItem {
	_id: string
	title: string
	slug: { current: string }
	client?: string
	year?: number
	tags?: string[]
	excerpt?: string
	coverImage?: { asset: { url: string }; alt?: string }
}

interface PostItem {
	_id: string
	title: string
	slug: { current: string }
	publishedAt?: string
	tags?: string[]
	coverImage?: { asset: { url: string }; alt?: string }
}

export const revalidate = 60

/*
 * On large screens the hero is laid out directly on the 64px blueprint grid,
 * measured from the centre line, so text, image and tiles all snap to cells.
 */
const CELL = 64
const cell = (col: number, row: number, w = 1, h = 1): React.CSSProperties => ({
	left: `calc(50% + ${col * CELL + 1}px)`,
	top: `${row * CELL + 1}px`,
	width: `${w * CELL - 1}px`,
	height: `${h * CELL - 1}px`,
})

/** Same placement as CSS variables, consumed by lg:left-(--l) etc. */
const cellVars = (col: number, row: number, w = 1, h = 1) => {
	const c = cell(col, row, w, h)
	return { '--l': c.left, '--t': c.top, '--w': c.width, '--h': c.height } as React.CSSProperties
}
const onGrid = 'lg:absolute lg:left-(--l) lg:top-(--t) lg:w-(--w) lg:h-(--h)'

const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default async function HomePage() {
	const [homepage, services, cases, posts]: [Homepage, Service[], CaseItem[], PostItem[]] = await Promise.all([
		client.fetch(homepageQuery).catch(() => ({})),
		client.fetch(servicesQuery).catch(() => []),
		client.fetch(casesQuery).catch(() => []),
		client.fetch(postsQuery).catch(() => []),
	])

	const heroSrc = homepage?.heroImage?.asset?.url ?? '/kantet-hero.jpg'
	const heroAlt = homepage?.heroImage?.alt ?? ''
	const heroTitle = homepage?.heroTitle ?? 'Design & development\nthat moves people.'
	const heroDescription = (homepage?.heroDescription ?? 'Kantet is an independent agency building web experiences that combine sharp design with solid engineering.').trim()
	const featured = cases.slice(0, 2)
	const latest = posts.slice(0, 3)

	const sections = [featured.length > 0, services.length > 0, latest.length > 0].filter(Boolean).length
	let n = 0

	const heroText = (
		<>
			<p className="flex items-center gap-2.5 text-sm text-muted">
				<span aria-hidden className="size-2 bg-accent" />
				Independent web design &amp; development studio
			</p>
			<h1 className="display text-[44px] sm:text-6xl lg:text-[64px] lg:leading-[1.02] font-semibold mt-6 whitespace-pre-line">{heroTitle}</h1>
			<p className="text-muted text-lg leading-relaxed max-w-[34rem] mt-6">{heroDescription}</p>
			<div className="flex flex-wrap items-center gap-3 mt-8">
				<Link href="/contact" className="inline-flex items-center h-11 px-5 bg-accent text-accent-ink font-medium hover:bg-ink hover:text-paper transition-colors">
					Start a project
				</Link>
				<Link href="/cases" className="inline-flex items-center h-11 px-5 border border-line-strong hover:border-ink transition-colors">
					See our work
				</Link>
			</div>
		</>
	)

	const heroImage = (
		<div className="crop h-full">
			<div className="cyanotype relative h-full overflow-hidden bg-surface">
				<Image src={heroSrc} alt={heroAlt} fill sizes="(max-width: 1024px) 100vw, 512px" className="object-cover" loading="eager" fetchPriority="high" />
			</div>
		</div>
	)

	return (
		<main>
			{/* Hero */}
			<section className="relative overflow-hidden rule">
				<div className="relative frame">
					<div aria-hidden className="absolute inset-0 blueprint" />

					{/* One tree: stacked on small screens, snapped to grid cells on large screens */}
					<div className="relative px-4 sm:px-6 pt-14 pb-12 lg:p-0 lg:h-[576px]">
						<div className={`lg:flex lg:flex-col lg:justify-center ${onGrid}`} style={cellVars(-9, 1, 9, 7)}>
							{heroText}
						</div>
						<div className={`mt-12 aspect-[4/3] lg:mt-0 lg:aspect-auto ${onGrid}`} style={cellVars(1, 1, 8, 7)}>
							{heroImage}
						</div>
						<span aria-hidden className="hidden lg:block absolute bg-accent" style={cell(0, 6)} />
						<span aria-hidden className="hidden lg:block absolute bg-accent-soft" style={cell(0, 7)} />
						<span aria-hidden className="hidden lg:block absolute bg-accent-soft" style={cell(9, 1)} />
					</div>
				</div>
			</section>
			
			{/* Services */}
			{services.length > 0 && (
				<Section index={++n} total={sections} label="Services">
					<ul className="cell-grid sm:grid-cols-3">
						{services.map((s) => (
							<li key={s._id} className="flex flex-col p-6 lg:p-8 min-h-[220px] lg:min-h-[260px]">
								<span aria-hidden className="relative block size-8">
									<span className="absolute left-0 top-0 h-px w-full bg-accent" />
									<span className="absolute left-0 top-0 w-px h-full bg-accent" />
								</span>
								<h3 className="text-2xl font-semibold tracking-[-0.02em] mt-auto">{s.title}</h3>
								<p className="text-muted leading-relaxed mt-3 max-w-[34ch]">{s.description}</p>
							</li>
						))}
					</ul>
				</Section>
			)}
			
			{/* From the blog */}
			{latest.length > 0 && (
				<Section index={++n} total={sections} label="From the blog" action={{ href: '/blog', label: 'All posts' }}>
					<ul className="cell-grid sm:grid-cols-2 lg:grid-cols-3">
						{latest.map((p) => (
							<li key={p._id} className="p-4 sm:p-6">
								<ProjectCard
									href={`/blog/${p.slug.current}`}
									title={p.title}
									meta={p.publishedAt ? formatDate(p.publishedAt) : undefined}
									image={p.coverImage}
									className="aspect-[3/2]"
								/>
							</li>
						))}
					</ul>
				</Section>
			)}
		
			{/* Featured work: one wide row per case, image side alternates */}
			{featured.length > 0 && (
				<Section index={++n} total={sections} label="Featured work" action={{ href: '/cases', label: 'All work' }}>
					<ul>
						{featured.map((c, i) => (
							<li key={c._id} className="grid lg:grid-cols-12 border-b border-line last:border-b-0">
								<Link href={`/cases/${c.slug.current}`} className={`group lg:col-span-7 p-4 sm:p-6 lg:p-10 border-line ${i % 2 === 1 ? 'lg:order-last lg:border-l' : 'lg:border-r'}`}>
									<div className="crop">
										<div className="relative aspect-[16/10] overflow-hidden bg-surface">
											{c.coverImage?.asset?.url && (
												<Image
													src={c.coverImage.asset.url}
													alt={c.coverImage.alt ?? c.title}
													fill
													sizes="(max-width: 1024px) 100vw, 700px"
													loading={i === 0 ? 'eager' : 'lazy'}
													className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
												/>
											)}
										</div>
									</div>
								</Link>
								<div className="lg:col-span-5 flex flex-col px-4 sm:px-6 lg:px-10 pb-8 lg:py-10">
									<dl className="grid grid-cols-2 gap-4 text-sm">
										{c.client && (
											<div>
												<dt className="text-subtle">Client</dt>
												<dd className="mt-1">{c.client}</dd>
											</div>
										)}
										{c.year && (
											<div>
												<dt className="text-subtle">Year</dt>
												<dd className="mt-1">{c.year}</dd>
											</div>
										)}
									</dl>
									<h3 className="display text-3xl sm:text-4xl font-semibold mt-8 lg:mt-auto">{c.title}</h3>
									{c.excerpt && <p className="text-muted leading-relaxed mt-4 max-w-md">{c.excerpt}</p>}
									{c.tags?.length ? (
										<ul className="flex flex-wrap gap-1.5 mt-6">
											{c.tags.map((t) => (
												<li key={t} className="text-xs px-2 py-1 border border-line text-muted">{t}</li>
											))}
										</ul>
									) : null}
									<Link href={`/cases/${c.slug.current}`} className="self-start inline-flex items-center gap-2 mt-8 font-medium text-brand-fg hover:text-ink transition-colors">
										Read the case
										<svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"><path d="M4 12L12 4M6 4h6v6" /></svg>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</Section>
			)}

		</main>
	)
}
