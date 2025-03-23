'use client'
import type React from 'react'

import cx from 'classnames'

export function Ellipses(): React.JSX.Element {
  return (
    // TODO - extract ellipses component
    <li className="flex">
      <div
        className={cx(
          'flex h-[32px] min-w-[44px] items-center justify-center',
          'cursor-default select-none border leading-tight',
          'border-primary-500 bg-white text-gray-900',
          'hover:bg-primary-500 hover:text-white',
          'dark:border-canvas-600 dark:bg-canvas-700 dark:text-gray-200',
          'dark:hover:bg-primary-600 dark:hover:text-white'
        )}
      >
        ...
      </div>
    </li>
  )
}
