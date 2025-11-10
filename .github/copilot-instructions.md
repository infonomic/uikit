# UI Kit Copilot Instructions

## Project Overview

This is a **framework-agnostic UI component library** using **CSS Modules** for styling (not Tailwind). The monorepo contains:
- `packages/uikit` - Core component library (React + Astro)
- `apps/astro` - Astro demo app
- `apps/tanstack` - TanStack Router demo app

**Core Philosophy**: Components use CSS Modules to allow easy style overriding without `!important`. The library intentionally avoids Tailwind for component internals while remaining compatible with Tailwind-based consuming apps.

## Key Workflows

```bash
# Install and initial build
pnpm install && pnpm build

# Start all demo apps (parallel)
pnpm dev

# UIKit-specific commands
cd packages/uikit
pnpm storybook          # Component development
pnpm build              # Build for distribution
pnpm test               # Run Vitest tests
pnpm lint               # Biome linting
```

**Release Flow** (see `RELEASE-INSTRUCTIONS.md`):
1. `pnpm changeset` - Create changeset
2. GitHub Action auto-creates PR → merge → auto-publish to NPM
3. Manual: `pnpm version-packages` → `pnpm release:npm`

## Architecture Patterns

### Dual Export System
Components support **both React and Astro**:
- React: `src/react.ts` exports all components with `.js` extensions (TS requirement)
- Astro: `src/astro.js` exports select components as `.astro` files
- Consuming apps import via: `@infonomic/uikit/react` or `@infonomic/uikit/astro`

### Component Structure
Each component folder typically contains:
```
button/
├── @types/button.ts        # TypeScript interfaces
├── button.tsx              # React component
├── button.astro            # Astro variant (if supported)
├── button.module.css       # CSS Modules styling
├── button.stories.tsx      # Storybook stories
└── index.ts                # Barrel export
```

**Pattern**: Always import CSS modules as `styles` and use `cx()` from `classnames` for composition:
```tsx
import styles from './button.module.css'
import cx from 'classnames'

className={cx('button', intent, variant, styles.button, styles[variant], className)}
```

### CSS Architecture - CASCADE LAYERS (CRITICAL)

**CSS Cascade Layers are the foundation of style overridability.** CSS outside any layer automatically has higher specificity than CSS within layers - this is what allows consuming apps to easily override component styles without `!important`.

Every CSS module MUST include the layer preamble at the top:
```css
@layer infonomic-base, infonomic-utilities, infonomic-theme, infonomic-typography, infonomic-components;

@layer infonomic-components {
  /* component styles here */
}
```

**Layer Specificity Order** (lowest to highest):
1. `infonomic-base` - Reset/normalize styles, primitive tokens (colors, spacing)
2. `infonomic-utilities` - Utility classes
3. `infonomic-theme` - **Semantic tokens** and theme variables
4. `infonomic-typography` - Typography styles
5. `infonomic-components` - Component styles
6. (unlayered) - Consumer app styles automatically win

**Why This Matters**:
- Enables per-component CSS bundling for tree-shaking (future: import only needed components)
- Consuming apps can override ANY style without `!important`
- Internal hierarchy lets theme variables override base, components override theme, etc.

**Semantic Token System** (NEW):
- **Primitive tokens**: `src/styles/base/colors.css` - Base colors like `--primary-600`, `--red-500`
- **Semantic tokens**: `src/styles/theme/tokens.css` - Intent-based and surface tokens

**Intent Token Naming**: `element-intent-emphasis-state` (e.g., `--fill-primary-strong-hover`)
  - `element`: `fill` (backgrounds), `text` (foreground), `stroke` (borders), `ring` (focus), `gradient`
  - `intent`: `primary`, `secondary`, `noeffect`, `success`, `info`, `warning`, `danger`
  - `emphasis`: `strong`, `weak`, `weaker` (optional)
  - `state`: `hover`, `press`, `focus`, `disabled` (optional)

**Surface Token Naming**: `surface-type-state` (e.g., `--surface-item-hover`)
  - Used for: Dropdowns, selects, menus, tooltips, popovers, dialogs, command palettes
  - `surface-panel`: Container/viewport background (e.g., dropdown menu background)
  - `surface-panel-elevated`: Elevated panels with shadows (white in light, slightly lighter in dark)
  - `surface-panel-border`: Panel border color
  - `surface-item`: Individual item background (default transparent)
  - `surface-item-hover`: Item hover state background
  - `surface-item-active`: Item selected/active background
  - `surface-item-text`: Item text color (normal)
  - `surface-item-text-hover`: Item text color (hover)
  - `surface-item-text-active`: Item text color (active)
  - `surface-item-text-disabled`: Item text color (disabled)

