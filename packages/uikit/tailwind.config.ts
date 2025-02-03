/**
 * tailwind.config.ts - here only for compatibility,
 * while we slowly migrate away from Tailwind in the uikit
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./.storybook/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  variants: {
    extend: {}
  },
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1320px',
      // our container component will set max width to common screen size
      // but we want 'shy edges' and so we'll break here a little later

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: [
        '"Inter"',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: ['Merriweather', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      display: [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      mono: [
        '"Source Code Pro"',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    extend: {
      colors: {
        'theme-25': 'oklch(from var(--theme-25) l c h / <alpha-value>)',
        'theme-50': 'oklch(from var(--theme-50) l c h / <alpha-value>)',
        'theme-100': 'oklch(from var(--theme-100) l c h / <alpha-value>)',
        'theme-200': 'oklch(from var(--theme-200) l c h / <alpha-value>)',
        'theme-300': 'oklch(from var(--theme-300) l c h / <alpha-value>)',
        'theme-400': 'oklch(from var(--theme-400) l c h / <alpha-value>)',
        'theme-500': 'oklch(from var(--theme-500) l c h / <alpha-value>)',
        'theme-600': 'oklch(from var(--theme-600) l c h / <alpha-value>)',
        'theme-700': 'oklch(from var(--theme-700) l c h / <alpha-value>)',
        'theme-800': 'oklch(from var(--theme-800) l c h / <alpha-value>)',
        'theme-900': 'oklch(from var(--theme-900) l c h / <alpha-value>)',
        'theme-950': 'oklch(from var(--theme-950) l c h / <alpha-value>)',
        'primary-25': 'oklch(from var(--primary-25) l c h / <alpha-value>)',
        'primary-50': 'oklch(from var(--primary-50) l c h / <alpha-value>)',
        'primary-100': 'oklch(from var(--primary-100) l c h / <alpha-value>)',
        'primary-200': 'oklch(from var(--primary-200) l c h / <alpha-value>)',
        'primary-300': 'oklch(from var(--primary-300) l c h / <alpha-value>)',
        'primary-400': 'oklch(from var(--primary-400) l c h / <alpha-value>)',
        'primary-500': 'oklch(from var(--primary-500) l c h / <alpha-value>)',
        'primary-600': 'oklch(from var(--primary-600) l c h / <alpha-value>)',
        'primary-700': 'oklch(from var(--primary-700) l c h / <alpha-value>)',
        'primary-800': 'oklch(from var(--primary-800) l c h / <alpha-value>)',
        'primary-900': 'oklch(from var(--primary-900) l c h / <alpha-value>)',
        'primary-950': 'oklch(from var(--primary-950) l c h / <alpha-value>)',
        'secondary-25': 'oklch(from var(--secondary-25) l c h / <alpha-value>)',
        'secondary-50': 'oklch(from var(--secondary-50) l c h / <alpha-value>)',
        'secondary-100': 'oklch(from var(--secondary-100) l c h / <alpha-value>)',
        'secondary-200': 'oklch(from var(--secondary-200) l c h / <alpha-value>)',
        'secondary-300': 'oklch(from var(--secondary-300) l c h / <alpha-value>)',
        'secondary-400': 'oklch(from var(--secondary-400) l c h / <alpha-value>)',
        'secondary-500': 'oklch(from var(--secondary-500) l c h / <alpha-value>)',
        'secondary-600': 'oklch(from var(--secondary-600) l c h / <alpha-value>)',
        'secondary-700': 'oklch(from var(--secondary-700) l c h / <alpha-value>)',
        'secondary-800': 'oklch(from var(--secondary-800) l c h / <alpha-value>)',
        'secondary-900': 'oklch(from var(--secondary-900) l c h / <alpha-value>)',
        'secondary-950': 'oklch(from var(--secondary-950) l c h / <alpha-value>)',
        'accent-25': 'oklch(from var(--accent-25) l c h / <alpha-value>)',
        'accent-50': 'oklch(from var(--accent-50) l c h / <alpha-value>)',
        'accent-100': 'oklch(from var(--accent-100) l c h / <alpha-value>)',
        'accent-200': 'oklch(from var(--accent-200) l c h / <alpha-value>)',
        'accent-300': 'oklch(from var(--accent-300) l c h / <alpha-value>)',
        'accent-400': 'oklch(from var(--accent-400) l c h / <alpha-value>)',
        'accent-500': 'oklch(from var(--accent-500) l c h / <alpha-value>)',
        'accent-600': 'oklch(from var(--accent-600) l c h / <alpha-value>)',
        'accent-700': 'oklch(from var(--accent-700) l c h / <alpha-value>)',
        'accent-800': 'oklch(from var(--accent-800) l c h / <alpha-value>)',
        'accent-900': 'oklch(from var(--accent-900) l c h / <alpha-value>)',
        'accent-950': 'oklch(from var(--accent-950) l c h / <alpha-value>)',
        'gray-25': 'oklch(from var(--gray-25) l c h / <alpha-value>)',
        'gray-50': 'oklch(from var(--gray-50) l c h / <alpha-value>)',
        'gray-100': 'oklch(from var(--gray-100) l c h / <alpha-value>)',
        'gray-200': 'oklch(from var(--gray-200) l c h / <alpha-value>)',
        'gray-300': 'oklch(from var(--gray-300) l c h / <alpha-value>)',
        'gray-400': 'oklch(from var(--gray-400) l c h / <alpha-value>)',
        'gray-500': 'oklch(from var(--gray-500) l c h / <alpha-value>)',
        'gray-600': 'oklch(from var(--gray-600) l c h / <alpha-value>)',
        'gray-700': 'oklch(from var(--gray-700) l c h / <alpha-value>)',
        'gray-800': 'oklch(from var(--gray-800) l c h / <alpha-value>)',
        'gray-900': 'oklch(from var(--gray-900) l c h / <alpha-value>)',
        'gray-950': 'oklch(from var(--gray-950) l c h / <alpha-value>)',
        'canvas-25': 'oklch(from var(--canvas-25) l c h / <alpha-value>)',
        'canvas-50': 'oklch(from var(--canvas-50) l c h / <alpha-value>)',
        'canvas-100': 'oklch(from var(--canvas-100) l c h / <alpha-value>)',
        'canvas-200': 'oklch(from var(--canvas-200) l c h / <alpha-value>)',
        'canvas-300': 'oklch(from var(--canvas-300) l c h / <alpha-value>)',
        'canvas-400': 'oklch(from var(--canvas-400) l c h / <alpha-value>)',
        'canvas-500': 'oklch(from var(--canvas-500) l c h / <alpha-value>)',
        'canvas-600': 'oklch(from var(--canvas-600) l c h / <alpha-value>)',
        'canvas-700': 'oklch(from var(--canvas-700) l c h / <alpha-value>)',
        'canvas-800': 'oklch(from var(--canvas-800) l c h / <alpha-value>)',
        'canvas-900': 'oklch(from var(--canvas-900) l c h / <alpha-value>)',
        'canvas-950': 'oklch(from var(--canvas-950) l c h / <alpha-value>)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        }
      },
      gridTemplateColumns: {
        'auto-fit-240': 'repeat(auto-fill, minmax(240px, 1fr))',
        'auto-fit-280': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fit-320': 'repeat(auto-fill, minmax(320px, 1fr))',
        'auto-fit-480': 'repeat(auto-fill, minmax(480px, 1fr))'
      },
      boxShadow: {
        slider: '0 0 0 5px rgba(0, 0, 0, 0.3)'
      }
    }
  }
}

export default config
