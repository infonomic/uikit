'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react'

import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { PagerContext } from '../../pagination'

import type { PagerButtonProps, RefType } from '../../pagination'

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
  const { showFirstButton } = React.useContext(PagerContext)

  const hoverClasses =
    'hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white'

  const classes = twMerge(
    cx(
      'previous flex items-center justify-center h-[32px] w-[36px] leading-tight border',
      'border-primary-500 bg-white text-gray-900 text-sm',
      'dark:border-canvas-600 dark:bg-canvas-700 dark:text-gray-200',
      { 'cursor-default': disabled },
      { [hoverClasses]: !disabled },
      { 'rounded-l-md': !(showFirstButton ?? false) }
    ),
    className
  )

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'Previous' }

  return (
    <li className="hidden sm:flex">
      <Comp
        ref={ref}
        className={classes}
        disabled={disabled}
        title="Previous"
        data-testid="prev-page-button"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <ChevronLeftIcon />}
      </Comp>
    </li>
  )
}

PreviousButton.displayName = 'PreviousButton'
