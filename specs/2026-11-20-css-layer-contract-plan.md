# CSS layer contract (workstream A) — implementation plan

Spec: `~/Clients/OSU/Solutions/osu.modulus-learning.org/specs/2026-11-20-css-layer-contract-and-installation-theming.md` §2, §3.1, §3.3, §5.
Reference: bylinecms.dev commit `4bb26310` (`packages/ui`), ported with `byline-` → `infonomic-`.
Not ported: Byline's `byline-components.primitives/.cms` sublayers (spec D1 — Modulus uses its own `modulus-*` layers).
Temporary: remove once released.

## Order (§3.1)

```css
@layer base, infonomic-base, theme, infonomic-theme, infonomic-functional,
  infonomic-typography, components, infonomic-components, overrides,
  infonomic-utilities, utilities;
```

## Tasks

1. **Baseline first.** Build the kit and the `tanstack` and `html` demos at HEAD, then capture screenshots
   and the computed styles of every element (plus `::before`/`::after`) on `/`, `/buttons`, `/cards`, `/prose`
   and the html demo, in light and dark. Tooling lives in the session scratchpad (Playwright driving the
   system Chrome); it is not committed.
2. **`@infonomic/uikit/css-layers`** — `src/css-layers.ts`, React-free:
   `INFONOMIC_LAYER_ORDER: string` (the statement above) and `infonomicLayerOrder(): postcss.Plugin`
   (prepends the statement in `Once`). Add the `./css-layers` export, `postcss` as an optional peer and a dev
   dependency, and include the file in `tsconfig.build.json`.
3. **Preludes.** Every `src/**/*.css` opens with the full statement (before any `@import` or comment).
   Replaces the 37 six-layer and 8 four-layer variants and adds it to sheets that only had a block layer.
4. **Unlayered rules.** `styles/components/fade-in-lift.css` and `styles/components/loaders.css` (reference only,
   not imported) go into `@layer infonomic-components`. No allowlist entries are needed today.
5. **Guard** — `tests/css-layers.test.mjs` under `node --test` (`test`, `test:css-build` scripts):
   - every source sheet's first non-comment node is the full statement;
   - no unlayered ordinary declarations (descriptor at-rules exempt), no `!important`, no unlayered `@apply`;
   - `@scope` roots: no `:root`/`html`/leading `.dark` selector inside an `@scope` (port of `auditScopeRoots`);
   - the plugin establishes the order before imports, partial preludes and nested rules, and is idempotent;
   - `overrides` > `infonomic-components`, `infonomic-utilities` > `overrides`, `utilities` last;
   - the tanstack demo renders `<style>{INFONOMIC_LAYER_ORDER}</style>`-equivalent first in `<head>` and
     registers `infonomicLayerOrder()` in `vite.config.ts`;
   - build checks (`CSS_BUILD_CHECK=1`): the shipped JS has no React/PostCSS runtime import and matches the
     source; every `dist/**/*.css` (module CSS, bundled `styles/*.css`, `components-vanilla.css`) has
     first-appearance order equal to §3.1.
6. **Demo host.** tanstack: head statement in `index.html`, plugin in `vite.config.ts`, Tailwind prelude
   replaced with the full order. html/astro: replace any partial Tailwind prelude.
7. **Docs.** README sections: "CSS cascade layers", "Host integration", "Upgrading existing hosts".
8. **Changeset** — minor, with upgrade notes (kit utilities now above theme, typography and components;
   theme now below functional; unlayered host rules beat all kit CSS).
9. **Verify.** Guard + build checks pass; typecheck and lint pass; recapture and diff against the baseline.
   Any differences are explained (expected precedence change) or fixed.
