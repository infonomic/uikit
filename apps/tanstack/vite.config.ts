import { tanstackRouter } from '@tanstack/router-plugin/vite'

import { infonomicLayerOrder } from '@infonomic/uikit/css-layers'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
  css: { postcss: { plugins: [infonomicLayerOrder()] } },
  clearScreen: false,
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
