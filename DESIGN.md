---
version: alpha
name: Quiet Techno Swiss
description: A restrained fusion of neo-swiss editorial clarity and techno brutalist precision across neutral white and black theme bases.
colors:
  light:
    primary: "#111111"
    secondary: "#5F5F5F"
    neutral: "#FFFFFF"
    surface: "#F7F7F7"
    surface-alt: "#EFEFEF"
    border: "#E3E3E3"
  dark:
    primary: "#F5F5F5"
    secondary: "#A3A3A3"
    neutral: "#000000"
    surface: "#0F0F0F"
    surface-alt: "#1A1A1A"
    border: "#262626"
  accent:
    tertiary: "#246BFD"
    highlight: "#DCE7FF"
    success: "#1F8F5F"
    warning: "#C58A12"
    danger: "#C94949"
typography:
  display-xl:
    fontFamily: Geist Pixel Square
    fontSize: 64px
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist Pixel Square
    fontSize: 40px
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Geist Pixel Square
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist Pixel Square
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist Pixel Square
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Geist Pixel Square
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-md:
    fontFamily: Geist Pixel Square
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Geist Pixel Square
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.12em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 18px
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  gutter: 24px
  margin: 32px
  maxWidth: 1152
components:
  button-primary:
    backgroundColor: "Theme primary or accent blue"
    textColor: "Theme surface contrast"
    borderColor: "Match fill"
    rounded: "{rounded.sm}"
    paddingX: "20px"
    paddingY: "12px"
  button-secondary:
    backgroundColor: "Theme surface"
    textColor: "Theme primary"
    borderColor: "Theme border"
    rounded: "{rounded.sm}"
    paddingX: "20px"
    paddingY: "12px"
  card-default:
    backgroundColor: "Theme surface"
    borderColor: "Theme border"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  input-default:
    backgroundColor: "Theme surface"
    textColor: "Theme primary"
    borderColor: "Theme border"
    rounded: "{rounded.sm}"
    paddingX: "16px"
    paddingY: "12px"
  badge-data:
    backgroundColor: "Theme surface alt"
    textColor: "Theme primary"
    borderColor: "Theme border"
    rounded: "{rounded.full}"
    paddingX: "10px"
    paddingY: "6px"
---

## Overview

A restrained blend of neo-swiss editorial order and techno brutalist system energy.

The interface should feel precise, modern, and designed for serious work, but never cold or visually overloaded. It should use a disciplined grid, strong typography, and visible structure, while keeping the screen breathable and calm. The mood is clean and intelligent first, technical second. Think editorial rigor with subtle operational DNA.

This system avoids the usual extremes of brutalism. It should not feel aggressive, noisy, glitchy, or crowded. It should also avoid feeling too soft, decorative, or startup-generic. The result should be calm, sharp, and slightly futuristic.

## Colors

The system uses neutral bases in both themes. Light mode is built from white and light gray. Dark mode is built from black and charcoal gray. Strong contrast is reserved for text, key frames, and primary actions. Color accents remain stable across both themes.

### Base Neutrals

