# AGENTS.md

## Project Intent

This repository is a personal portfolio that must present real work with clarity, credibility, and strong editorial control.

The product goal is to show:

- professional work that can be publicly described,
- personal projects,
- a future blog that lives inside the same portfolio.

This is not a generic SaaS marketing site, not a dashboard, and not a visual playground for unrelated UI experiments.

## Global Rules

- Always respond to the user in Portuguese.
- Keep code, code comments, docs inside the app, metadata, and visible UI strings in English unless the user explicitly asks otherwise.
- Never run build commands.
- Never run dev or start commands.
- Make reasonable assumptions and execute directly instead of asking broad open-ended questions.

## Source Of Truth

- `DESIGN.md` is the canonical visual direction for this repository.
- If any existing page, component, or CSS conflicts with `DESIGN.md`, follow `DESIGN.md`.
- The current landing direction is the intended direction. Older surfaces that still use a different visual language are legacy.

## Product And Content Rules

- Prioritize real work over slogans.
- Every project entry should communicate concrete value, not vague positioning.
- When touching project content, prefer explicitly showing:
  - what the project is,
  - the stack,
  - the role or contribution,
  - the current status,
  - the relevant link when one exists.
- Professional and personal work should coexist in the same portfolio, but the tone must stay consistent across both.
- Avoid inflated claims, buzzwords, and generic startup copy.
- When describing employer or client work, keep the copy concrete but safe. Do not expose confidential implementation details.

## Work And Labs Narrative Style

- Write each Work or Labs article as one first-person story with four movements:
  1. establish the concrete situation or problem,
  2. clarify Erick's responsibility, intent, or constraint,
  3. explain the technical decisions, actions, and tradeoffs,
  4. close with the evidence-backed outcome, current status, and relevant limits.
- Use exactly four project-specific `##` headings by default. Never use `STAR`, `Situation`, `Task`, `Action`, or `Result` as public headings.
- Keep headings subtle and editorial. They should suggest the narrative movement without sounding like a case-study template.
- Sound like Erick explaining the work to another computer scientist: informal, direct, technically literate, curious, and precise.
- Keep each movement compact. Do not repeat the summary, turn the stack into prose, or create a new section for every implementation detail.
- Put technical depth inside the action-oriented movement. Preserve important formulas, architecture, and tradeoffs without adding unnecessary top-level sections.
- Describe outcomes with verified behavior, shipped scope, current state, or concrete learning. Use metrics only when they are supported and approved for publication.
- State limitations plainly. Do not turn missing evidence into promotional language or imply reliability, scale, adoption, or impact that has not been validated.
- Treat every Labs page as one continuous article. Do not split its narrative into separate Product and Engineering files or sections.

## Frontend Direction

- Preserve the portfolio as an editorial presentation surface.
- Prefer strong typography, disciplined spacing, clear hierarchy, and restrained composition.
- Prefer calm, premium, technical presentation over decorative novelty.
- Use accent color intentionally and sparingly.
- Keep the interface breathable. Do not turn pages into dense widget collections.

## Frontend Must Not

- Do not turn the portfolio into a generic AI-generated landing page.
- Do not introduce default SaaS aesthetics, dashboard chrome, or template-like sections.
- Do not expand glassmorphism-heavy, purple-heavy, or ornamental gradient-heavy patterns if they conflict with `DESIGN.md`.
- Do not rely on dramatic shadows, noisy effects, or decorative visuals to create hierarchy when typography, spacing, and structure can do the job.

## Legacy UI Policy

- Legacy surfaces using `Aurora`, glass effects, purple accents, or older decorative patterns are not the design source of truth.
- Those legacy surfaces may exist temporarily, but they must not define the direction of new work.
- When a legacy page or component is substantially touched, move it toward the `DESIGN.md` system instead of preserving the old style by default.
- Treat older pages such as the separate `about-me`, `contact`, and `projects` surfaces as legacy if they conflict with the current portfolio direction.

## Code Evolution Rules

- The repository currently uses the Next.js Pages Router. Do not assume an App Router migration unless the user explicitly asks for it.
- Prefer incremental modernization inside the current architecture over speculative rewrites.
- Do not reintroduce older patterns just because they still exist somewhere in the codebase.
- When making structural changes, reinforce the current direction instead of keeping parallel design systems alive.

## Blog Direction

- The blog must live inside this same portfolio.
- The default content location is `content/blog/*.mdx`.
- The default routes are `/blog` and `/blog/[slug]`.
- Blog posts must support:
  - normal prose,
  - images,
  - code blocks,
  - formulas.
- Author posts in `.mdx` by default.
- Keep blog authoring markdown-first. Only use JSX inside MDX when it materially improves the post.

## Blog Content Conventions

- Recommended base frontmatter:
  - `title`
  - `summary`
  - `publishedAt`
  - `tags`
  - `draft`
- Optional frontmatter:
  - `coverImage`
- Prefer local, versioned content stored in the repository over a CMS by default.
- The blog should feel like part of the same product, not like a bolted-on documentation subsite.

## Recommended Blog Stack

For the current repository state, the default recommendation is:

- `@next/mdx` for MDX integration with Next.js,
- `remark-gfm` for richer markdown features,
- `remark-math` plus `rehype-katex` for formulas,
- `gray-matter` for frontmatter and local metadata parsing.

Do not choose these by default for this repository unless the user explicitly asks for a different direction:

- `Nextra`: not the default because the current repository is on Pages Router and Nextra 4 is App Router-oriented.
- `Fumadocs`: not the default because it is better suited to a more structured content layer than this portfolio currently needs.

## References

- Next.js Pages Router: https://nextjs.org/docs/pages
- Next.js App Router: https://nextjs.org/docs/app
- Next.js MDX with Pages Router: https://nextjs.org/docs/pages/guides/mdx
- Nextra docs: https://nextra.site/docs
- Fumadocs MDX docs: https://www.fumadocs.dev/docs/mdx
- KaTeX auto-render docs: https://katex.org/docs/autorender
