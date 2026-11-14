# Graph Report - kantet  (2026-11-14)

## Corpus Check
- 46 files · ~14,061 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 1, .bak 1, .ico 1)

## Summary
- 264 nodes · 427 edges · 16 communities (11 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f65711e8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- next
- blog/[slug]/page.tsx
- Kantet — Figma Handoff Spec
- gate/page.tsx
- compilerOptions
- sanity
- (main)/layout.tsx
- app/layout.tsx
- post.md
- README.md
- CLAUDE.md
- [[...tool]]/layout.tsx
- AGENTS.md
- .mcp.json
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `next` - 20 edges
2. `compilerOptions` - 16 edges
3. `Kantet — Figma Handoff Spec` - 13 edges
4. `Section()` - 12 edges
5. `sanity` - 9 edges
6. `DetailLayout()` - 9 edges
7. `PageHeader()` - 9 edges
8. `ProjectCard()` - 9 edges
9. `5 · Components` - 9 edges
10. `HomePage` - 6 edges

## Surprising Connections (you probably didn't know these)
- `5.5 Nav (page header)` --references--> `Nav()`  [INFERRED]
  figma-handoff.md → src/components/Nav.tsx
- `CasePage()` --calls--> `DetailLayout()`  [EXTRACTED]
  src/app/(main)/cases/[slug]/page.tsx → src/components/DetailLayout.tsx
- `PostPage()` --calls--> `DetailLayout()`  [EXTRACTED]
  src/app/(main)/blog/[slug]/page.tsx → src/components/DetailLayout.tsx
- `HomePage` --calls--> `ProjectCard()`  [EXTRACTED]
  src/app/(main)/page.tsx → src/components/ProjectCard.tsx
- `HomePage` --calls--> `Section()`  [EXTRACTED]
  src/app/(main)/page.tsx → src/components/Section.tsx

## Import Cycles
- None detected.

## Communities (16 total, 5 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.05
Nodes (51): eslintConfig, dependencies, next@^16.4.3, photoswipe@^5.4.4, react@19.2.4, react-dom@19.2.4, react-photoswipe-gallery@^4.1.2, resend@^6.12.3 (+43 more)

### Community 1 - "next"
Cohesion: 0.11
Nodes (27): nextConfig, next, BlogPage(), formatDate(), metadata, PostItem, postMeta(), revalidate (+19 more)

### Community 2 - "blog/[slug]/page.tsx"
Cohesion: 0.08
Nodes (31): @portabletext/react@^6.2.0, @portabletext/react, formatDate(), formatShortDate(), MorePost, PostPage(), Props, readingTime() (+23 more)

### Community 3 - "Kantet — Figma Handoff Spec"
Cohesion: 0.07
Nodes (26): 0 · What's already in the Figma file, 10 · Code references, 11 · Open questions for design, 1 · Project context, 2 · Typography, 3 · Spacing & layout, 4 · Radii, 5.1 Button (+18 more)

### Community 4 - "gate/page.tsx"
Cohesion: 0.16
Nodes (17): field(), POST(), resend, authenticate(), Props, buckets, clientIp(), rateLimit() (+9 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "sanity"
Cohesion: 0.17
Nodes (6): next-sanity@^12.4.5, @sanity/vision@^5.24.0, next-sanity, sanity, @sanity/vision, schemaTypes

### Community 7 - "(main)/layout.tsx"
Cohesion: 0.21
Nodes (10): @vercel/analytics@^2.0.1, @vercel/speed-insights@^2.1.0, @vercel/analytics, @vercel/speed-insights, MainLayout(), Footer(), links, links (+2 more)

### Community 8 - "app/layout.tsx"
Cohesion: 0.24
Nodes (7): next-themes@^0.4.6, next-themes, dmMono, metadata, RootLayout(), schibsted, ThemeProvider()

### Community 9 - "post.md"
Cohesion: 0.29
Nodes (6): It runs on our own machine, Servers, Vercel and Sanity, Staging in one click, What needs you first, Why build it ourselves?, WordPress, without logging in to each site

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `package.json`, `blog/[slug]/page.tsx`, `gate/page.tsx`, `(main)/layout.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.402) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05241090146750524 - nodes in this community are weakly interconnected._
- **Why does `Nav()` connect `(main)/layout.tsx` to `Kantet — Figma Handoff Spec`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `5.5 Nav (page header)` connect `Kantet — Figma Handoff Spec` to `(main)/layout.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Should `blog/[slug]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07948717948717948 - nodes in this community are weakly interconnected._
- **Should `Kantet — Figma Handoff Spec` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._