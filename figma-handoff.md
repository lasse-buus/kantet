# Kantet — Figma Handoff Spec

A reference for rebuilding the implemented design inside the Figma file
`https://www.figma.com/design/GxJ7YTbTXx4yMi1Ognff6K/`.

Generated from the kantet codebase on 2026-05-13.

---

## 0 · What's already in the Figma file

The color foundation is already written into the file via the Figma Plugin
API. You should see it under *Local variables*:

**Primitives** (collection, single mode — `Mode 1`)

| Variable | Hex |
| --- | --- |
| `neutral/0` | `#ffffff` |
| `neutral/50` | `#fafafa` |
| `neutral/100` | `#f5f5f5` |
| `neutral/200` | `#e5e5e5` |
| `neutral/300` | `#d4d4d4` |
| `neutral/400` | `#a3a3a3` |
| `neutral/500` | `#737373` |
| `neutral/600` | `#525252` |
| `neutral/700` | `#404040` |
| `neutral/800` | `#262626` |
| `neutral/900` | `#171717` |
| `neutral/950` | `#0a0a0a` |
| `red/500` | `#ef4444` |

**Semantic** (collection, modes: `Light`, `Dark` — all values are aliases to the primitives)

| Variable | Light → | Dark → |
| --- | --- | --- |
| `bg/canvas` | `neutral/0` | `neutral/950` |
| `bg/surface` | `neutral/0` | `neutral/950` |
| `bg/subtle` | `neutral/100` | `neutral/900` |
| `bg/elevated` | `neutral/0` | `neutral/900` |
| `fg/primary` | `neutral/950` | `neutral/100` |
| `fg/secondary` | `neutral/500` | `neutral/400` |
| `fg/inverse` | `neutral/0` | `neutral/950` |
| `fg/onAccent` | `neutral/0` | `neutral/950` |
| `border/default` | `neutral/200` | `neutral/800` |
| `border/subtle` | `neutral/200` | `neutral/800` |
| `border/strong` | `neutral/300` | `neutral/700` |
| `accent/bg` | `neutral/950` | `neutral/0` |
| `accent/fg` | `neutral/0` | `neutral/950` |
| `danger/fg` | `red/500` | `red/500` |

Use **Semantic** for every fill, stroke, and text color. Switch a frame's
mode in the right-rail "Mode" dropdown to preview Light vs Dark.

> **Tip:** Bind the page frame to a mode and every nested fill/stroke that
> uses semantic variables will flip automatically — no per-element work.

---

## 1 · Project context

- **Stack:** Next.js 16 (App Router) + React 19 + Tailwind v4 + Sanity CMS + next-themes + Resend.
- **Default theme:** Dark. The toggle is in the nav (sun/moon icon).
- **Brand:** Kantet — independent web design + development agency.
- **Voice:** First-person singular ("Drop me a line"). Confident, minimal,
  black-and-white aesthetic with one signature shape (the hero's
  asymmetric corner radius).
- **Logo files in `/public`:** `kantet-logo-square-black.svg`,
  `kantet-logo-square-white.svg`, `kantet-logo-black.svg`,
  `kantet-logo-white.svg`, plus `-corner` variants. The square pair is
  used in the nav.

---

## 2 · Typography

Fonts loaded via `next/font/google`: **Geist** (UI) and **Geist Mono**
(reserved — not currently in use on the site but available). Both are
available in Figma's font picker as `Geist` and `Geist Mono` (style names
have no space, e.g. `SemiBold`).

`tracking-tight` in Tailwind = `-0.025em`. Convert to Figma's percent
letter-spacing as `-2.5%`.

| Role | Tailwind | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Hero display | `text-8xl` | 96 / 96 | SemiBold | -2.5% |
| Display lg | `text-7xl` | 72 / 72 | SemiBold | -2.5% |
| Display sm | `text-5xl` | 48 / 48 | SemiBold | -2.5% |
| H1 (Work, Cases) | `text-6xl` | 60 / 64 | SemiBold | -2.5% |
| H1 sm | `text-4xl` | 36 / 40 | SemiBold | -2.5% |
| H2 (CTA section) | `text-3xl` / `text-4xl` | 30 / 36 | SemiBold | -2.5% |
| H3 (service title) | `text-xl` | 20 / 28 | SemiBold | 0 |
| Lead paragraph | `text-lg` / `text-xl` | 18 / 28 | Regular | 0 |
| Body | `text-base` | 16 / 24 | Regular | 0 |
| Small / meta | `text-sm` | 14 / 20 | Regular | 0 |
| Eyebrow | `text-xs uppercase tracking-widest` | 12 / 16 | Medium | +10% (`tracking-widest`) |

