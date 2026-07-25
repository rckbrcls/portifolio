# Portfolio

Personal portfolio and blog for Erick Barcelos.

This repository is a single Next.js frontend application built to present professional work, independent projects, and long-form writing with a restrained editorial visual system. It is intentionally not a SaaS landing page, dashboard, CMS, backend service, or multi-package workspace.

## Project Status

The project is active and maintained as Erick Barcelos' public portfolio. The current implementation focuses on:

- a home page with an editorial introduction and personal narrative;
- a `/work` page that groups professional work, research, and independent projects;
- static project stories under `/work/[slug]`;
- a local-first MDX blog under `/blog` and `/blog/[slug]`;
- a shared portfolio shell with fixed navigation, footer links, theme controls, and browser translation hardening;
- a custom visual system documented in `DESIGN.md` and implemented through CSS variables in `src/pages/globals.css`.

## Technology Stack

| Area            | Technology                                                              |
| --------------- | ----------------------------------------------------------------------- |
| Framework       | Next.js 15 Pages Router                                                 |
| UI runtime      | React 18                                                                |
| Language        | TypeScript with `strict` mode                                           |
| Styling         | Tailwind CSS, `src/pages/globals.css`, shadcn-style primitives          |
| Design tokens   | `DESIGN.md`, `--portfolio-*` CSS variables                              |
| Blog content    | MDX files in `content/blog/*.mdx`                                       |
| MDX pipeline    | `@next/mdx`, `gray-matter`, `remark-gfm`, `remark-math`, `rehype-katex` |
| Theming         | `next-themes`, light/dark class-based themes                            |
| Typography      | Geist Pixel Square from `geist/font/pixel`                              |
| Observability   | Vercel Analytics and Vercel Speed Insights                              |
| Package manager | `pnpm` is preferred because `pnpm-lock.yaml` is present                 |

## Main Features

- **Editorial portfolio shell:** `PortfolioLayout` in `src/components/portfolio-shell.tsx` owns the shared navigation, document metadata, framed page layout, animated header avatar, theme menu, and footer links.
- **Professional work content:** `data/work/professional-work.ts` stores public-safe professional work entries rendered on `/work`.
- **Independent projects:** `data/projects/projects.ts` stores project descriptions, stack metadata, public links, source/package links, and status.
- **Work stories:** `content/work/*.mdx` stores long-form project narratives with canonical categories and at most one external action.
- **Local MDX blog:** `content/blog/*.mdx` stores posts, while `src/lib/blog.ts` validates frontmatter, filters drafts, and sorts posts by date.
- **MDX rendering:** `src/components/blog/mdx-components.tsx` customizes prose, links, images, tables, code blocks, math output, and the optional `<Figure />` component.
- **Theme system:** `next-themes` is mounted in `src/pages/_app.tsx`; portfolio tokens are defined in `src/pages/globals.css` and mirrored by Tailwind aliases in `tailwind.config.js`.
- **Browser translation hardening:** `src/pages/_document.tsx` sets `lang="en"`, `translate="no"`, and `meta name="google" content="notranslate"` to reduce DOM mutations from automatic translation tools.

## Project Structure

```text
portfolio/
+-- content/blog/                 # Local MDX posts and the blog template
+-- data/
|   +-- projects/projects.ts      # Independent project entries
|   +-- work/professional-work.ts # Professional work entries
|   +-- techStack.ts              # Shared tech-stack type values
+-- docs/
|   +-- architecture.md           # Technical architecture notes
|   +-- blog-authoring.md         # Blog writing and publishing guide
|   +-- deployment.md             # Deployment and production notes
+-- public/                       # Site identity, illustration, and blog assets
+-- src/
|   +-- components/               # Portfolio, blog, work, project, and UI components
|   +-- hooks/                    # Theme and browser interaction hooks
|   +-- interface/                # TypeScript interfaces used by content data
|   +-- lib/                      # Blog parsing, content composition, and utilities
|   +-- pages/                    # Next.js Pages Router routes and global CSS
+-- DESIGN.md                     # Canonical visual direction
+-- AGENTS.md                     # Repository-specific agent and product rules
+-- next.config.mjs               # Next.js, MDX, image, and bundle-analyzer config
+-- tailwind.config.js            # Tailwind theme and portfolio token aliases
+-- vercel.json                   # Vercel project-level config
+-- package.json                  # Scripts and dependencies
```

## Routes

| Route          | Source                      | Purpose                                               |
| -------------- | --------------------------- | ----------------------------------------------------- |
| `/`            | `src/pages/index.tsx`       | Home page with illustration and personal narrative    |
| `/work`        | `src/pages/work.tsx`        | Full work index for professional and independent work |
| `/work/[slug]` | `src/pages/work/[slug].tsx` | Static work story generated from local MDX            |
| `/blog`        | `src/pages/blog/index.tsx`  | Blog index generated from published MDX posts         |
| `/blog/[slug]` | `src/pages/blog/[slug].tsx` | Static blog post page for each published MDX file     |

