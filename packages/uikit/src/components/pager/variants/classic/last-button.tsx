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
    'hover:bg-primary-400 hover:text-white dark:hover:bg-canvas-700 dark:hover:text-white'

  const classes = twMerge(
    cx(
      'last flex items-center justify-center h-[32px] w-[36px] leading-tight border',
      'bg-gray-100 text-gray-700 text-sm',
      'dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400',
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
