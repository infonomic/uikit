'use client'

import type React from 'react'

import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import { usePager } from './pagination'

import type { PagerButtonProps, RefType } from './pagination'

import styles from './pagination.module.css'

export type NextButtonProps = PagerButtonProps & {
  page: number | null
}

export const NextButton = ({
  ref,
  className,
  disabled,
  page,
  asChild,
  children,
  ...rest
}: NextButtonProps & {
  ref?: React.RefObject<RefType>
}) => {
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)
  const { variant, showLastButton } = usePager()

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'Next' }

  return (
    <li className={styles['mobile-toggle']}>
      <Comp
        ref={ref}
        className={cx(
          styles['next-button'],
          [styles[variant]],
          { [styles['rounded-right']]: showLastButton == null || showLastButton === false },
          'pager-next',
          className
        )}
        disabled={disabled}
        title="Next"
        data-testid="pager-next"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <ChevronRightIcon />}
      </Comp>
    </li>
  )
}

NextButton.displayName = 'NextButton'
