/**
 * NOTE: Not used in production. This is only here for
 * uikit development with the provider placed in
 * .storybook/preview.tsx
 */

import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

// ThemeContext
interface ThemeContextType {
  theme: Theme | null
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  theme: Theme
}

// ThemeProvider
function ThemeProvider({ children, theme }: ThemeProviderProps): React.JSX.Element {
  const contextValue = useMemo(() => {
    return { theme }
  }, [theme])

  return <ThemeContext value={contextValue}>{children}</ThemeContext>
}

// Hook helper useTheme
function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { Theme, ThemeProvider, useTheme }
