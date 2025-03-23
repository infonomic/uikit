'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type React from 'react'

import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import type { PagerButtonProps, RefType } from '../../pagination'

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
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)

  const hoverClasses =
    'hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white'

  const classes = twMerge(
    cx(
      'first ml-0 flex items-center justify-center h-[32px] w-[38px] rounded-l-md leading-tight border',
      'border-primary-500 bg-white text-gray-900 text-sm',
      'dark:border-canvas-600 dark:bg-canvas-700 dark:text-gray-200',
      { 'cursor-default': disabled },
      { [hoverClasses]: !disabled }
    ),
    className
  )

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'First' }

  return (
    <li className="hidden sm:flex">
      <Comp
        ref={ref}
        className={classes}
        disabled={disabled}
        data-testid="first-page-button"
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
