'use client'

import { Hamburger } from '@infonomic/uikit/react'
import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'

import { ProgressBar } from '@/context/progress-bar-provider'
import { BrandingDefault } from './app-bar-components/branding-default'

interface AppBarProps {
  className?: string
}
export type Ref = HTMLDivElement

export const AppBar = forwardRef<Ref, AppBarProps>(function AppBar({ className, ...other }, ref) {
  const pathName = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleToggleMobileMenu = (event: React.MouseEvent<HTMLButtonElement> | null): void => {
    if (event != null) event.stopPropagation()
    // e.preventDefault()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // const handleMobileMenuClose = (): void => {
  //   setMobileMenuOpen(false)
  // }

  const handleWindowClick = (): void => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  })

  const appBarBackground = 'bg-white shadow dark:bg-canvas-800'

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
              <BrandingDefault hasScrolled={false} pathName={pathName} />
            </div>
            <Hamburger open={mobileMenuOpen} onChange={handleToggleMobileMenu} />
          </div>
        </div>
      </header>
    </>
  )
})
