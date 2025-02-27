import type React from 'react'

import cx from 'classnames'

import { IconElement } from './icon-element'

import type { IconProps } from './types/icon'

import styles from './icons.module.css'

export const EllipsisIcon = ({
  className,
  svgClassName,
  ...rest
}: IconProps): React.JSX.Element => {
  const applied = cx(styles['fill-none'], styles['stroke-gray'], styles['fill-gray'], svgClassName)

  return (
    <IconElement className={cx('ellipsis-icon', className)} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={applied}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </IconElement>
  )
}

EllipsisIcon.displayName = 'EllipsisIcon'
