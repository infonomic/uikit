import type React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { IconElement } from './icon-element.js'

import type { IconProps } from './types/icon.js'

const svgStylesDefault = 'fill-secondary-700 dark:fill-gray-200'

export const LedgerIcon = ({ className, svgClassName, ...rest }: IconProps): React.JSX.Element => {
  const applied = twMerge(svgStylesDefault, svgClassName)

  return (
    <IconElement className={cx('wallet-icon', className)} {...rest}>
      <svg
        className={applied}
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 147 128"
        overflow="visible"
      >
        <path
          d="M0 91.6548V128H55.293V119.94H8.05631V91.6548H0ZM138.944 91.6548V119.94H91.707V127.998H147V91.6548H138.944ZM55.3733 36.3452V91.6529H91.707V84.3842H63.4296V36.3452H55.3733ZM0 0V36.3452H8.05631V8.05844H55.293V0H0ZM91.707 0V8.05844H138.944V36.3452H147V0H91.707Z"
          fill="black"
        />
      </svg>
    </IconElement>
  )
}

LedgerIcon.displayName = 'LedgerIcon'