- **Components reference semantic tokens**, not primitives (e.g., use `--fill-primary-strong` instead of `--primary-600`)
- **Use surface tokens** for any list-based interactive UI (dropdowns, menus, selects, command palettes)

**Theme System**:
- Theme variables in `src/styles/theme/theme.css`: `--background`, `--foreground`, `--text`, `--headings`
- Semantic tokens in `src/styles/theme/tokens.css` automatically switch between light/dark modes
- `.dark` class on root element toggles theme
- **`.not-dark` override**: Forces light mode tokens regardless of parent `.dark` class
- **Key benefit**: No need for `:not(:where([class~="not-dark"]...))` in component CSS when using semantic tokens

**Build**: LightningCSS bundles `styles.css` and `typography.css` separately

### Build System
- **rslib** (not tsup): Builds React components as ESM, `bundle: false` to let consuming frameworks handle bundling
- **Turbo**: Orchestrates monorepo tasks with caching
- **Biome**: Linting/formatting (100 char line width, single quotes, semicolons `asNeeded`)
- TypeScript: `nodenext` module resolution, `react-jsx`

## Development Conventions

1. **CSS Module Layer Preamble** (REQUIRED): Every `.module.css` file MUST start with the layer declaration:
   ```css
   @layer infonomic-base, infonomic-utilities, infonomic-theme, infonomic-typography, infonomic-components;
   ```
   This ensures correct cascade behavior when CSS is bundled. Wrap component styles in `@layer infonomic-components { }`.

2. **Semantic Token Usage**: Components should reference semantic tokens from `tokens.css`, not primitive colors:
   ```css
   /* GOOD - Uses semantic tokens */
   .primary {
     background-color: var(--fill-primary-strong);
     color: var(--text-on-primary);
   }
   
   /* AVOID - Direct primitive usage */
   .primary {
     background-color: var(--primary-600);
     color: white;
   }
   ```
   **Why**: Semantic tokens automatically handle light/dark/`.not-dark` switching at theme layer, eliminating verbose `:not(:where([class~="not-dark"]...))` selectors in component CSS.

3. **Legacy Dark Mode Override Pattern** (for non-token components): Use `:not(:where([class~="not-dark"], [class~="not-dark"] *))` when NOT using semantic tokens:
   ```css
   :global(.dark) {
     .element:not(:where([class~="not-dark"], [class~="not-dark"] *)) {
       background-color: var(--primary-400);
     }
   }
   ```
   **Note**: This pattern is only needed for intents that haven't been migrated to semantic tokens yet.

4. **Component Props**: Use `asChild` pattern with `@radix-ui/react-slot` for composition flexibility

5. **Type Safety**: Separate `@types` folders for shared interfaces; use `.js` extensions in imports per TS config

6. **Client Components**: Mark interactive React components with `'use client'` directive

7. **Exports**: Update both `src/react.ts` and `src/astro.js` when adding components

8. **CSS Modules**: Enable `cssModules: true` in `biome.json` CSS parser config

9. **Stories**: Write `.stories.tsx` files for each component variant pattern

## Common Gotchas

- **Missing Layer Preamble**: Forgetting `@layer` declaration at top of CSS modules breaks cascade hierarchy
- **Import Extensions**: React exports use `.js` extensions even for `.tsx` files (satisfies TS output requirements)
- **CSS Bundling**: CSS is emitted per-component, not bundled by rslib - consuming apps import `@infonomic/uikit/styles.css`. Future: per-component imports for tree-shaking.
- **Theme Override**: Use `.not-dark` class on components to force light mode in dark contexts (critical for focus rings/shadows)
- **Dark Mode Selector**: Always scope dark mode styles with `:not(:where([class~="not-dark"], [class~="not-dark"] *))` to respect override
- **Workspace Dependencies**: Package references use `workspace:*` protocol
- **Node Version**: Requires Node 18.20.2+ or 20.9.0+ (see root `package.json` engines)

## File References

- Component patterns: `packages/uikit/src/components/button/button.tsx`
- Export structure: `packages/uikit/src/react.ts`, `packages/uikit/src/astro.js`
- Build config: `packages/uikit/rslib.config.ts`
- CSS layers: `packages/uikit/src/styles/styles.css`
- Primitive tokens: `packages/uikit/src/styles/base/colors.css`, `packages/uikit/src/styles/base/vars.css`
- Semantic tokens: `packages/uikit/src/styles/theme/tokens.css`
- Theme system: `packages/uikit/src/styles/theme/theme.css`
- Monorepo tasks: `turbo.json`
