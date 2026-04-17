// @ts-check

import node from '@astrojs/node'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
})
