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

**Pattern**: Always import CSS modules as `styles` and use `cx()` from `clsx` for composition:
```tsx
import styles from './button.module.css'
import cx from 'clsx'

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
2. `infonomic-functional` - **Semantic tokens** (intent, surface, field, text-role) — this is the semantic source of truth
3. `infonomic-utilities` - Utility classes
4. `infonomic-theme` - Document-level defaults and browser behaviour (autofill, scrollbars, element resets). Despite the name, semantic tokens live in `functional`, not here.
5. `infonomic-typography` - Typography styles
6. `infonomic-components` - Component styles
7. (unlayered) - Consumer app styles automatically win

**Why This Matters**:
- Enables per-component CSS bundling for tree-shaking (future: import only needed components)
- Consuming apps can override ANY style without `!important`
- Internal hierarchy lets functional tokens override base, components override functional, etc.

**Semantic Token System**:
- **Primitive tokens**: `src/styles/base/colors.css` - Base colors like `--primary-600`, `--red-500`
- **Semantic tokens**: `src/styles/functional/` - Intent, surface, field, and text-role tokens. This is the single source of truth for semantic styling. Each file (`colors.css`, `surfaces.css`, `typography.css`, `borders.css`) defines tokens in `:root`, `.dark`, and `.not-dark` scopes.

**Intent Token Naming**: `element-intent-emphasis-state` (e.g., `--fill-primary-strong-hover`)
  - `element`: `fill` (backgrounds), `text-on` (foreground on a fill), `text` (foreground with no fill context), `stroke` (borders), `ring` (focus rings), `gradient`
  - `intent`: `primary`, `secondary`, `noeffect`, `success`, `info`, `warning`, `danger`
  - `emphasis`: `strong`, `weak`, `outlined`, `text` (optional)
  - `state`: `hover`, `disabled` (optional)

**Canonical, not flattened**: Always use the full emphasis + state form. For the disabled state of a primary strong surface, use `--text-on-primary-strong-disabled`, not `--text-on-primary-disabled`. There is no `accent` intent family — the `--accent` variable is a raw brand palette token, not a surface token; prefer `--fill-primary-*` or `--surface-subtle-*` instead.

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
- **Generic role tokens** (for components that need a role without an intent): `--focus-ring`, `--field-border`, `--field-border-hover`, `--field-border-invalid`, `--field-ring`, `--field-ring-invalid`, `--surface-subtle`, `--surface-subtle-hover`, `--surface-subtle-active`, `--text-subtle`, `--text-placeholder`.

**Functional / Semantic Tokens**:
- Functional / Semantic tokens in `src/styles/functional` automatically switch between light/dark modes
- `.dark` class on root element toggles theme
- **`.not-dark` override**: Forces light mode tokens regardless of parent `.dark` class
- **Key benefit**: No need for `:not(:where([class~="not-dark"]...))` in component CSS when using semantic tokens

**ShadCN Compatibility (optional)**:
- `src/styles/functional/shadcn-compat.css` exposes a `--shadcn-*` alias namespace mapping the uikit's semantic tokens onto ShadCN-style token names. It is imported last from `functional.css` so it always sees the current mode's values.
- Consumer Tailwind apps can opt in by registering a second `@theme` block against these aliases (see root `README.md` and `apps/tanstack/src/ui/styles/tailwind-shadcn.css`).
- Do **not** use `--shadcn-*` inside uikit components. It is strictly a translation layer for AI-generated markup in consumer apps. The uikit's own components continue to read from the core semantic tokens.

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

2. **Semantic Token Usage**: Components should reference semantic tokens from `src/styles/functional/`, not primitive colors. Always use the canonical full form — never a flattened alias:
   ```css
   /* GOOD - canonical semantic tokens */
   .primary {
     background-color: var(--fill-primary-strong);
     color: var(--text-on-primary-strong);
   }

   /* AVOID - flattened alias (does not exist) */
   .primary {
     background-color: var(--fill-primary-strong);
     color: var(--text-on-primary);
   }

   /* AVOID - direct primitive usage */
   .primary {
     background-color: var(--primary-600);
     color: white;
   }
   ```
   **Why**: Semantic tokens automatically handle light/dark/`.not-dark` switching in the `infonomic-functional` layer, eliminating verbose `:not(:where([class~="not-dark"]...))` selectors in component CSS. Flattened aliases like `--text-on-primary` or `--fill-accent-strong` are not defined anywhere and silently fall back to the property's initial value.

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
- Primitive tokens: `packages/uikit/src/styles/base/`
- Semantic tokens (source of truth): `packages/uikit/src/styles/functional/colors.css`, `surfaces.css`, `typography.css`, `borders.css`
- ShadCN compatibility aliases: `packages/uikit/src/styles/functional/shadcn-compat.css`
- Document defaults and resets: `packages/uikit/src/styles/theme/`
- Monorepo tasks: `turbo.json`

---

## Consuming the Library

This section is for projects that **install and use** `@infonomic/uikit` as a dependency. It describes the public API, available components, their props, and how to configure theming.

### Installation

```bash
npm install @infonomic/uikit
# or
pnpm add @infonomic/uikit
```

### Required CSS Imports (in order)

Add these to your app's global stylesheet or entry point:

```css
@import '@infonomic/uikit/reset.css';
@import '@infonomic/uikit/styles.css';
@import '@infonomic/uikit/typography.css';
```

The order matters: reset → component styles → typography.

### Import Paths

```tsx
// React (all components)
import { Button, Input, Badge, Alert, Toast } from '@infonomic/uikit/react'

