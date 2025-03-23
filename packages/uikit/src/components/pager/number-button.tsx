'use client'
import type React from 'react'

import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

import { usePager } from './pagination'

import type { PagerButtonProps, RefType } from './pagination'

import styles from './pagination.module.css'

export type NumberButtonProps = PagerButtonProps & {
  page: number | null
  activeClassName?: string
  selected?: boolean
}

export const NumberButton = ({
  ref,
  page,
  className,
  disabled,
  activeClassName,
  asChild,
  children,
  ...rest
}: NumberButtonProps & {
  ref?: React.RefObject<RefType>
}) => {
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)
  const {
    variant,
    currentPage,
    count,
    showFirstButton,
    showLastButton,
    hideNextButton,
    hidePrevButton,
  } = usePager()

  const active = page === currentPage

  return (
    <li className="flex">
      <Comp
        ref={ref}
        className={cx(
          styles['number-button'],
          [styles[variant]],
          { [styles.active]: active === true },
          {
            [styles['rounded-left']]:
              page === 1 && !(showFirstButton ?? false) && (hidePrevButton ?? false),
          },
          {
            [styles['rounded-right']]:
              page === count && !(showLastButton ?? false) && (hideNextButton ?? false),
          },
          'pager-number',
          className
        )}
        data-testid={
          cx({
            'pager-number-active': currentPage === page,
            [`pager-number-${page}`]: currentPage !== page,
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

NumberButton.displayName = 'NumberButton'
