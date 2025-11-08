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
1. `infonomic-base` - Reset/normalize styles
2. `infonomic-utilities` - Utility classes
3. `infonomic-theme` - Theme variables and colors
4. `infonomic-typography` - Typography styles
5. `infonomic-components` - Component styles
6. (unlayered) - Consumer app styles automatically win

**Why This Matters**:
- Enables per-component CSS bundling for tree-shaking (future: import only needed components)
- Consuming apps can override ANY style without `!important`
- Internal hierarchy lets theme variables override base, components override theme, etc.

**Theme System**:
- Theme variables in `src/styles/theme/theme.css`: `--background`, `--foreground`, `--text`, `--headings`
- `.dark` class on root element toggles to dark theme
- **`.not-dark` override**: Force light mode on dark backgrounds (see below)

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

2. **Dark Mode Override Pattern**: Use `:not(:where([class~="not-dark"], [class~="not-dark"] *))` to allow component-level theme override:
   ```css
   :global(.dark) {
     .primary:not(:where([class~="not-dark"], [class~="not-dark"] *)) {
       background-color: var(--primary-400);
     }
   }
   ```
   **Why**: Enables components to ignore parent theme (e.g., light component on dark background). Critical for focus rings and shadows that need correct background colors.

3. **Component Props**: Use `asChild` pattern with `@radix-ui/react-slot` for composition flexibility

4. **Type Safety**: Separate `@types` folders for shared interfaces; use `.js` extensions in imports per TS config

5. **Client Components**: Mark interactive React components with `'use client'` directive

6. **Exports**: Update both `src/react.ts` and `src/astro.js` when adding components

7. **CSS Modules**: Enable `cssModules: true` in `biome.json` CSS parser config

8. **Stories**: Write `.stories.tsx` files for each component variant pattern

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
- Theme system: `packages/uikit/src/styles/theme/theme.css`
- Monorepo tasks: `turbo.json`
