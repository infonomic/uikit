import node from '@astrojs/node'
import { defineConfig } from 'astro/config'

export default defineConfig({
  outDir: 'build',
  trailingSlash: 'never',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),

  build: {
    format: 'file',
  },
  vite: {
    ssr: {
      noExternal: ['webcoreui'],
    },
  },
})
