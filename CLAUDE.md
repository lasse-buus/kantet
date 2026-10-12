@AGENTS.md

## Writing blog posts (Sanity MCP)

The `sanity` MCP server is configured in `.mcp.json`. Use it to write blog posts directly into Sanity.

- Project ID: `nrloy6a0`, dataset: `production`
- Document type: `post` (schema in `src/sanity/schemas/post.ts`)
  - `title` (required), `slug` (required, `{ _type: "slug", current: "kebab-case-title" }`)
  - `publishedAt` (ISO datetime), `excerpt` (max 200 chars, used as meta description)
  - `tags` (array of strings), `coverImage` (image + `alt`), `body` (Portable Text: blocks with h2/h3, normal paragraphs, bullet lists, links)
- **Always create posts as drafts. Never publish** unless explicitly asked. Lasse reviews and publishes in `/studio`.
- Use `h2`/`h3` for structure — never `h1` in the body (the page renders the title as h1).
- Language: write in English unless asked otherwise. Tone: clear, practical and personal, like a small studio sharing what it knows — no marketing fluff.
- The blog renders at `/blog` and `/blog/[slug]`; only posts with `publishedAt` in the past are shown.

## Writing cases (Sanity MCP)

Cases (portfolio work) live in the same Sanity project and dataset as the blog, so the same `sanity` MCP server is used.

- Document type: `case` (schema in `src/sanity/schemas/case.ts`)
  - `title` (required), `slug` (required, `{ _type: "slug", current: "kebab-case-title" }`)
  - `client` (string), `year` (number — `/cases` is sorted by year, newest first)
  - `tags`: only use values from the fixed list — `Web Design`, `Development`, `Branding`, `UX/UI`, `E-commerce`. Pick the ones that actually apply, not all of them.
  - `excerpt` (max 200 chars, used in the case list and as meta description)
  - `coverImage` (image + `alt`), `url` (live site, optional)
  - `body` (Portable Text: blocks with h2/h3, normal paragraphs, bullet lists, links, and images with `alt`)
- **Always create cases as drafts. Never publish** unless explicitly asked. Cases have no publish date — anything published in `/studio` is live immediately.
- Use `h2`/`h3` for structure — never `h1` in the body (the page renders the title as h1).
- Suggested structure: short intro → **The challenge** → **Our approach** → **The result**. Keep it concrete: what was built, for whom, and why the choices were made.
- Never invent facts about a client, numbers or results. If details are missing, ask or leave a clearly marked placeholder for Lasse to fill in.
- Language and tone: same as blog posts.
- Cases render at `/cases` and `/cases/[slug]`.