There are no `pages/api` routes in the current codebase.

## Prerequisites

- Node.js `v22.2.0`, as declared in `.nvmrc`.
- `pnpm`, because this repository includes `pnpm-lock.yaml`.

## Installation

```bash
pnpm install
```

## Environment Configuration

The only environment variable identified in the current codebase is optional:

```bash
ANALYZE=false
```

It is documented in `.env.example` and controls bundle analyzer activation through `next.config.mjs`.

No required database URL, API key, authentication secret, or storage secret was identified in the current codebase.

## Available Scripts

These scripts are defined in `package.json`.

| Script          | Command              | Notes                                                                                                                             |
| --------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `dev`           | `pnpm dev`           | Starts the Next.js development server after removing `./.next`.                                                                   |
| `build`         | `pnpm build`         | Runs the production Next.js build.                                                                                                |
| `build:analyze` | `pnpm build:analyze` | Runs the configured bundle-analysis build path when `ANALYZE=true`. The script currently delegates to `npm run build` internally. |
| `start`         | `pnpm start`         | Starts the production Next.js server after a successful build.                                                                    |
| `lint`          | `pnpm lint`          | Runs the lint command currently defined as `next lint`.                                                                           |

Agent note: repository instructions currently forbid running `dev`, `start`, or `build` commands in this environment. The commands are documented here because they are part of the project workflow.

## Content Workflow

### Add Or Update Professional Work

Edit `data/work/professional-work.ts`.

Each entry follows `IProfessionalWorkItem` from `src/interface/IProfessionalWorkItem.ts` and is rendered through `src/components/professional-work-card.tsx`.

Use this dataset for work that can be publicly described without exposing confidential implementation details. Keep descriptions concrete, short, and safe.

### Add Or Update Independent Projects

Edit `data/projects/projects.ts`.

Each project follows `IProject` from `src/interface/IProject.ts` and can include:

- `slug`, `name`, `description`, and `status`;
- `techStack` values from `data/techStack.ts`;
- a public `link`, `gitLink`, or `npmUrl`.

Featured project order is controlled by `featuredProjectSlugs` in `src/lib/portfolio-content.ts`.

Long-form work stories live in `content/work/*.mdx`. Their `category` must be
`professional`, `research`, or `independent`. A story may expose one external
`action` with type `project` or `source`; the interface derives the visible
label from that type.

### Add Or Update Blog Posts

Create or edit `.mdx` files in `content/blog/`.

Use `content/blog/_template.mdx` as the starting point. Files beginning with `_` are intentionally ignored by the blog loader.

Required frontmatter:

```yaml
title: "Post title"
summary: "One clear sentence explaining the post."
publishedAt: "2026-04-22"
tags:
  - Engineering
draft: false
```

Optional frontmatter:

```yaml
coverImage: "/images/blog/my-post/cover.svg"
```

See `docs/blog-authoring.md` for the full writing guide.

## Architecture Notes

The application uses static generation for public content pages:

- `src/pages/work/[slug].tsx` renders one route per local work story.
- `src/pages/blog/index.tsx` reads all published blog posts with `getAllBlogPosts`.
- `src/pages/blog/[slug].tsx` uses `getStaticPaths` and `getStaticProps` to render one route per published MDX post.

The blog metadata parser lives in `src/lib/blog.ts`. The MDX component modules are resolved in `src/lib/blog-content.ts` with `require.context`.

For more detail, see `docs/architecture.md`.

## Deployment

The repository is Vercel-oriented:

- `@vercel/analytics` and `@vercel/speed-insights` are mounted in `src/pages/_app.tsx`.
- `vercel.json` is present and currently sets `git.deploymentEnabled` to `false`.
- No required production secrets were identified.

See `docs/deployment.md` for deployment notes and current limitations.

## Testing And Validation

No test runner, test files, or dedicated testing configuration were identified in the current codebase.

Useful static checks for documentation and small code changes:

```bash
git diff --check
rg "some text to verify"
```

The repository defines `pnpm lint`, but no dedicated test script is currently present.

## Design Direction

`DESIGN.md` is the canonical visual reference. New UI work should follow its current "Quiet Techno Swiss" direction:

- neutral white/light-gray and black/charcoal bases;
- restrained accent usage;
- editorial structure over dashboard density;
- opaque surfaces by default;
- strong typography, disciplined spacing, and limited decorative effects.

The implementation surface for that system is primarily `src/pages/globals.css`, `tailwind.config.js`, `components.json`, and the shared shell/components under `src/components/`.

## Known Limitations

- No API routes are currently implemented.
- No database, ORM, migrations, or persistent backend storage are currently present.
- No authentication or authorization system is currently present.
- No test suite is currently configured.
- Deployment is Vercel-oriented, but the exact production release process is not fully documented in the codebase.
- `vercel.json` currently disables Git deployments.

## License

No license file is currently present.
