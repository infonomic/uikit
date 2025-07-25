# UI Kit Prototype

A UI kit prototype that relies on CSS Modules for component styling, while playing nicely with front-end frameworks that use [Tailwind CSS](https://tailwindcss.com/).

![image](https://github.com/user-attachments/assets/5f6ec314-7467-4c33-926d-0c382d9d2831)

We created this repo because while we appreciate Tailwind CSS for front-end development of PoC and smaller applications, we don't feel it belongs in a component library. Tailwind CSS as a [&#39;programmatic&#39; atomic CSS system](https://css-tricks.com/lets-define-exactly-atomic-css/#aa-programmatic) - is brilliant at what it does in preventing CSS rot and gradual CSS bloat - as well as making it clear how a layout or front-end component has been styled. It's also the ulitmate expression of what [Thierry Koblentz](https://www.smashingmagazine.com/author/thierry-koblentz/) was talking about in his 2103 article, [Challenging CSS Best Practices](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/).

It just doesn't belong in UI kits and libraries.

## Design Goals

We built this with the following goals in mind:

1. We'd like a structure and style system that will work with any framework -[React](https://react.dev/), [Vue.js](https://vuejs.org/), [Solid](https://www.solidjs.com/), [Svelte](https://svelte.dev/) etc.
2. We'd like to be able to easily target various front-end meta frameworks, from [Astro](https://astro.build/), to [Next.js](https://nextjs.org/) to [React Router v7](https://reactrouter.com/) (formerly Remix) - and even plain old HTML/CSS.
3. We'd like a good developer experience (DX), allowing us to develop our components in the 'kit' via tests and Storybook, as well as in a monorepo within the front-end target framework itself (Next.js, Vue etc.).
4. We'd like our components' styles to be easily overridable - whether via 'style' attributes, Tailwind, regular CSS classnames and stylesheets, or any other style system being used by the front-end. We'd especially like to be able to override a component's styles without having to use CSS !important.

## Getting Started

Install packages and build once...

`pnpm install && pnpm build`

To start the Next.js 15 and Astro apps in dev mode...

`pnpm dev`

To start Storybook for the ui kit.

`cd packages/uikt`

`pnpm storybook`

## Note

UI kit vars / colors have been registered with Tailwind in Next.js
