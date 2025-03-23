'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type React from 'react'

import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import type { PagerButtonProps, RefType } from '../../pagination'

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
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)

  const hoverClasses =
    'hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white'

  const classes = twMerge(
    cx(
      'last rounded-r-md flex items-center justify-center h-[32px] w-[38px] leading-tight border',
      'border-primary-500 bg-white text-gray-900 text-sm',
      'dark:border-canvas-600 dark:bg-canvas-700 dark:text-gray-200',
      { 'cursor-default': disabled },
      { [hoverClasses]: !disabled }
    ),
    className
  )

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'Last' }

  return (
    <li className="hidden sm:flex">
      <Comp
        ref={ref}
        className={classes}
        disabled={disabled}
        title="Last"
        data-testid="last-page-button"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <DoubleArrowRightIcon />}
      </Comp>
    </li>
  )
}

LastButton.displayName = 'LastButton'
