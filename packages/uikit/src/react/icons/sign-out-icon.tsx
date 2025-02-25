import type React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { IconElement } from './icon-element.js'

import type { IconProps } from './types/icon.js'

const svgStylesDefault = 'fill-none stroke-gray-700 dark:stroke-gray-300'

export const SignOutIcon = ({ className, svgClassName, ...rest }: IconProps): React.JSX.Element => {
  const applied = twMerge(svgStylesDefault, svgClassName)

  return (
    <IconElement className={cx('sign-out-icon', className)} {...rest}>
      <svg
        className={applied}
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
    </IconElement>
  )
}

SignOutIcon.displayName = 'SignOutIcon'