Recommend creating Figma text styles named `display/hero`, `display/lg`,
`display/sm`, `heading/h1`, `heading/h2`, `heading/h3`, `body/lead`,
`body/base`, `body/small`, `label/eyebrow`.

Special cases in code:

- Hero `<h1>` uses `whitespace-pre-line` and the default copy has a line
  break: `"Design & development\nthat moves people."`
- Case detail body uses `@tailwindcss/typography` (`prose prose-invert
  prose-neutral`). For Figma, set body width to ~720 px (max-w-4xl ≈ 896
  but typography plugin narrows the measure).

---

## 3 · Spacing & layout

Tailwind's 4-px base. Specific values used in the app:

| Token | px | Where it's used |
| --- | --- | --- |
| 4 | 4 | gap between tiny meta items |
| 6 | 6 | rare |
| 8 | 8 | tag pill gaps, intra-component padding |
| 12 | 12 | small button padding |
| 16 | 16 | section paragraph leading, form gaps |
| 24 | 24 | container px (`px-6`), button x-pad, card padding |
| 32 | 32 | card gap, section gap inside cards |
| 48 | 48 | medium section gap |
| 64 | 64 | section gap inside hero (`gap-12`) |
| 96 | 96 | section vertical padding (`py-24`) |
| 128 | 128 | hero top margin (`mt-30`) |

Container: `max-w-7xl` (= 1280 px) centered with `px-6` (24 px) horizontal padding.

Breakpoints actually used:

| Tailwind | Min width |
| --- | --- |
| `sm:` | 640 px |
| `md:` | 768 px |
| `lg:` | 1024 px |
| `xl:` | 1280 px |

Design Figma frames at **1440** (desktop), **768** (tablet), **375**
(mobile). The site is mobile-first.

---

## 4 · Radii

| Token | px | Where |
| --- | --- | --- |
| `rounded` | 4 | case thumb |
| `rounded-lg` | 8 | input fields, color swatches |
| `rounded-2xl` | 16 | (reserved) |
| `rounded-full` | 999 | CTA pills, tag pills, theme toggle hit area |
| **Signature** `rounded-tl-4xl rounded-br-4xl` | 32 / 32 (only top-left + bottom-right) | **hero image only** — the brand shape |

The hero shape is the strongest brand element. Top-right and bottom-left
corners stay at 0; only top-left and bottom-right are 32 px. Recreate as
a frame with `topLeftRadius=32`, `bottomRightRadius=32`, others = 0.

---

## 5 · Components

For each, the **anatomy** describes the layer structure, **variants** are
the things worth exposing as Figma component properties, and **states**
are Figma variants for interactive behavior. Anchor every fill/stroke to
a Semantic variable so light/dark works automatically.

### 5.1 Button

The site uses two pill buttons.

**Primary — "See the work" / "Send message" / "Enter"**

- Auto-layout: horizontal, gap 8, padding 12 × 24 (`py-3 px-6`).
- Corner radius: full (999).
- Fill: `accent/bg`. Text color: `accent/fg`. Text: 14 / 20, Medium.
- Hover: 80% opacity (`hover:opacity-80`).
- Disabled: 50% opacity, no hover.
- Trailing arrow `→` as a separate text node, color `accent/fg`,
  `aria-hidden="true"` in code (decorative).

**Secondary — "Get in touch"**

- Same metrics, but transparent fill, 1 px stroke `border/strong`, text
  color `fg/primary`.
- Hover: stroke becomes `fg/primary` (`hover:border-neutral-950
  dark:hover:border-white`).

**Variants to expose:**

- `variant`: `primary` | `secondary`
- `size`: `md` (only size in use)
- `state`: `default` | `hover` | `disabled`
- `trailingIcon`: `none` | `arrow`

Reference: `src/app/(main)/page.tsx:55-59` (primary), `:86-92` (secondary).

### 5.2 Text input

Used in Contact form (text, email, textarea) and Gate (password).

