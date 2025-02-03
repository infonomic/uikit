# UI Kit Prototype

A UI kit prototype that relies on CSS Modules for component styling, while playing nicely with front-end frameworks that use [Tailwind CSS](https://tailwindcss.com/).

![image](https://github.com/user-attachments/assets/5f6ec314-7467-4c33-926d-0c382d9d2831)


This is an experimental repo. We're not sure yet whether this makes sense, or whether we should use Tailwind for the UI kit as well. Tailwind CSS is great, and as a 'programmatic' atomic CSS system - it's brilliant at what it does in preventing CSS rot and gradual CSS bloat - as well as making it clear how a layout or front-end component has been styled.

We're just not convinced it should be used in UI kits and libraries.

## Getting Started

Install packages and build once...

`pnpm install && pnpm build`

To start the Next.js 15 app in dev mode...

`pnpm dev`

To start Storybook for the ui kit.

`cd packages/uikt`

`pnpm storybook`

## Note

UI kit vars / colors have been registered with Tailwind in Next.js
