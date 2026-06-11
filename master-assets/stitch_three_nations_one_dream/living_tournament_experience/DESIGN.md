---
name: Living Tournament Experience
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c7c6cc'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#909096'
  outline-variant: '#46464c'
  surface-tint: '#c3c6d7'
  primary: '#c3c6d7'
  on-primary: '#2c303d'
  primary-container: '#0a0e1a'
  on-primary-container: '#777b8a'
  inverse-primary: '#5a5e6d'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#0e0e0e'
  on-tertiary-container: '#7d7b7a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dfe2f3'
  primary-fixed-dim: '#c3c6d7'
  on-primary-fixed: '#171b28'
  on-primary-fixed-variant: '#434654'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-hero:
    fontFamily: Bodoni Moda
    fontSize: 84px
    fontWeight: '800'
    lineHeight: 92px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  unit: 8px
---

## Brand & Style

The design system is engineered to evoke the prestige of a global championship through a **Premium Sports Cinematic** lens, blended with a **Modern Paper-Cut** aesthetic. It targets a global audience of passionate fans who expect an official, "money-is-no-object" digital destination.

The visual narrative relies on high-drama lighting and "Z-axis" depth. Content is treated like high-end editorial spreads: large-scale imagery of players and stadiums is frequently "cut out" from its background, overlapping typography and UI elements to create a tactile, multi-layered environment. The atmosphere is immersive, dark, and prestigious, utilizing the contrast between heavy shadows and shimmering gold accents to signify the pinnacle of sport.

## Colors

This is a **Dark Mode** first design system. The palette is designed to create a "theater" effect, where the interface recedes and the content (and Gold accents) shine.

- **Primary (Deep Navy):** Used for base surfaces and deep gradients to provide a richer alternative to pure black.
- **Midnight Black:** Reserved for absolute depth, background layers, and high-contrast cut-outs.
- **Gold:** The accent of champions. Used sparingly for calls-to-action, victory states, and premium highlights.
- **White:** Used strictly for legibility on body text and secondary UI icons.

Gradients should transition from #0A0E1A to #050505 with a subtle noise texture to mimic cinematic film grain.

## Typography

The typography strategy pits the "old world" prestige of high-contrast serifs against the "new world" efficiency of modern sans-serifs.

- **Headlines:** `Bodoni Moda` provides an editorial, high-fashion feel. Use "Display-Hero" for player names and major tournament stages. Headlines should often be layered behind player cut-outs to reinforce the paper-cut depth.
- **Body:** `Hanken Grotesk` offers a clean, technical, and highly legible experience reminiscent of high-end athletic branding.
- **Data & Labels:** `JetBrains Mono` is used for technical tournament data (match times, coordinates, stadium capacities) to provide a modern, precision-engineered aesthetic.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to maintain an editorial feel. 

- **Desktop:** 12-column grid. Utilize asymmetrical compositions where imagery breaks the grid, extending into margins.
- **Tablet:** 8-column grid. Margins reduce to 40px.
- **Mobile:** 4-column grid. Focus on vertical storytelling with full-width cinematic imagery.

Spacing is governed by an 8px base unit. Use larger "Oxygen" gaps (80px+) between major sections to emphasize the premium nature of the tournament experience.

## Elevation & Depth

Depth is achieved through three specific layers:

1.  **The Canvas (Level 0):** Midnight Black with subtle spotlight gradients.
2.  **The Narrative (Level 1):** Large-scale player cut-outs and stadium photography. These elements should have soft, directional shadows to feel like they are floating just above the canvas.
3.  **The Interface (Level 2):** Floating glass panels with a `backdrop-filter: blur(20px)` and a 1px Gold or White semi-transparent border. 

Use "Paper-Cut" shadows—sharp, short-offset shadows—on elements that are meant to feel like physical stickers or clippings applied to the layout.

## Shapes

The design system uses a "Soft" approach to roundedness to maintain a balance between aggressive sportiness and premium elegance.

- **Cards & Panels:** 0.25rem (4px) or 0.5rem (8px) radius. Sharp enough to feel precise, soft enough to feel modern.
- **Buttons:** Hard edges (0px) are permitted for high-impact CTA buttons to increase the "Brutalist-Premium" feel.
- **Image Cut-outs:** Should feature "torn paper" edge effects or clean, mask-like silhouettes rather than standard rounded rectangles.

## Components

- **Floating Glass Navigation:** A pill-shaped bar docked at the bottom of the screen. Material: 40% opacity Deep Navy with a 20px blur and 1px Gold top border.
- **Match Cards:** Use a background image of the stadium with a "Midnight Black" gradient overlay. Scores are displayed in large Gold `Bodoni Moda`.
- **Cinematic Timeline:** A vertical or horizontal line in 20% White. Key events are marked with Gold diamond-shaped pips.
- **Primary Buttons:** Solid Gold background with Black `Hanken Grotesk` Bold text. Hover state includes a glow effect (outer shadow) in Gold.
- **Input Fields:** Bottom-border only (1px White), moving to Gold on focus. Label text in `JetBrains Mono`.
- **Chips/Badges:** Outlined in 1px White, used for "Live" or "Final" status, with a small pulsing dot for active matches.