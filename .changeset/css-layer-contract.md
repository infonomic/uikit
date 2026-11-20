---
"@infonomic/uikit": minor
---

Enforce the CSS layer contract: a Tailwind utility applied directly to an
element overrides ordinary kit component, typography and theme declarations for
the same property. Every kit stylesheet now reserves the full order, lowest to
highest precedence:

`base, infonomic-base, theme, infonomic-theme, infonomic-functional,
infonomic-typography, components, infonomic-components, overrides,
infonomic-utilities, utilities`

Add the React-free `@infonomic/uikit/css-layers` entry, exporting
`INFONOMIC_LAYER_ORDER` (render it first in `<head>`) and `infonomicLayerOrder()`
(a PostCSS plugin that prepends the order to every host stylesheet). `postcss`
is an optional peer dependency. Layer the previously unlayered `fade-in-lift`
and reference `loaders` styles.

This changes precedence for existing hosts:

- Kit utilities now rank above kit theme, typography and components; before,
  they ranked below all three.
- `infonomic-theme` now ranks below `infonomic-functional`.
- Kit typography tokens (`--font-sans`, `--font-serif`, `--font-display`,
  `--font-mono` from `typography.css`) now beat the same names set in Tailwind
  `@theme`. Set them in `@layer overrides` instead.
- A new host `overrides` slot sits above kit components and below kit and
  Tailwind utilities, for brand tokens and kit restyles.

Unlayered host rules still beat everything. Move host CSS into `components` or
`overrides`, add both integrations, replace Tailwind's default
`@layer theme, base, components, utilities;` prelude with the full order, and
compare against a visual baseline. See "CSS cascade layers" and "Upgrading
existing hosts" in the README.
