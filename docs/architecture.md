# Architecture

This repository is a single Next.js Pages Router frontend application. It renders Erick Barcelos' portfolio, Work index, Labs products, and local MDX blog without a backend API, database, authentication layer, or multi-package workspace.

## System Overview

```mermaid
flowchart TD
  A["src/pages/index.tsx"] --> S["PortfolioLayout"]
  W["src/pages/work.tsx"] --> S
  WD["src/pages/work/[slug].tsx"] --> S
  LA["src/pages/labs.tsx"] --> S
  LD["src/pages/labs/[slug].tsx"] --> S
  B["src/pages/blog/index.tsx"] --> S
  P["src/pages/blog/[slug].tsx"] --> S

  S --> C["Portfolio, Work, Labs, and blog components"]
  C --> D["data/projects, data/work, and data/labs"]
  WD --> WS["content/work/*.mdx"]
  LA --> LC["data/labs/labs.ts"]
  LD --> LC
  LD --> LM["content/labs/[slug]/*.mdx"]
  B --> L["src/lib/blog.ts"]
  P --> L
  L --> M["content/blog/*.mdx"]
  P --> R["src/lib/blog-content.ts"]
  R --> M

  T["DESIGN.md"] --> G["src/pages/globals.css"]
  G --> X["tailwind.config.js and shadcn-style UI primitives"]
  X --> C
```

## Application Type

- **Project type:** personal portfolio and blog.
- **Architecture size:** small to medium single frontend app.
- **Runtime:** Next.js with React.
- **Routing:** Pages Router under `src/pages`.
- **Content model:** local TypeScript data files plus local MDX posts.
- **Persistence:** no database or backend persistence is present.
- **API:** no `pages/api` routes are present.
- **Authentication:** no authentication or authorization system is present.

## Route Layer

| Route          | File                        | Data source                                                     |
| -------------- | --------------------------- | --------------------------------------------------------------- |
| `/`            | `src/pages/index.tsx`       | Static editorial biography                                      |
| `/work`        | `src/pages/work.tsx`        | `orderedProfessionalWork`, `orderedProjects`                    |
| `/work/[slug]` | `src/pages/work/[slug].tsx` | `getStaticPaths`, `getWorkStoryBySlug`, `getWorkStoryComponent` |
| `/labs`        | `src/pages/labs.tsx`        | `orderedLabProducts`                                            |
| `/labs/[slug]` | `src/pages/labs/[slug].tsx` | `getStaticPaths`, `getLabProductBySlug`, paired Labs MDX        |
| `/blog`        | `src/pages/blog/index.tsx`  | `getAllBlogPosts()`                                             |
| `/blog/[slug]` | `src/pages/blog/[slug].tsx` | `getStaticPaths`, `getBlogPostBySlug`, `getBlogPostComponent`   |

The public blog routes are statically generated from published MDX files. Draft posts are filtered out unless the parser is explicitly called with `includeDrafts: true`.

## Shared Shell

`src/components/portfolio-shell.tsx` is the main composition layer. It owns:

- page-level metadata through `next/head`;
- the fixed header and primary navigation;
- the animated avatar/greeting behavior;
- the theme configuration menu;
- the framed editorial page layout;
- the footer contact links;
- shared section and collection primitives: `PortfolioSection`, `PortfolioSectionBody`, `PortfolioCollection`, and `PortfolioPageIntro`.

Navigation and footer link data come from `src/lib/portfolio-content.ts`.

## Content And Data Flow

### Professional Work

Professional work is stored in `data/work/professional-work.ts` and typed by `src/interface/IProfessionalWorkItem.ts`.

The data is intentionally public-safe and concise. Rendering is handled by `src/components/professional-work-card.tsx`.

### Independent Projects

Independent projects are stored in `data/projects/projects.ts` and typed by `src/interface/IProject.ts`.

Project cards use helpers from `src/lib/portfolio-content.ts`:

- `getProjectPrimaryLink` chooses the public link, source link, or package link;
- `getProjectSummary` uses short featured summaries where available;
- `getProjectStackPreview` formats a compact stack preview.

`src/components/featured-project-card.tsx` renders text-first project cards.
Project media, floating previews, and galleries are intentionally not part of
the current Work presentation.

### Work Stories

Work stories live in `content/work/*.mdx`.

`src/lib/work-stories.ts` validates the shared metadata contract:

- `category` is limited to `professional`, `research`, or `independent`;
- `action` is optional and limited to one external `project` or `source` link;
- title, summary, role, period, status, and technologies remain required.

`src/lib/work-story-content.ts` uses `require.context` to load the matching MDX
component module for a slug.

### Labs Products

Labs products are stored in `data/labs/labs.ts` and typed by
`src/interface/ILabProduct.ts`. The catalog controls route generation, order,
product type, summary, technologies, and external actions.

Each catalog slug requires two local views:

- `content/labs/[slug]/product.mdx` for the default product presentation;
- `content/labs/[slug]/engineering.mdx` for optional technical depth.

`src/lib/lab-content.ts` resolves only catalog slugs and loads both MDX modules.
The detail page keeps the summary and actions above a Radix tabs interface whose
selection is synchronized with `#product` or `#engineering` without scrolling.
Labs media is limited to evidence-backed product demonstration and uses neutral
portfolio framing through `LabMediaGrid`.

### Blog Posts

Blog posts live in `content/blog/*.mdx`.

`src/lib/blog.ts` is the metadata source of truth:

- reads files from `content/blog`;
- ignores files whose names start with `_`;
- parses frontmatter with `gray-matter`;
- validates `title`, `summary`, `publishedAt`, `tags`, and `draft`;
- treats `coverImage` as optional;
- filters drafts from public routes;
- sorts posts by `publishedAt` descending.

`src/lib/blog-content.ts` uses `require.context` to load the matching MDX component module for a slug.

`src/components/blog/mdx-components.tsx` customizes rendering for prose, links, lists, blockquotes, tables, images, code blocks, and the optional `<Figure />` MDX component.

## Design And Theme Architecture

`DESIGN.md` is the visual source of truth. The implementation is concentrated in:

- `src/pages/globals.css` for `--portfolio-*` tokens, light/dark values, base styles, scrollbar styles, and portfolio CSS variables;
- `tailwind.config.js` for Tailwind aliases that expose portfolio tokens as utility classes;
- `components.json` for shadcn-style component configuration pointing to `src/pages/globals.css`;
- `src/pages/_app.tsx` for `ThemeProvider`, Geist Pixel Square, KaTeX CSS, Vercel Analytics, and Vercel Speed Insights;
- `src/pages/_document.tsx` for document language, favicon links, font variables, and browser translation hardening.

The theme model is class-based. `next-themes` toggles `light` and `dark` classes on the document root, while `src/pages/globals.css` changes the portfolio token values.

## External Services

The only external production integrations identified in the codebase are:

- Vercel Analytics via `@vercel/analytics/next`;
- Vercel Speed Insights via `@vercel/speed-insights/next`;
- public external links in project/contact data.

No external database, CMS, auth provider, payment provider, or API client is configured.

## Current Architectural Limitations

- There is no test suite or test script.
- Blog content is local-only and requires a code/content change to publish.
- There is no preview mode or draft route for unpublished posts.
- Deployment is Vercel-oriented, but the exact production release workflow is not fully identified in the current codebase.