- **Light Primary (#111111):** Main text and hard-contrast structure on white and light-gray surfaces.
- **Light Secondary (#5F5F5F):** Muted metadata, helper text, and low-priority structural copy in light mode.
- **Light Neutral (#FFFFFF):** Page background for the light theme. This should read as clean white, not warm paper.
- **Light Surface (#F7F7F7):** Quiet raised plane for cards, forms, panels, and grouped content in light mode.
- **Light Surface Alt (#EFEFEF):** Subtle control fill for chips, tables, inactive controls, and low-emphasis grouped UI in light mode.
- **Light Border (#E3E3E3):** Low-noise border for structure in light mode.
- **Dark Primary (#F5F5F5):** Main text and hard-contrast structure on black and charcoal surfaces.
- **Dark Secondary (#A3A3A3):** Muted metadata and secondary labels in dark mode.
- **Dark Neutral (#0D0D0D):** Near-black page background for the dark theme, kept slightly darker than the primary surface so floating borders and shadows remain visible.
- **Dark Surface (#0F0F0F):** Primary panel and card surface in dark mode.
- **Dark Surface Alt (#1A1A1A):** Secondary grouped fill for chips, inputs, muted controls, and low-emphasis UI in dark mode.
- **Dark Border (#262626):** Structural border for dark mode, subtle but still visible on black.

### Invariant Accent Colors

- **Tertiary (#246BFD):** Electric but controlled blue used as the single main accent for interaction, selection, and active system states.
- **Highlight (#DCE7FF):** Accent-derived wash for focus areas and restrained callouts. In dark mode, use the same blue family more sparingly.
- **Success (#1F8F5F), Warning (#C58A12), Danger (#C94949):** Semantic colors. Keep them stable across themes.

Use accent color intentionally. Most of the screen should be neutral, typographic, and structural. Color should guide action, not decorate the page.

## Opacity & Transparency

Opacity is implicitly `100%` everywhere in this system.

Do not use alpha-based colors, transparent fills, transparent borders, glass surfaces, backdrop blur, or opacity-driven reveal patterns as part of the default design language.

If transparency is ever needed, it must be explicitly requested for that specific task. Otherwise, every component, state, and motion treatment should stay fully opaque.

The floating-surface shadow is the only approved alpha-based exception. It may use low-opacity black solely inside `box-shadow`; its surfaces, borders, and highlights must remain fully opaque.

## Typography

Typography is the main source of identity. It should carry the elegance of neo-swiss systems while borrowing a slight instrument-panel attitude from techno brutalism.

- **Display, headline, and body styles:** Use Geist Pixel Square across the full interface. Hierarchy should come from size, weight, spacing, and layout rather than mixing multiple font families.
- **Label styles:** Use Geist Pixel Square for metadata, tags, section markers, tabs, KPI labels, timestamps, and compact technical UI. Labels may be uppercase when they help introduce a system-like tone.
- **Home narrative:** Keep the centered narrative within `max-w-5xl`, using a fluid `1.25rem` to `2.25rem` scale, `1.28` line height, and restrained negative tracking.

Type hierarchy should do most of the work. Avoid oversized decorative headings unless they anchor an important hero area. Prefer fewer type sizes used consistently over many expressive variations.

## Layout

The layout should follow a strict grid with generous whitespace and limited simultaneous focal points.

Use a borderless `1152px` (`max-w-6xl`) desktop content shell with consistent margins and gutters. Mobile layouts should stack cleanly without losing hierarchy.

Pages should feel sparse but intentional. Each screen should have one dominant goal, one support area, and a small number of clearly grouped secondary elements. Avoid dashboards that try to show everything at once.

Spacing should follow a disciplined 8px rhythm with 4px used only for fine adjustments. Sections need breathing room. Cards and modules should align hard to the grid. Asymmetry is allowed when it feels editorial and balanced, not chaotic.

Full-width dividers should be rare. Do not use horizontal rules as the default way to separate major sections. Prefer hierarchy through typography, spacing, alignment, and content framing first. When boundaries are still needed, prefer local grid structure or card edges over page-wide separator lines.

## Elevation & Depth

Depth should be subtle.

This system does not rely on heavy shadows, glass effects, transparent layering, or layered visual spectacle. Hierarchy should come primarily from contrast, borders, spacing, and containment.

Use very soft shadows only when needed to separate floating UI such as the primary navigation, Config menu, contact footer, command palettes, dropdowns, or sticky toolbars. The same floating treatment may appear temporarily on editorial list hover and keyboard focus states. Floating surfaces use a single outer border without inset highlight lines. Most cards should feel flat but precise, using white and gray contrast in light mode or black and charcoal contrast in dark mode rather than dramatic lift.

## Shapes

The shape language should be mostly rectilinear with small, controlled rounding.

Buttons, fields, cards, and panels should feel engineered, not playful. Prefer 4px to 8px radii for most components. Reserve the 12px large radius for deliberate floating surfaces such as the primary navigation, Config menu, contact footer, and interactive editorial-list states.

Avoid bubbly or overly rounded forms. Avoid jagged brutality too. The geometry should feel disciplined, confident, and quietly technical.

## Components

Components should merge editorial clarity with system framing.

- **Buttons:** Primary buttons use either the theme's strongest neutral fill or the accent blue, with high contrast text and compact, confident padding. Secondary buttons use theme surfaces with explicit borders.
- **Cards:** Cards and panels should be structured through white and light-gray contrast in light mode or black and charcoal contrast in dark mode. Use borders, padding, and typography to create hierarchy before resorting to color.
- **Standalone editorial cards:** Featured project cards should be whole-surface interactive blocks. Their base state must stay quiet and structural, and their hover/focus state should use a unified treatment: around `280ms`, slight upward lift, subtle scale, restrained accent wash, and accent emphasis on border plus title/action text.
- **Editorial lists:** Full work and writing indexes should read as typographic lists rather than connected card collections. Keep the resting state on the page background, remove collection frames, dividers, and cross motifs, and separate entries with disciplined whitespace. On hover or keyboard focus, reveal the floating-surface background, neutral border, 12px radius, and restrained shadow without lift or scale; use the accent only for the title, action, focus outline, and restrained directional motion.
- **Blog metadata:** Present post tags as compact uppercase text separated by `/` in both indexes and article headers. Do not frame editorial tags as badges.
- **Navigation:** Navigation should be minimal and crisp. The primary floating header and Config menu use a 12px radius, a single theme-specific neutral border, and a short soft shadow. Inside them, prefer line-based separators, strong active states, and clear tab markers over decorative fills.
- **Contact footer:** Keep contact links in one centered floating bar aligned to the content shell. Preserve subtle internal dividers, clip child states to the 12px outer radius, and stack links on narrow screens.
- **Section separation:** Use headlines, labels, whitespace, and editorial composition to signal shifts in content. Avoid stacking repeated divider lines throughout the page.
- **Tables and data blocks:** Keep them airy. Use subtle row dividers, restrained striping or alternate fills, and clear numeric alignment.
- **Inputs:** Inputs should feel clean and technical, with strong focus states using the tertiary accent or highlight wash.
- **Badges and labels:** These should evoke a subtle operational feel, but remain quiet. Use muted fills and compact uppercase labels rather than loud status pills.

Whenever a component choice is ambiguous, prefer the quieter option.

## Do's and Don'ts

### Do

- Use white and light-gray surfaces in light mode.
- Use black and charcoal surfaces in dark mode.
- Let typography and spacing lead the visual hierarchy.
- Keep the interface structured, grid-based, and intentional.
- Use one main accent color consistently.
- Make the product feel premium, technical, and calm.
- Allow a subtle sense of futurism through labels, data framing, and sharp composition.
- Use whitespace, alignment, and type hierarchy to separate editorial list entries.

### Don't

- Do not overload the screen with panels, floating widgets, or dense dashboards.
- Do not use multiple bright accent colors.
- Do not add cyberpunk glows, glitch textures, scanlines, or heavy techno clichés.
- Do not make the interface feel sterile corporate beige or generic AI SaaS.
- Do not let dark mode drift into navy, blue-gray, or decorative tinting on base surfaces.
- Do not use oversized shadows, glassmorphism, or ornamental gradients.
- Do not use transparent fills, alpha tokens, backdrop blur, or opacity-based hiding as a default styling tool.
- Do not round everything heavily.
- Do not rely on repeated divider lines to create section hierarchy across the site.
