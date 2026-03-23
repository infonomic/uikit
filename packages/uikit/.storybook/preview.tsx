import type { Preview } from '@storybook/react-vite'
// Self-hosted fonts for Storybook
import '../src/styles/local-fonts.css'
// UI kit styles
import '../src/styles/reset.css'
import '../src/styles/styles.css'
// Optional typography styles
import '../src/styles/typography.css'

import { withThemeByClassName } from '@storybook/addon-themes'

import { ToastProvider, ToastViewport } from '../src/components/notifications/toast'
import { ThemeProvider } from '../src/theme/theme-provider'
import { DrawerProvider } from '../src/widgets/drawer/drawer-context'

const globalDecorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme
  return (
    <ThemeProvider theme={theme}>
      <DrawerProvider>
        <ToastProvider timeout={5000}>
          <div
            className="background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              padding: '12px',
              overflow: 'auto',
            }}
          >
            <div style={{ marginBottom: 'var(--spacing-8)' }}>
              <h1
                style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                className="headings"
              >{`${context.title} - ${context.story}`}</h1>
              <hr className="text" />
            </div>
            <StoryFn />
          </div>
          <ToastViewport position="bottom-right" />
        </ToastProvider>
      </DrawerProvider>
    </ThemeProvider>
  )
}

export const decorators = [
  globalDecorator,
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
    // attributeName: 'data-mode',
  }),
]

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Base',
          'Theme',
          'Typography',
          'Components',
          'Animation',
          'Icons',
          'Loaders',
          'Widgets',
        ],
        locales: '',
      },
    },
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