- Auto-layout vertical, gap 8.
- Label: 14 / 20, Regular, color `fg/secondary`. The label sits *above*
  the input; not floating.
- Input field: padding 12 × 16 (`py-3 px-4`), fill `bg/subtle`, 1 px
  stroke `border/default`, radius 8.
- Placeholder text: 14 / 20, color `fg/secondary` (placeholder uses the
  same neutral-500/400 tone).
- Typed text: 14 / 20, color `fg/primary`.
- Focus: stroke changes to `border/strong` (neutral-400/600).
- Textarea variant: 6 rows ≈ 144 px height, `resize-none`, same paddings.

**Variants to expose:**

- `type`: `text` | `email` | `password` | `textarea`
- `state`: `default` | `hover` | `focus` | `error` | `disabled`
- `hasLabel`: boolean
- `error`: boolean

Reference: `src/app/(main)/contact/page.tsx:7` (the `inputClass` constant).

### 5.3 Tag pill

Used on case list rows and case detail header.

- Auto-layout horizontal, padding 2 × 8 (`px-2 py-0.5`).
- 1 px stroke `border/default`, radius full.
- Text: 12 / 16, Regular, color `fg/secondary`.

Reference: `src/app/(main)/cases/page.tsx:50-52`.

### 5.4 Theme toggle

A 32 × 32 circular icon button.

- Frame 32 × 32, radius full, transparent fill by default.
- Hover fill: `bg/subtle`.
- Icon: 16 × 16, stroked path (Lucide-style sun + moon). Stroke color
  `fg/primary`, stroke width 2, round line caps/joins.
- The icon swaps based on resolved theme: **sun** shown when dark mode
  is active (click to go light), **moon** shown when light.

Icon paths (copy directly into Figma vector node):

```
Sun: circle cx=12 cy=12 r=4; rays at top/bottom/left/right + 4 diagonals.
Moon: M 12 3 a 6 6 0 0 0 9 9 a 9 9 0 1 1 -9 -9 Z
```

Reference: `src/components/ThemeToggle.tsx`.

### 5.5 Nav (page header)

- Fixed top, full width, 24 px horizontal padding inside a `max-w-7xl`
  container, 24 px vertical padding (`py-6`).
- Auto-layout horizontal, space-between.
- **Left:** logo (square 58 × 58, `bg/canvas`-color appropriate variant).
- **Right:** horizontal stack — `Work` link, `Contact` link, theme
  toggle. Gap 24. Link text 14, Regular, color `fg/primary`. Hover:
  60% opacity.
- States: `default` (transparent background) and `scrolled` (after
  20 px scroll — fill becomes `bg/canvas` with 80% opacity + 12 px
  backdrop blur).

Recommend a `Nav` component with a `scrolled` boolean variant.

Reference: `src/components/Nav.tsx`.

### 5.6 Service card (homepage grid item)

- Auto-layout vertical, padding 32 all sides.
- Items: icon (32 × 32) → title (`text-lg` SemiBold) → description
  (`text-sm`, color `fg/secondary`, `leading-relaxed` ≈ 24 / 17).
- Gap from icon → title: 16 (`mb-4`); title → desc: 12 (`mb-3`).
- 1 px **left** border `border/default` on every card except the first
  in each row (achieved with `divide-x` on the grid). In Figma:
  expose `showLeftBorder` as a property and toggle on instances 2-6.
- Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

Reference: `src/app/(main)/page.tsx:67-78`.

### 5.7 Case row (Work list item)

A horizontally-stacked row with thumbnail + content.

- Outer wrapper: full width, fill `bg/surface`, 32 px padding all sides.
- Hover: fill becomes `bg/subtle`.
- Auto-layout horizontal at `sm` and up (640+); vertical on mobile.
  Gap 32.
- **Left:** cover image, 256 × 144 (16:9 aspect), radius 4 (`rounded`),
  overflow hidden. On hover the image scales to 1.05 with a 500 ms
  transition — replicate as a hover variant.
- **Right:** content column, vertically centered.
  - Optional tags row (Tag pills, gap 8, `mb-3`).
  - Title `text-xl` SemiBold, color `fg/primary`, `mb-1`.
  - Meta line: client + year (separated by `·`), `text-sm`, color
    `fg/secondary`, `mb-3`.
  - Excerpt: `text-sm`, color `fg/secondary`, `leading-relaxed`,
    `line-clamp-2`.
