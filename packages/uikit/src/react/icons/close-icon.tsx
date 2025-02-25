import type React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { IconElement } from './icon-element.js'

import type { IconProps } from './types/icon.js'

const svgStylesDefault = 'fill-gray-600 dark:fill-gray-200'

export const CloseIcon = ({ className, svgClassName, ...rest }: IconProps): React.JSX.Element => {
  const applied = twMerge(svgStylesDefault, svgClassName)

  return (
    <IconElement className={cx('close-icon', className)} {...rest}>
      <svg
        className={applied}
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
      </svg>
    </IconElement>
  )
}

CloseIcon.displayName = 'CloseIcon'