// Astro (select components with Astro variants)
import { Button, Input, Card } from '@infonomic/uikit/astro'
```

### Component Reference

#### Buttons

| Component | Key Props | Intents | Variants | Sizes |
|---|---|---|---|---|
| `Button` | `intent`, `variant`, `size`, `fullWidth`, `ripple`, `asChild` | all 7 | `filled` `filled-weak` `outlined` `gradient` `text` | `xs` `sm` `md` `lg` `xl` |
| `IconButton` | `intent`, `variant`, `size`, `square`, `round` | all 7 | same as Button | `xs` `sm` `md` `lg` `xl` |
| `ButtonGroup` | wraps multiple `Button` children | — | — | — |
| `ComboButton` | split button with dropdown action | all 7 | same as Button | — |
| `CopyButton` | copies text to clipboard, shows feedback | all 7 | same as Button | — |

#### Form Fields

| Component | Key Props | Intents | Variants | Sizes |
|---|---|---|---|---|
| `Input` | `id`, `name`, `label`, `variant`, `inputSize`, `intent`, `startAdornment`, `endAdornment`, `error`, `helpText`, `errorText` | all 7 | `outlined` `filled` `underlined` | `sm` `md` `lg` |
| `InputPassword` | same as Input, adds show/hide toggle | all 7 | same as Input | `sm` `md` `lg` |
| `Checkbox` | `id`, `name`, `label`, `variant`, `size`, `intent` | all 7 | `outlined` `filled` | `sm` `md` `lg` |
| `CheckboxGroup` | wraps multiple `Checkbox` children | — | — | — |
| `RadioGroup` | `options`, `value`, `onChange` | all 7 | — | — |
| `Select` | `id`, `intent`, `variant`, `size`, `placeholder`, `position` | all 7 | same as Button | `sm` `md` `lg` |
| `TextArea` | `id`, `name`, `label`, `variant`, `inputSize`, `intent`, `error`, `helpText`, `errorText` | all 7 | `outlined` `filled` `underlined` | `sm` `md` `lg` |
| `Calendar` | controlled date selection | — | — | — |
| `Label` | `id`, `htmlFor`, `required`, `label` | — | — | — |
| `HelpText` | `text`, `size` | — | — | — |
| `ErrorText` | `id`, `text`, `size` | — | — | — |
| `InputAdornment` | `position` (`start`\|`end`) | — | — | — |

#### Feedback & Notifications

| Component | Key Props | Intents | Notes |
|---|---|---|---|
| `Alert` | `intent`, `icon`, `close`, `title` | all 7 | Inline contextual alert |
| `Toast` | `intent`, `position`, `icon` | all 7 | Floating ephemeral notification |

#### Display

| Component | Key Props | Intents | Variants | Sizes |
|---|---|---|---|---|
| `Badge` | `intent`, `asChild` | all 7 | — | — |
| `Chip` | `intent`, `size`, `variant` | all 7 | `assist` `selectable` `removable` `selectable-removable` | `xs` `sm` `md` `lg` `xl` |
| `Avatar` | `src`, `alt`, `size` | — | — | — |
| `Card` | compound: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | — | — | — |
| `Table` | standard HTML table with styled wrappers | — | — | — |

#### Navigation & Layout

| Component | Key Props | Notes |
|---|---|---|
| `Tabs` | `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` | Compound component via Radix |
| `Accordion` | compound root/item/trigger/content | Compound component via Radix |
| `Pagination` | `page`, `totalPages`, `onPageChange`, `variant` | Variants: `default` `classic` `dashboard` |
| `Dropdown` | trigger + content | Radix DropdownMenu-based |
| `Container` | `maxWidth` | Layout wrapper |
| `Section` | semantic section wrapper | — |

#### Overlays & Floating UI

| Component | Notes |
|---|---|
| `Modal` | Accessible dialog via Radix |
| `Drawer` | Slide-in panel; exports `DrawerContext` for controlled open state |
| `Tooltip` | Hover tooltip via Radix |
| `ScrollArea` | Custom scrollbar styling via Radix |

#### Widgets

| Component | Notes |
|---|---|
| `Datepicker` | Full date-picker with `Calendar` integration |
| `Search` | Command-palette style search with keyboard navigation |
| `Timeline` | Vertical timeline list |

#### Loaders

`Spinner`, `RingLoader`, `EllipsesLoader` — inline loading indicators.
`Shimmer` — skeleton placeholder for content loading states.

---

### Intent System

The `intent` prop controls the **semantic color** of a component — its background, border, text, and icon colors all derive from a single intent value.

| Intent | Visual Meaning | Typical Use |
|---|---|---|
| `primary` | Brand blue (default) | Main CTAs, primary actions |
| `secondary` | Alternate brand color | Supporting actions |
| `noeffect` | Neutral gray | Tertiary actions, disabled-looking buttons |
| `success` | Green | Confirmation, completed states |
| `info` | Cyan/blue | Informational, non-critical messages |
| `warning` | Yellow/amber | Caution, attention required |
| `danger` | Red | Destructive actions, errors |

All intents automatically adapt to light and dark modes via semantic CSS tokens.

---

### Variant System

| Component Group | Variants | Default |
|---|---|---|
| Button / IconButton | `filled` `filled-weak` `outlined` `gradient` `text` | `filled` |
| Input / TextArea | `outlined` `filled` `underlined` | `outlined` |
| Checkbox | `outlined` `filled` | `outlined` |
| Chip | `assist` `selectable` `removable` `selectable-removable` | `assist` |
| Pagination | `default` `classic` `dashboard` | `default` |

---

### Size System

Most components accept a `size` prop (or `inputSize` for form fields):

| Value | Description |
|---|---|
| `xs` | Extra-small, compact inline use |
| `sm` | Small, tight layouts |
| `md` | Standard (default for most components) |
| `lg` | Large, prominent elements |
| `xl` | Extra-large, hero or display use |

Form components (`Input`, `Checkbox`, `TextArea`) use `sm` / `md` / `lg` only.

---

### Dark Mode

Add the `.dark` class (or `data-theme="dark"`) to the root `<html>` element:

```html
<html class="dark">...</html>
```

All component tokens switch automatically — no per-component dark mode overrides needed in consumer code.

**Force light mode on a specific subtree** (e.g. a fixed sidebar that should always appear light even when the app is dark):

```html
<div class="not-dark">
  <!-- children render with light-mode tokens regardless of parent .dark -->
