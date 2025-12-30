'use client'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type React from 'react'

import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import { usePager } from './pagination'
import styles from './pagination.module.css'
import type { PagerButtonProps, RefType } from './pagination'

export const FirstButton = ({
  ref,
  className,
  disabled,
  asChild,
  children,
  ...rest
}: PagerButtonProps & {
  ref?: React.RefObject<RefType>
}) => {
  const { variant } = usePager()

  const Comp = asChild != null ? Slot : ('button' as React.ElementType)

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'First' }

  return (
    <li className={styles['mobile-toggle']}>
      <Comp
        ref={ref}
        className={cx(
          styles['first-button'],
          styles[variant],
          styles['rounded-left'],
          'pagination-first',
          className
        )}
        disabled={disabled}
        data-testid="pagination-first"
        title="First"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <DoubleArrowLeftIcon />}
      </Comp>
    </li>
  )
}

FirstButton.displayName = 'FirstButton'
