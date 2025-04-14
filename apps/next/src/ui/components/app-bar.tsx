'use client'

import { forwardRef, useEffect, useState } from 'react'

import { Button, Hamburger } from '@infonomic/uikit/react'
import cx from 'classnames'
import { usePathname } from 'next/navigation'

import { ProgressBar } from '@/context/progress-bar-provider'
import { BrandingDefault } from './app-bar-components/branding-default'

interface AppBarProps {
  className?: string
}
export type Ref = HTMLDivElement

export const AppBar = forwardRef<Ref, AppBarProps>(function AppBar({ className, ...other }, ref) {
  const pathName = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  const SCROLL_THRESHOLD = 50 // Minimum distance to trigger show/hide logic

  const handleToggleMobileMenu = (event: React.MouseEvent<HTMLButtonElement> | null): void => {
    if (event != null) event.stopPropagation()
    // e.preventDefault()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = (): void => {
    setMobileMenuOpen(false)
  }

  const handleWindowClick = (): void => {
    setMobileMenuOpen(false)
  }

  const handleScroll = (): void => {
    const currentScrollY = window.scrollY
    // Check if scroll distance exceeds the threshold
    if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        // User scrolled down
        setHasScrolledDown(true)
      } else {
        // User scrolled up
        setHasScrolledDown(false)
      }
      setLastScrollY(currentScrollY) // Update lastScrollY after logic
    }

    // TODO - refine for correct locale detection
    // For now home / and anything with a two character path
    if (pathName.length <= 3) {
      const position = window.scrollY
      if (position > 100) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('click', handleWindowClick)
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const appBarBackground =
    // hasScrolled || pathName.length > 3 ? 'bg-white shadow dark:bg-canvas-800' : 'bg-transparent'
    hasScrolled || pathName.length > 3
      ? 'bg-white shadow dark:bg-canvas-800'
      : 'bg-white shadow dark:bg-canvas-800'

  const appBarTextColor =
    // hasScrolled || pathName.length > 3
    //   ? 'text-black fill-black dark:text-white dark:fill-white'
    //   : 'text-white fill-white'
    hasScrolled || pathName.length > 3
      ? 'text-black fill-black dark:text-white dark:fill-white'
      : 'text-black fill-black dark:text-white dark:fill-white'

  const hamburgerColor =
    // hasScrolled || pathName.length > 3
    //   ? 'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'
    //   : 'bg-white before:bg-white after:bg-white'
    hasScrolled || pathName.length > 3
      ? 'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'
      : 'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'

  const hamburgerColorMobileMenuOpen =
    'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'

  return (
    <>
      <ProgressBar className="fixed h-1 shadow-lg z-50 shadow-secondary-300/20 bg-secondary-300 dark:bg-secondary-300/85 top-0" />
      <header id="header" className="sticky top-0 z-20 w-full">
        <div
          className={cx(
            'sticky top-0 z-30 w-full transition-colors duration-300',
            appBarBackground,
            className
          )}
          ref={ref}
          {...other}
        >
          <div
            id="app-bar"
            className={cx(
              'app-bar sticky top-0 flex min-h-[60px] w-full items-center justify-between gap-2 pl-0 pr-[12px]',
              'sm:gap-2 sm:pl-0',
              'transition-all duration-500 ease-out'
            )}
          >
            <div className="lg:flex-initial mr-auto">
              <BrandingDefault hasScrolled={hasScrolled} pathName={pathName} />
            </div>
            <Hamburger open={mobileMenuOpen} onChange={handleToggleMobileMenu} />
          </div>
        </div>
      </header>
    </>
  )
})
