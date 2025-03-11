'use client'
/* eslint-disable @typescript-eslint/consistent-type-imports */
import type React from 'react'

import { useFocusTrap } from '@mantine/hooks'
import { m } from 'motion/react'

import type { HTMLMotionProps } from 'motion/react'

import styles from './modal.module.css'

export interface ModalWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export function ModalWrapper({ children, ...rest }: ModalWrapperProps): React.JSX.Element {
  const focusTrapRef = useFocusTrap()
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
