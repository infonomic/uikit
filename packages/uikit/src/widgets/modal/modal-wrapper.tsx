'use client'

/* eslint-disable @typescript-eslint/consistent-type-imports */
import type React from 'react'
import { useEffect } from 'react'

import { useFocusTrap } from '@mantine/hooks'
import type { HTMLMotionProps } from 'motion/react'
import { m } from 'motion/react'

import styles from './modal.module.css'

export interface ModalWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  onEscapeKey?: (e: any) => void
}

export function ModalWrapper({
  children,
  onEscapeKey,
  ...rest
}: ModalWrapperProps): React.JSX.Element {
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
      className={styles['modal-wrapper']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </m.div>
  )
}
