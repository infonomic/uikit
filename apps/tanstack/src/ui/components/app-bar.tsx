'use client'

import { forwardRef, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

import cx from 'clsx'

import { useTheme } from '@/ui/theme/provider'
import { Theme } from '@/ui/theme/utils'
import styles from './app-bar.module.css'
import type { Locale } from '@/i18n/i18n-config'

interface AppBarProps {
  className?: string
  lng: Locale
}
export type Ref = HTMLDivElement

export const AppBar = forwardRef<Ref, AppBarProps>(function AppBar(
  { className, lng: _lng, ...other },
  ref
) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const year = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      id="header"
      ref={ref}
      className={cx(styles.appBar, hasScrolled && styles.appBarScrolled, className)}
      {...other}
    >
      <div className={styles.inner}>
        <div className={styles.section}>
          <Link to="/" className={styles.brand}>
            <span className={styles.dot} aria-hidden />
            Infonomic · UIKit
          </Link>
          <span className={styles.hiddenSm}>v6.7.0</span>
          <span className={styles.hiddenSm}>Specimen / 01</span>
        </div>
        <div className={styles.section}>
          <span>{year}</span>
          <span className={styles.themeGroup}>
            <button
              type="button"
              className={cx(styles.themeButton, theme === Theme.DARK && styles.themeButtonActive)}
              onClick={() => setTheme(Theme.DARK)}
              aria-pressed={theme === Theme.DARK}
            >
              Dark
            </button>
            <span className={styles.themeSep} aria-hidden>
              ·
            </span>
            <button
              type="button"
              className={cx(styles.themeButton, theme === Theme.LIGHT && styles.themeButtonActive)}
              onClick={() => setTheme(Theme.LIGHT)}
              aria-pressed={theme === Theme.LIGHT}
            >
              Light
            </button>
          </span>
        </div>
      </div>
    </header>
  )
})
