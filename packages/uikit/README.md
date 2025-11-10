# Infonomic UI Kit

A UI kit that relies on CSS Modules for component styling, while playing nicely with all front-end frameworks that use CSS or [Tailwind CSS](https://tailwindcss.com/).

![image](https://github.com/user-attachments/assets/5f6ec314-7467-4c33-926d-0c382d9d2831)

We created this project because while we appreciate Tailwind CSS for front-end development of PoC and smaller applications, we don't feel it belongs in a component library. Tailwind CSS as a [&#39;programmatic&#39; atomic CSS system](https://css-tricks.com/lets-define-exactly-atomic-css/#aa-programmatic) - is brilliant at what it does in preventing CSS rot and gradual CSS bloat - as well as making it clear how a layout or front-end component has been styled. It's also the ulitmate expression of what [Thierry Koblentz](https://www.smashingmagazine.com/author/thierry-koblentz/) was talking about in his 2103 article, [Challenging CSS Best Practices](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/).

It just doesn't belong in UI kits and libraries.

## Design Goals

We built this with the following goals in mind:

1. We'd like a structure and style system that will work with any component framework - [Astro](https://astro.build/), [React](https://react.dev/), [Vue.js](https://vuejs.org/), [Solid](https://www.solidjs.com/), [Svelte](https://svelte.dev/) etc.
2. We'd like to be able to easily target various front-end meta frameworks, from [Astro](https://astro.build/), to [Next.js](https://nextjs.org/) to [React Router v7](https://reactrouter.com/) (formerly Remix) - and even plain old HTML/CSS.
3. We'd like a good developer experience (DX), allowing us to develop our components in the 'kit' via tests and Storybook, as well as in a monorepo with the example front-end meta-frameworks.

4. We'd like our components' styles to be easily overridable - whether via 'style' attributes, Tailwind, regular CSS classnames and stylesheets, or any other style system being used by the front-end. We'd especially like to be able to override a component's styles without having to use CSS !important.

5. We have a very opinionated definition of variants and intents. Variants in our kit refer to overall style variations - meaning they may differ in terms of shape, form, borders, etc. For example, `outlined`, `gradient`, or `filled` buttons, or `outlined`, `filled`, and `underlined` text input components. Our intents system, as the name suggests, signals semantic intent and is composed of `primary`, `secondary`, `noeffect`, `info`, `warning`, `success` and `danger`. Many of our components support both variant and intent properties. 

### Other key points:

We use CSS Cascade layers via the @layer statement at-rule for named layers. This allows all of our CSS to be easily overwritten by any consuming client application - since CSS outside any layer, automatically has a higher specificity than CSS within a layer. We also carefully order our layers to create our own specificity hierarchy - for example - @layer infonomic-base, infonomic-utilities, infonomic-theme, infonomic-typography, infonomic-components;

For component CSS modules - this means ensuring that the layer specificity order appears at the top of each CSS module. It acts as sort of a 'preamble' - and it means that the component's bundled CSS will behave correctly when used within the overall UI kit.

The use of CSS modules will also allow us to support exporting individual components separately, to help reduce the import and bundle size of the consuming client. A client would import the main style.css file, and then only the individual components needed.

Lastly - we highly value the option to 'tell' components to ignore or override a top-level theme decision of light or dark. There is an intentionally duplicated `.not-dark` class selector in our tokens.css file. Since we're using shadows to create ring offsets (which we desire for focus, active modes etc.) and since CSS shadows need a background color - being able to use `.not-dark`  means that we can override components that need to be in 'dark mode' on an otherwise 'light theme', or that need to be in .not-dark mode, on an otherwise 'dark theme'. This allows us to use the correct ring, background and component colors for components that might be placed on fixed dark or light background panels or sections - irrespective of the currently selected theme

## Getting Started

Install packages

`npm install @infonomic/uikit`

or...

`pnpm add @infonomic/uikit`

And then in your application...

```ts
import { Button, Card, Container, Section } from '@infonomic/uikit/react

```

At the moment docs are in the main repo and stories are available via Storybook.