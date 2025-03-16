'use client'

import type React from 'react'
import { useEffect } from 'react'

import cx from 'classnames'

import styles from './overlay.module.css'

type OverlayIntrinsicProps = React.JSX.IntrinsicElements['div']
export interface OverlayProps extends OverlayIntrinsicProps {
  isUnmounting?: boolean
  className?: string
}

const BodyLock = (): null => {
  useEffect(() => {
    // a one off mediaMedia here is fine - no need to listen to events
    const mediaMatch = window.matchMedia('(min-width: 960px)')
    let appBar: HTMLElement | null
    if (mediaMatch.matches) {
      document.body.style.cssText = 'overflow: hidden; padding-right: 9px;'
      document.body.style.overflow = 'hidden'
      appBar = document.getElementById('app-bar')
      if (appBar != null) appBar.style.cssText = 'padding-right: 9px'
    } else {
      document.body.style.cssText = 'overflow: hidden;'
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.cssText = `
        overflow: visible;
        overflow: overlay;
      `
      if (mediaMatch.matches) {
        if (appBar != null) appBar.style.cssText = 'padding-right: 18px'
      }
    }
  }, [])

  return null
}

export function Overlay(props: OverlayProps): React.JSX.Element {
  const { isUnmounting, className, ...rest } = props
  const classes = cx(
    styles.overlay,
    // 'fixed top-0 left-0 w-full h-full backdrop-blur dark:bg-canvas-700/50 bg-canvas-500/50 z-20'
    'animate-fade-in',
    {
      'animate-fade-out': isUnmounting,
    }
  )

  return (
    <>
      <BodyLock />
      <div role="presentation" className={cx(classes, className)} {...rest} />
    </>
  )
}
