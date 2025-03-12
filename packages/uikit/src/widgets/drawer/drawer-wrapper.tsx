'use client'
/* eslint-disable @typescript-eslint/consistent-type-imports */
import type React from 'react'
import { useEffect } from 'react'

import cx from 'classnames'

import { useFocusTrap } from '@mantine/hooks'
import { m } from 'motion/react'

import type { HTMLMotionProps } from 'motion/react'

import styles from './drawer.module.css'

export interface DrawerWrapperProps extends HTMLMotionProps<'div'> {
  className?: string
  children: React.ReactNode
  onEscapeKey?: (e: any) => void
}

export function DrawerWrapper({
  className,
  children,
  onEscapeKey,
  ...rest
}: DrawerWrapperProps): React.JSX.Element {
  const focusTrapRef = useFocusTrap()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscapeKey) {
        onEscapeKey(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onEscapeKey])

  return (
    <m.div
      ref={focusTrapRef}
      {...rest}
      className={cx(styles['drawer-wrapper'], className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </m.div>
  )
}
