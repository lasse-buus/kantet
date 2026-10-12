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