- Rows are separated by a 1 px `border/default` (achieved with `gap-px`
  on a `bg-neutral-200/-800` parent in code; in Figma just draw a 1 px
  rule between rows or use auto-layout dividers).

Reference: `src/app/(main)/cases/page.tsx:33-62`.

### 5.8 Hero image block

- Aspect ~ 1280 × 560 desktop (`h-140` ≈ 560 px), 1280 × 400 mobile
  (`h-100` ≈ 400 px).
- **Radius:** top-left 32, bottom-right 32, others 0. This is the
  signature shape.
- Fill: image with `object-cover`.
- Background placeholder (before image loads): `bg/subtle`.

Reference: `src/app/(main)/page.tsx:36-45`.

---

## 6 · Screens

Build each as a desktop frame (1440 × auto) on the **📱 Screens** page
(currently named `Pages` — rename it). For each, also duplicate into a
Dark-mode variant by setting the frame's Semantic mode to `Dark`.

### 6.1 Home — `/`

```
┌─ Nav (fixed)
│
├─ Hero section · max-w-7xl, mt-30 (120 px), gap-12
│   ├─ Hero image block (signature corners)
│   └─ Hero copy column (max-w-4xl)
│       ├─ H1 — text-5xl/7xl/8xl, 2 lines, whitespace-pre-line
│       ├─ Lead paragraph — text-lg/xl, max-w-xl, color fg/secondary
│       └─ Primary button "See the work →"
│
├─ Services section · py-24, border-t border/default
│   ├─ Eyebrow "SERVICES" — text-xs uppercase tracking-widest,
│   │   color fg/secondary, mb-16
│   └─ Grid (1/2/3 cols) — Service cards with divide-x borders
│
└─ CTA section · py-24, border-t border/default
    ├─ H2 "Got a project in mind?" (left)
    └─ Secondary button "Get in touch →" (right)
```

Defaults pulled from code (used when Sanity is empty):

- Hero image: `/kantet-hero.jpg`
- Hero title: `"Design & development\nthat moves people."`
- Hero description: `"Kantet is an independent agency building web
  experiences that combine sharp design with solid engineering."`

Reference: `src/app/(main)/page.tsx`.

### 6.2 Work list — `/cases`

```
┌─ Nav (fixed)
└─ Main · max-w-7xl, pt-24 (96), px-6, pb-24
    ├─ Header — H1 "Work" (text-4xl/6xl), mb-16
    └─ Case rows list (or empty state)
        ├─ Empty: "No cases yet — check back soon." (text-sm, fg/secondary)
        └─ Or: list of Case rows separated by 1 px border/default rules
```

Reference: `src/app/(main)/cases/page.tsx`.

### 6.3 Case detail — `/cases/[slug]`

```
┌─ Nav (fixed)
└─ Main · pt-24, pb-24
    ├─ Container · max-w-7xl, px-6, mb-12
    │   └─ "← Back to work" link, text-sm, color fg/secondary
    │
    ├─ Cover image · full-bleed, aspect-video, max-h 70vh, mb-16
    │
    └─ Container · max-w-4xl, px-6
        ├─ Header · mb-16
        │   ├─ Tags row (Tag pills, gap-2, mb-4)
        │   ├─ H1 — text-4xl/6xl, mb-4
        │   └─ Meta line: client · year · "Visit site →"
        │       (gap-6, text-sm, color fg/secondary,
        │        link uses fg/primary on hover)
        └─ Body — PortableText prose (Sanity rich text)
```

Reference: `src/app/(main)/cases/[slug]/page.tsx`.

### 6.4 Contact — `/contact`

```
┌─ Nav (fixed)
└─ Main · max-w-7xl, pt-24, pb-24, px-6
    └─ Column · max-w-2xl
        ├─ Header · mb-16
        │   ├─ H1 — text-4xl/6xl "Let's talk." (mb-6)
        │   └─ Lead paragraph (color fg/secondary)
        │
        ├─ Form · gap-6, OR success state ("Message sent — I'll be in touch soon.")
        │   ├─ Name field (Text input with label)
        │   ├─ Email field (Text input with label)
        │   ├─ Message textarea (6 rows)
        │   ├─ Error message (text-sm, color danger/fg) — conditional
        │   └─ Primary button "Send message" (loading: "Sending…", disabled)
        │
        └─ Footer block · mt-16, pt-16, border-t border/default
            ├─ "Prefer email?" (text-sm, color fg/secondary, mb-2)
            └─ mailto link (underline, fg/primary, text-sm)
```