</div>
```

---

### Style Overriding (No `!important` Needed)

The library uses **CSS Cascade Layers**. All component styles live inside `@layer infonomic-components { }`. Any CSS you write **outside** a layer automatically has higher specificity:

```css
/* Your app stylesheet — wins automatically, no !important */
.my-custom-button {
  padding-inline: 2rem;
  border-radius: 0;
}
```

Pass your class via the `className` prop:

```tsx
<Button className="my-custom-button" intent="primary">Submit</Button>
```

---

### Common Usage Patterns

#### Basic button with intent and variant

```tsx
import { Button } from '@infonomic/uikit/react'

<Button intent="primary" variant="filled" size="md">Save changes</Button>
<Button intent="danger" variant="outlined" size="sm">Delete</Button>
<Button intent="noeffect" variant="text">Cancel</Button>
```

#### Input with label, help text, and validation state

```tsx
import { Input } from '@infonomic/uikit/react'

// Standard field
<Input id="email" name="email" label="Email address" type="email" />

// With help text
<Input id="username" name="username" label="Username" helpText="Letters and numbers only" />

// Error state
<Input
  id="password"
  name="password"
  label="Password"
  type="password"
  error={true}
  errorText="Password must be at least 8 characters"
/>
```

#### Input with adornments

```tsx
import { Input, InputAdornment } from '@infonomic/uikit/react'
import { SearchIcon } from '@infonomic/uikit/react'

<Input
  id="search"
  name="search"
  startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
/>
```

#### `asChild` — composing with a router Link

The `asChild` prop (via Radix Slot) merges the button's styles and behaviour onto its single child, enabling router-aware links styled as buttons:

```tsx
import { Button } from '@infonomic/uikit/react'
import { Link } from 'react-router-dom' // or TanStack Router, Next.js Link, etc.

<Button asChild intent="primary">
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>
```

#### Alert and Toast

```tsx
import { Alert, Toast } from '@infonomic/uikit/react'

<Alert intent="success" icon title="Saved!">Your changes have been saved.</Alert>
<Alert intent="danger" icon close>Something went wrong. Please try again.</Alert>
```

#### Chip variants

```tsx
import { Chip } from '@infonomic/uikit/react'

<Chip intent="primary" variant="selectable">React</Chip>
<Chip intent="danger" variant="removable" onRemove={() => {}}>Tag to remove</Chip>
```

---

### Tailwind Compatibility

The library is fully compatible with Tailwind CSS in consuming apps. Tailwind utilities can be passed directly via `className`:

```tsx
<Button className="mt-4 w-full" intent="primary">Submit</Button>
```

Because component styles are inside CSS Cascade Layers and Tailwind utilities are typically unlayered (or in a lower-priority layer), conflicts are resolved predictably without `!important`. If you use Tailwind's `@layer utilities` or `@layer components`, be aware this may affect specificity — test overrides as needed.
