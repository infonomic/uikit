'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { PagerContext } from '../../pagination'

import type { PagerButtonProps, RefType } from '../../pagination'

export type PageNumberButtonProps = PagerButtonProps & {
  page: number | null
  activeClassName?: string
  selected?: boolean
}

export const PageNumberButton = ({
  ref,
  page,
  className,
  disabled,
  activeClassName,
  asChild,
  children,
  ...rest
}: PageNumberButtonProps & {
  ref?: React.RefObject<RefType>
}) => {
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)
  const { currentPage, count, showFirstButton, showLastButton, hideNextButton, hidePrevButton } =
    React.useContext(PagerContext)

  const active = page === currentPage

  let roundedFirstClasses = ''
  if (page === 1 && !(showFirstButton ?? false) && (hidePrevButton ?? false)) {
    roundedFirstClasses = 'rounded-l-md'
  } else if (page === 1) {
    roundedFirstClasses = 'rounded-l-md sm:rounded-none' // opinionated mobile
  }

  let roundedLastClasses = ''
  if (page === count && !(showLastButton ?? false) && (hideNextButton ?? false)) {
    roundedLastClasses = 'rounded-r-md'
  } else if (page === count) {
    roundedLastClasses = 'rounded-r-md sm:rounded-none' // opinionated mobile
  }

  const defaultClasses = twMerge(
    cx(
      'bg-gray-100 text-gray-700 hover:bg-primary-800 hover:text-white text-sm',
      'dark:bg-canvas-800 dark:text-gray-400 dark:hover:bg-canvas-700 dark:hover:text-white',
      'border dark:border-canvas-700'
    ),
    className
  )

  const activeClasses = twMerge(
    'bg-primary-800 text-white dark:bg-canvas-600 dark:text-white text-sm',
    'border dark:border-canvas-700',
    activeClassName
  )

  const classes = cx(
    'flex items-center justify-center min-w-[36px] h-[32px] leading-tight text-center select-none',
    { 'cursor-default': disabled },
    roundedFirstClasses,
    roundedLastClasses,
    { [defaultClasses]: !active },
    { [activeClasses]: active }
  )

  return (
    <li className="flex">
      <Comp
        ref={ref}
        className={classes}
        data-testid={
          cx({
            'active-page-button': currentPage === page,
            [`inactive-page-button-${page}`]: currentPage !== page,
          }).length > 0 || undefined
        }
        disabled={disabled}
        aria-current={currentPage === page}
        aria-label={currentPage === page ? `Current Page, Page ${page}` : `Page ${page}`}
        {...rest}
      >
        {(asChild ?? false) ? children : <>{page}</>}
      </Comp>
    </li>
  )
}

PageNumberButton.displayName = 'PageNumberButton'