States to design:

- `idle` — default form
- `loading` — submit button shows "Sending…", disabled 50% opacity
- `success` — form replaced by success message
- `error` — error message shown above submit button

Reference: `src/app/(main)/contact/page.tsx`.

### 6.5 Gate — `/gate`

A centered single-card password screen.

```
└─ Main · min-h-svh, flex center, px-6
    └─ Card · max-w-sm
        ├─ H2 "Coming soon" (text-2xl SemiBold, mb-2)
        ├─ Caption (text-sm, color fg/secondary, mb-8)
        └─ Form · gap-4
            ├─ Password input (autoFocus)
            ├─ Error: "Incorrect password." (text-sm danger/fg) — conditional
            └─ Primary button "Enter"
```

States: `idle` and `error`.

Reference: `src/app/gate/page.tsx`.

---

## 7 · Icons

The only inline icons are the sun/moon in the theme toggle and arrows
(`→`) inside CTAs. Arrows are plain Unicode characters set in the button's
text node — no icon asset needed. Sun/moon are inline SVG paths described
in §5.4.

If you add icons later, match Lucide React's stroke style: 24 × 24
viewbox, 2 px stroke, round caps/joins, currentColor stroke (no fill).

---

## 8 · Imagery

- `/public/kantet-hero.jpg` — hero image (used when Sanity hasn't been
  populated). Treat as object-cover inside the signature shape.
- `/public/kantet-logo-square-black.svg` + `-square-white.svg` — 58 × 58
  square logos for the nav (one shown per theme via `dark:hidden` /
  `hidden dark:block`).
- `/public/kantet-logo-black.svg` + `-white.svg` — wider lockups.
- `/public/kantet-logo-black-corner.svg` + `-white-corner.svg` — variants
  with the signature corner shape baked in.

Drop these into the `🖼 Assets` page as a starter library so designers
have them at hand.

---

## 9 · Suggested page layout in this Figma file

Given the Starter plan's 3-page cap, suggested mapping:

- `Pages` → **`📱 Screens`** — every screen frame (5 × 2 modes = 10 frames).
- `Playgroud` → **`🎨 Foundations & Components`** — top half: type scale,
  color swatches, radii, spacing samples. Bottom half: component sets.
- `Assets` → **`🖼 Assets`** — logo SVGs, hero JPG, any reference imagery.

---

## 10 · Code references

For anything in this document that needs deeper inspection:

| Concern | File |
| --- | --- |
| Theme provider / default theme | `src/components/ThemeProvider.tsx` |
| Nav (with scroll state) | `src/components/Nav.tsx` |
| Theme toggle (sun/moon SVGs) | `src/components/ThemeToggle.tsx` |
| Home page | `src/app/(main)/page.tsx` |
| Cases list | `src/app/(main)/cases/page.tsx` |
| Case detail | `src/app/(main)/cases/[slug]/page.tsx` |
| Contact form | `src/app/(main)/contact/page.tsx` |
| Gate (password) | `src/app/gate/page.tsx` |
| Root layout (fonts, body classes) | `src/app/layout.tsx` |
| Sanity schemas | `src/sanity/schemas/{case,service,homepage}.ts` |

---

## 11 · Open questions for design

These are worth pinning before iterating in Figma:

1. **Stone vs neutral.** `layout.tsx` uses `bg-white text-stone-950
   dark:bg-stone-950 dark:text-stone-100`, but every other component
   uses `neutral-*`. The Semantic variables in Figma standardize on
   neutral. Either re-align the layout to neutral, or split semantic
   colors per surface — decide which.
2. **Primary CTA color.** Currently pure black/white inversion. Worth
   exploring an accent color (the brand could afford one warm tone)?
3. **Hero copy variants.** Default copy is wrapped via `\n`. Do we want
   shorter/longer variants for SEO landing pages?
4. **Empty / loading states.** Only the Cases list and Contact form
   have them today. Consider adding to Case detail (e.g. when body is
   empty) and homepage Services (when none authored).
5. **Mobile nav.** No mobile-specific nav pattern yet — current nav
   shrinks fine to ~375 but a hamburger or stacked nav may be cleaner.
