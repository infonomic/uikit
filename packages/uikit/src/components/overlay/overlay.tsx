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
    const mediaMatch = window.matchMedia('(min-width: 768px)')
    let appBar: HTMLElement | null
    const classList = document.body.classList
    appBar = document.getElementById('app-bar')
    classList.add('overlay-shown')
    if (appBar != null) appBar.classList.add('app-bar-overlay-shown')
    if (mediaMatch.matches) {
      classList.add('overlay-shown--desktop')
      if (appBar != null) {
        appBar.classList.add('app-bar-overlay-shown--desktop')
      }
    } else {
      classList.add('overlay-shown--mobile')
      if (appBar != null) {
        appBar.classList.add('app-bar-overlay-shown--mobile')
      }
    }
    return () => {
      classList.remove('overlay-shown')
      if (appBar != null) appBar.classList.remove('app-bar-overlay-shown')
      if (mediaMatch.matches) {
        classList.remove('overlay-shown--desktop')
        if (appBar != null)
          appBar.classList.remove('app-bar-overlay-shown', 'app-bar-overlay-shown--desktop')
      } else {
        classList.remove('overlay-shown--mobile')
        if (appBar != null) appBar.classList.remove('app-bar-overlay-shown--mobile')
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
