# Graph Report - kantet  (2026-11-12)

## Corpus Check
- 46 files · ~13,926 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 1, .bak 1, .ico 1)

## Summary
- 262 nodes · 423 edges · 17 communities (12 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `76150688`
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
- scripts
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
- `PostPage()` --calls--> `DetailLayout()`  [EXTRACTED]
  src/app/(main)/blog/[slug]/page.tsx → src/components/DetailLayout.tsx
- `CasePage()` --calls--> `DetailLayout()`  [EXTRACTED]
  src/app/(main)/cases/[slug]/page.tsx → src/components/DetailLayout.tsx
- `HomePage` --calls--> `ProjectCard()`  [EXTRACTED]
  src/app/(main)/page.tsx → src/components/ProjectCard.tsx
- `HomePage` --calls--> `Section()`  [EXTRACTED]
  src/app/(main)/page.tsx → src/components/Section.tsx

## Import Cycles
- None detected.

## Communities (17 total, 5 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (46): eslintConfig, dependencies, next-themes@^0.4.6, photoswipe@^5.4.4, react@19.2.4, react-dom@19.2.4, react-photoswipe-gallery@^4.1.2, resend@^6.12.3 (+38 more)

### Community 1 - "next"
Cohesion: 0.09
Nodes (35): nextConfig, next@^16.4.3, @portabletext/react@^6.2.0, next, @portabletext/react, BlogPage(), formatDate(), metadata (+27 more)

### Community 2 - "blog/[slug]/page.tsx"
Cohesion: 0.08
Nodes (30): next-sanity@^12.4.5, next-sanity, formatDate(), formatShortDate(), MorePost, PostPage(), Props, readingTime() (+22 more)

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
Cohesion: 0.23
Nodes (3): sanity@^5.24.0, sanity, schemaTypes

### Community 7 - "(main)/layout.tsx"
Cohesion: 0.33
Nodes (6): MainLayout(), Footer(), links, links, Nav(), ThemeToggle()

### Community 8 - "app/layout.tsx"
Cohesion: 0.32
Nodes (5): dmMono, metadata, RootLayout(), schibsted, ThemeProvider()

### Community 9 - "post.md"
Cohesion: 0.29
Nodes (6): It runs on our own machine, Servers, Vercel and Sanity, Staging in one click, What needs you first, Why build it ourselves?, WordPress, without logging in to each site

### Community 10 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `package.json`, `blog/[slug]/page.tsx`, `gate/page.tsx`, `(main)/layout.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.412) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06028368794326241 - nodes in this community are weakly interconnected._
- **Why does `Nav()` connect `(main)/layout.tsx` to `Kantet — Figma Handoff Spec`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `5.5 Nav (page header)` connect `Kantet — Figma Handoff Spec` to `(main)/layout.tsx`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Should `blog/[slug]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08367071524966262 - nodes in this community are weakly interconnected._
- **Should `Kantet — Figma Handoff Spec` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._