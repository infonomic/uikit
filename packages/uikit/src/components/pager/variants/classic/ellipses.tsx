'use client'
import type React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

export function Ellipses({ className }: { className?: string }): React.JSX.Element {
  const classes = twMerge(
    cx(
      'flex h-[32px] min-w-[38px] items-center justify-center',
      'cursor-default select-none border leading-tight',
      'bg-white text-gray-700',
      'dark:border-canvas-700 dark:bg-canvas-800 dark:text-gray-400'
    ),
    className
  )

  return (
    <li className="flex">
      <div className={classes}>...</div>
    </li>
  )
}
