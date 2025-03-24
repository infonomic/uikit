'use client'

import type React from 'react'

import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import { usePager } from './pagination'

import type { PagerButtonProps, RefType } from './pagination'

import styles from './pagination.module.css'

export const PreviousButton = ({
  ref,
  className,
  disabled,
  asChild,
  children,
  ...rest
}: PagerButtonProps & {
  ref?: React.RefObject<RefType>
}) => {
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)
  const { showFirstButton, variant } = usePager()

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'Previous' }

  return (
    <li className={styles['mobile-toggle']}>
      <Comp
        ref={ref}
        className={cx(
          styles['previous-button'],
          styles[variant],

          { [styles['rounded-left']]: showFirstButton == null || showFirstButton === false },
          'pager-previous',
          className
        )}
        disabled={disabled}
        title="Previous"
        data-testid="pager-previous"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <ChevronLeftIcon />}
      </Comp>
    </li>
  )
}

PreviousButton.displayName = 'PreviousButton'
