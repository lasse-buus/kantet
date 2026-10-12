import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { client } from '@/sanity/client'
import { casesQuery, homepageQuery, servicesQuery } from '@/sanity/queries'

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
	tags?: string[]
	coverImage?: { asset: { url: string }; alt?: string }
}

export const revalidate = 60

export default async function HomePage() {
	const [homepage, services, cases]: [Homepage, Service[], CaseItem[]] = await Promise.all([
		client.fetch(homepageQuery).catch(() => ({})),
		client.fetch(servicesQuery).catch(() => []),
		client.fetch(casesQuery).catch(() => []),
	])

	const heroSrc = homepage?.heroImage?.asset?.url ?? '/kantet-hero.jpg'
	const heroAlt = homepage?.heroImage?.alt ?? 'Hero'
	const heroTitle = homepage?.heroTitle ?? 'Design & development\nthat moves people.'
	const heroDescription = homepage?.heroDescription ?? 'Kantet is an independent agency building web experiences that combine sharp design with solid engineering.'
	const [heroLead, ...heroRestLines] = heroTitle.split('\n')
	const heroRest = heroRestLines.join(' ')
	const featured = cases.slice(0, 3)

	return (
		<main>
			{/* Hero */}
			<section className="relative h-[90svh] min-h-[32rem] overflow-hidden bg-surface">
				<Image src={heroSrc} alt={heroAlt} fill sizes="100vw" className="object-cover" priority />
				<div className="absolute inset-0 bg-black/20" />
				<div className="absolute inset-0 grid place-items-center px-4 text-center text-white">
					<h1 className="display text-3xl sm:text-5xl font-medium max-w-3xl">
						{heroLead}
						{heroRest && <span className="block opacity-60">{heroRest}</span>}
					</h1>
				</div>
			</section>

			{/* Intro */}
			<section className="px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-24 grid lg:grid-cols-2">
				<div className="lg:col-start-2 max-w-xl">
					<p className="display text-2xl sm:text-[28px] font-medium">{heroDescription}</p>
					<Link href="/contact" className="pill mt-6">Get in touch</Link>
				</div>
			</section>

			{/* Featured work */}
			{featured.length > 0 && (
				<section className="px-2 sm:px-3">
					<div className="flex items-center justify-between gap-6 border-t border-line pt-4 mb-4 px-2 sm:px-3">
						<h2 className="eyebrow text-[10px]">Featured work</h2>
						<Link href="/cases" className="pill">View all work</Link>
					</div>
					<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{featured.map((c) => (
							<li key={c._id}>
								<ProjectCard href={`/cases/${c.slug.current}`} title={c.title} meta={c.tags?.join(' / ')} image={c.coverImage} className="aspect-[3/2]" />
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Services */}
			{services.length > 0 && (
				<section className="px-4 sm:px-6 pt-32">
					<div className="border-t border-line pt-6 mb-6">
						<h2 className="eyebrow text-muted">Services</h2>
					</div>
					<ul>
						{services.map((s, i) => (
							<li key={s._id} className="grid gap-4 sm:grid-cols-12 border-b border-line py-8 first:border-t">
								<span className="eyebrow text-muted sm:col-span-1 pt-2">{String(i + 1).padStart(2, '0')}</span>
								<h3 className="display text-3xl sm:text-[38px] font-medium sm:col-span-6">{s.title}</h3>
								<p className="text-muted leading-relaxed sm:col-span-5 sm:pt-2">{s.description}</p>
							</li>
						))}
					</ul>
				</section>
			)}
		</main>
	)
}
