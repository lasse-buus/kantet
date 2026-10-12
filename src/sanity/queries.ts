import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage" && _id == "homepage"][0] {
    heroImage { asset->{ url }, alt },
    heroTitle,
    heroDescription,
  }
`

export const casesQuery = groq`
  *[_type == "case"] | order(_createdAt desc) {
    _id, title, slug, client, year, tags, excerpt,
    coverImage { asset->{ url }, alt },
  }
`

export const caseBySlugQuery = groq`
  *[_type == "case" && slug.current == $slug][0] {
    _id, title, slug, client, year, tags, excerpt, url,
    coverImage { asset->{ url }, alt },
    body[] { ..., asset-> },
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, description,
    icon { asset->{ url } },
  }
`

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, tags,
    coverImage { asset->{ url }, alt },
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
    _id, title, slug, publishedAt, excerpt, tags,
    coverImage { asset->{ url }, alt },
    body[] { ..., asset-> },
  }
`
