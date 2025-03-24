'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type React from 'react'

import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import { usePager } from './pagination'

import type { PagerButtonProps, RefType } from './pagination'

import styles from './pagination.module.css'

export type LastButtonProps = PagerButtonProps & {
  count: number
}

export const LastButton = ({
  ref,
  className,
  disabled,
  count,
  asChild,
  children,
  ...rest
}: LastButtonProps & {
  ref?: React.RefObject<RefType>
}) => {
  const { variant } = usePager()
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'Last' }

  return (
    <li className={styles['mobile-toggle']}>
      <Comp
        ref={ref}
        className={cx(
          styles['last-button'],
          styles[variant],
          styles['rounded-right'],
          'pager-last',
          className
        )}
        disabled={disabled}
        title="Last"
        data-testid="pager-last"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <DoubleArrowRightIcon />}
      </Comp>
    </li>
  )
}

LastButton.displayName = 'LastButton'
