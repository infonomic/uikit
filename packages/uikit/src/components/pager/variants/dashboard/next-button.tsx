'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react'

import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { PagerContext } from '../../pagination'

import type { PagerButtonProps, RefType } from '../../pagination'

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
  const { showLastButton } = React.useContext(PagerContext)

  const hoverClasses =
    'hover:bg-primary-800 hover:text-white dark:hover:bg-canvas-700 dark:hover:text-white'

  const classes = twMerge(
    cx(
      'previous flex items-center justify-center h-[32px] w-[32px] leading-tight border',
      'bg-gray-100 text-gray-700 text-sm',
      'dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400',
      { 'cursor-default': disabled },
      { [hoverClasses]: !disabled },
      { 'rounded-r-md': !(showLastButton ?? false) }
    ),
    className
  )

  const aria = disabled ? { 'aria-disabled': true } : { 'aria-label': 'Next' }

  return (
    <li className="hidden sm:flex">
      <Comp
        ref={ref}
        className={classes}
        disabled={disabled}
        title="Next"
        data-testid="next-page-button"
        {...aria}
        {...rest}
      >
        {(asChild ?? false) ? children : <ChevronRightIcon />}
      </Comp>
    </li>
  )
}

NextButton.displayName = 'NextButton'
