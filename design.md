# IntraNest design system

Genre: modern-minimal. Theme: Cobalt, preserving the IntraNest blue brand.
Audience: teams sharing links, files, and conversations on their intranet.

## Layout
Marketing: product-led split composition with a dark navy introductory surface.
Application: side navigation and a white working surface; navigation becomes a horizontal rail on small screens.
Extension: slim header without connection chrome, compact searchable link rows, persistent actions.
Documents: reading column with white content surface and clear section rhythm.

## Tokens
The runtime source is assets/tokens.css (extension) and public/assets/tokens.css (web).
Root tokens.css is the portable export. Both products use the same palette and spacing.
Display: Avenir Next / Segoe UI / system fallback, roman. Body: native system sans.
No remote fonts or image requests. Blue accent for primary actions; green for connected status.
Navy surfaces use on-dark text and a separate muted text token.

## Interaction
36–40px desktop controls; 44px minimum on coarse pointers, visible keyboard focus, native dialog, full loading/error/success states.
Only transform and opacity motion; reduced-motion support. Search filters actual links locally.
Both English and Korean labels belong to the existing localization dictionaries.

## Implementation
Shared controls in components.css; existing stylesheets remain intact with a redesign layer.
No route, API, permission, or storage-schema changes. Marketing examples are explicitly labeled.

## Release density refresh · 2026-10-13
Wordmark: 500 weight. Display: 550–560 weight. Compact workbench with 180px side navigation, 62px link cards and 48px popup rows. No server address or realtime status chrome. Guide: three numbered steps, copyable installer, contextual network note, native help disclosures. Short surface transitions use transform and opacity; reduced motion disables reveals.

## File upload flow
File history uses a square floating upload icon at bottom right. Upload opens a separate screen with drag/drop or native multiple file selection, a scrollable removable queue, and a bottom submit button. Successful uploads return to refreshed history; failed files stay queued for retry. Upload concurrency remains bounded at three requests.
