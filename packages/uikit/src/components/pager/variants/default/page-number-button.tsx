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

  const defaultBackground = cx(
    'bg-white text-gray-900 hover:bg-primary-600 hover:text-white text-sm',
    'dark:bg-canvas-700 dark:text-gray-200 dark:hover:bg-primary-600 dark:hover:text-white'
  )
  const activeBackground = cx(
    'bg-primary-600 text-white dark:bg-primary-600 dark:text-white text-sm',
    activeClassName
  )

  const classes = twMerge(
    cx(
      'flex items-center justify-center min-w-[42px] h-[32px] leading-tight text-center border border-primary-500 select-none dark:border-canvas-600',
      { 'cursor-default': disabled },
      roundedFirstClasses,
      roundedLastClasses,
      { [defaultBackground]: !active },
      { [activeBackground]: active }
    ),
    className
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
