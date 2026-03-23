# Infonomic UI Kit

A UI kit that relies on CSS Modules for component styling, while playing nicely with all front-end frameworks that use CSS or [Tailwind CSS](https://tailwindcss.com/).

![image](https://github.com/user-attachments/assets/5f6ec314-7467-4c33-926d-0c382d9d2831)

We created this project because while we appreciate Tailwind CSS for front-end development of PoC and smaller applications, we don't feel it belongs in a component library. Tailwind CSS as a [&#39;programmatic&#39; atomic CSS system](https://css-tricks.com/lets-define-exactly-atomic-css/#aa-programmatic) - is brilliant at what it does in preventing CSS rot and gradual CSS bloat - as well as making it clear how a layout or front-end component has been styled. It's also the ultimate expression of what [Thierry Koblentz](https://www.smashingmagazine.com/author/thierry-koblentz/) was talking about in his 2103 article, [Challenging CSS Best Practices](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/).

It just doesn't belong in UI kits and libraries.

## Rationale

In addition to our thoughts above, this kit is built around the philosophy of adopting or 'folding in' best-in-class components, like the ones in well-known 'à la carte' headless component libraries such as [Base UI](https://base-ui.com/), and [React Aria](https://react-spectrum.adobe.com/react-aria/index.html) as well as individually well-known components such as [React Day Picker](https://github.com/gpbl/react-day-picker) and more. 

Having lived through a full generation of 'all-in-one' and difficult to override themed UI kits like Bootstrap and Material UI, the trend towards composable headless (unstyled) component libraries is a welcome one - and one that forms the basis of this kit. 

Many of the current components are built on Base UI. The great thing about wrapping these components in a client-consumable interface and library, is that in theory at least, the consumer of our kit's components won't have to worry about implementation details, or migration from Base UI to another underlying component library. The 'contract' and core styling semantics will never change.

## Design Goals

We built this with the following design goals in mind:

1. We'd like a structure and style system that will work with any component framework - [Astro](https://astro.build/), [React](https://react.dev/), [Vue.js](https://vuejs.org/), [Solid](https://www.solidjs.com/), [Svelte](https://svelte.dev/) etc.
2. We'd like to be able to easily target various front-end meta frameworks, from [Astro](https://astro.build/), to [Next.js](https://nextjs.org/) to [React Router v7](https://reactrouter.com/) (formerly Remix) - and even plain old HTML/CSS.
3. We'd like a good developer experience (DX), allowing us to develop our components in the 'kit' via tests and Storybook, as well as in a monorepo with the example front-end meta-frameworks.

4. We'd like our components' styles to be easily overridable - whether via 'style' attributes, Tailwind, regular CSS classnames and stylesheets, or any other style system being used by the front-end. We'd especially like to be able to override a component's styles without having to use CSS !important.

5. We have a very opinionated definition of variants and intents. Variants in our kit refer to overall style variations - meaning they may differ in terms of shape, form, borders, etc. For example, `outlined`, `gradient`, or `filled` buttons, or `outlined`, `filled`, and `underlined` text input components. Our intents system, as the name suggests, signals semantic intent and is composed of `primary`, `secondary`, `noeffect`, `info`, `warning`, `success` and `danger`. Many of our components support both variant and intent properties. 

### Other key points:

We use CSS [Cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) via the @layer statement at-rule for named layers. This allows all of our CSS to be easily overwritten by any consuming client application - since CSS outside any layer, automatically has a higher specificity than CSS within a layer. We also carefully order our layers to create our own specificity hierarchy - for example - @layer infonomic-base, infonomic-utilities, infonomic-theme, infonomic-typography, infonomic-components;

For components - this means ensuring that the layer specificity order appears at the top of each CSS module. It acts as sort of a 'preamble' - and it means that the component's bundled CSS will behave correctly when used within the overall UI kit.

The use of CSS modules will also allow us to support exporting individual components separately (we export a single bundle for import at the moment) helping to reduce the import and bundle size of the consuming client. Once we've enabled single component exports, a client will then be able to import the main style.css file followed by an individual component. We'll be revisiting this soon.

Lastly - we highly value the option to 'tell' components to ignore or override a top-level theme decision of light or dark. There is an intentionally duplicated `.not-dark` class selector in our functional tokens file. Being able to use `.not-dark` means that we can override components that need to be in 'dark mode' on an otherwise 'light theme', or that need to be in .not-dark mode, on an otherwise 'dark theme'.

## Getting Started

Install packages

`npm install @infonomic/uikit`

or...

`pnpm add @infonomic/uikit`

And then in your application in a global.css or other root CSS file...

```css
/**
 * Optional reset and core styles including var system for 
 * breakpoints, colors, scales, utils  etc., which can be
 * integrated with Tailwind (colors, breakpoints etc.) via
 * Tailwind theme configuration.
 */
@import '@infonomic/uikit/reset.css';
@import '@infonomic/uikit/styles.css';

/**
  * Optional uikit typography including prose and fonts
  */
@import '@infonomic/uikit/typography.css';

/**
  * Tailwind (optional) - should come after the above.
  */
@import './tailwind.css';

/**
  * Application styles
  */
@import './app.css';
```

Followed by the below in any of your components or routes where you'd like to import a component...

```ts
import { Button, Card, Container, Section } from '@infonomic/uikit/react

```

## Documentation

At the moment self-documented component examples are all based on [Storybook](https://storybook.js.org/). For now at least, in order to view our Storybook stories you'll need to clone this repo, install all dependencies, then change into the packages/ui directory and start Storybook with `pnpm storybook` or `npm run storybook`.

## Tailwind CSS Integration

Here's an example Tailwind CSS integration. Note that we have our own reset, and optional typography system and so the order of our imports are a little different from the usual 'Tailwind first' approach. The example below does NOT use the Tailwind CSS reset.

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
/* @import "tailwindcss/preflight.css" layer(base); */
@import "tailwindcss/utilities.css" layer(utilities);

@custom-variant dark (&:is(.dark *));

@theme {
  --breakpoint-*: initial;
  /* 480px */
  --breakpoint-xs: 30rem;
  /* 640px */
  --breakpoint-sm: 40rem;
  /* 768px */
  --breakpoint-md: 48rem;
  /* 1056px */
  --breakpoint-lg: 66rem;
  /* our container component will set max width to common screen size */
  /* 1232px */
  --breakpoint-xl: 77rem;
  /* 1504px */
  --breakpoint-2xl: 94rem;

  --font-*: initial;
  --font-sans:
    'Inter', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: Merriweather, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-display:
    Roboto, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  --font-mono:
    'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;

  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  --color-noeffect: var(--noeffect);
  --color-success: var(--success);
  --color-info: var(--info);
  --color-warning: var(--warning);
  --color-danger: var(--danger);

  --color-theme-25: var(--theme-25);
  --color-theme-50: var(--theme-50);
  --color-theme-100: var(--theme-100);
  --color-theme-200: var(--theme-200);
  --color-theme-300: var(--theme-300);
  --color-theme-400: var(--theme-400);
  --color-theme-500: var(--theme-500);
  --color-theme-600: var(--theme-600);
  --color-theme-700: var(--theme-700);
  --color-theme-800: var(--theme-800);
  --color-theme-900: var(--theme-900);
  --color-theme-950: var(--theme-950);
  --color-primary-25: var(--primary-25);
  --color-primary-50: var(--primary-50);
  --color-primary-100: var(--primary-100);
  --color-primary-200: var(--primary-200);
  --color-primary-300: var(--primary-300);
  --color-primary-400: var(--primary-400);
  --color-primary-500: var(--primary-500);
  --color-primary-600: var(--primary-600);
  --color-primary-700: var(--primary-700);
  --color-primary-800: var(--primary-800);
  --color-primary-900: var(--primary-900);
  --color-primary-950: var(--primary-950);
  --color-secondary-25: var(--secondary-25);
  --color-secondary-50: var(--secondary-50);
  --color-secondary-100: var(--secondary-100);
  --color-secondary-200: var(--secondary-200);
  --color-secondary-300: var(--secondary-300);
  --color-secondary-400: var(--secondary-400);
  --color-secondary-500: var(--secondary-500);
  --color-secondary-600: var(--secondary-600);
  --color-secondary-700: var(--secondary-700);
  --color-secondary-800: var(--secondary-800);
  --color-secondary-900: var(--secondary-900);
  --color-secondary-950: var(--secondary-950);
  --color-accent-25: var(--accent-25);
  --color-accent-50: var(--accent-50);
  --color-accent-100: var(--accent-100);
  --color-accent-200: var(--accent-200);
  --color-accent-300: var(--accent-300);
  --color-accent-400: var(--accent-400);
  --color-accent-500: var(--accent-500);
  --color-accent-600: var(--accent-600);
  --color-accent-700: var(--accent-700);
  --color-accent-800: var(--accent-800);
  --color-accent-900: var(--accent-900);
  --color-accent-950: var(--accent-950);
  --color-gray-25: var(--gray-25);
  --color-gray-50: var(--gray-50);
  --color-gray-100: var(--gray-100);
  --color-gray-200: var(--gray-200);
  --color-gray-300: var(--gray-300);
  --color-gray-400: var(--gray-400);
  --color-gray-500: var(--gray-500);
  --color-gray-600: var(--gray-600);
  --color-gray-700: var(--gray-700);
  --color-gray-800: var(--gray-800);
  --color-gray-900: var(--gray-900);
  --color-gray-950: var(--gray-950);
  --color-canvas-25: var(--canvas-25);
  --color-canvas-50: var(--canvas-50);
  --color-canvas-100: var(--canvas-100);
  --color-canvas-200: var(--canvas-200);
  --color-canvas-300: var(--canvas-300);
  --color-canvas-400: var(--canvas-400);
  --color-canvas-500: var(--canvas-500);
  --color-canvas-600: var(--canvas-600);
  --color-canvas-700: var(--canvas-700);
  --color-canvas-800: var(--canvas-800);
  --color-canvas-900: var(--canvas-900);
  --color-canvas-950: var(--canvas-950);
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --grid-template-columns-auto-fit-240: repeat(auto-fit, minmax(240px, 1fr));
  --grid-template-columns-auto-fit-280: repeat(auto-fit, minmax(280px, 1fr));
  --grid-template-columns-auto-fit-320: repeat(auto-fit, minmax(320px, 1fr));
  --grid-template-columns-auto-fit-480: repeat(auto-fit, minmax(480px, 1fr));

  --shadow-slider: 0 0 0 5px rgba(0, 0, 0, 0.3);
}
```

## Questions or Comments?

Feel free to get in touch by reaching out to us at https://infonomic.io, or by posting questions, issues, or PRs to our github repo at https://github.com/infonomic/uikit

## License

Infonomic UI Kit is free software licensed under the MIT license.
For full details, please refer to the [LICENSE](LICENSE) and [COPYRIGHT](COPYRIGHT) files in this repository.

Copyright © 2025 Anthony Bouch and contributors.

### Major Contributors

* Anthony Bouch https://www.linkedin.com/in/anthonybouch/ anthony@infonomic.io 
* David Lipsky https://www.linkedin.com/in/david-lipsky-4391862a8/ david@infonomic.io 