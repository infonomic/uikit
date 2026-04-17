'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

import { getTheme as getThemeApi, type ThemeSettings } from './get-theme'
import { setTheme as setThemeApi } from './set-theme'
import {
  DEFAULT_THEME,
  PREFERS_DARK_MQ,
  setPrefersColorScheme,
  setPrefersTheme,
  Theme,
  ThemeSource,
} from './utils'

interface ThemeContextType {
  theme: Theme | undefined
  setTheme: (theme: Theme) => void
  getTheme: () => Theme
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  force?: Theme
}

/**
 * Client-side ThemeProvider that:
 * - lazily initializes from cookies/localStorage via getThemeApi()
 * - reacts to prefers-color-scheme changes when source is HEADER
 * - exposes stable setTheme/getTheme helpers
 */
export function ThemeProvider({ children, force }: ThemeProviderProps): React.JSX.Element {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings | null>(() => getThemeApi())
  const pathname = useLocation().pathname

  useEffect(() => {
    if (themeSettings?.source !== ThemeSource.HEADER) return

    const mediaQuery = window.matchMedia(PREFERS_DARK_MQ)
    const handleChange = (ev: MediaQueryListEvent) => {
      const prefers = ev.matches ? Theme.DARK : Theme.LIGHT
      setPrefersTheme(prefers)
      setPrefersColorScheme(prefers)
      setThemeSettings((currentSettings) => ({
        ...currentSettings,
        source: ThemeSource.HEADER,
        theme: prefers,
      }))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [themeSettings?.source])

  // biome-ignore lint/correctness/useExhaustiveDependencies: run on pathname changes
  useEffect(() => {
    const currentTheme = themeSettings?.theme ?? DEFAULT_THEME
    const source = themeSettings?.source

    if (force != null && source !== ThemeSource.STORED) {
      setThemeApi(force)
      setPrefersTheme(force)
      setPrefersColorScheme(force)
      setThemeSettings({
        source: ThemeSource.STORED,
        theme: force,
      })
    } else {
      setPrefersTheme(currentTheme)
      setPrefersColorScheme(currentTheme)
    }
  }, [pathname, force, themeSettings])

  const setTheme = useCallback((prefers: Theme) => {
    setThemeApi(prefers)
    setPrefersTheme(prefers)
    setPrefersColorScheme(prefers)
    setThemeSettings({ theme: prefers, source: ThemeSource.STORED })
  }, [])

  const getTheme = useCallback<() => Theme>(() => {
    return themeSettings?.theme ?? DEFAULT_THEME
  }, [themeSettings])

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme: themeSettings?.theme,
      setTheme,
      getTheme,
    }),
    [themeSettings?.theme, setTheme, getTheme]
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (ctx == null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
