import type React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { IconElement } from './icon-element.js'

import type { IconProps } from './types/icon.js'

const svgStylesDefault = ''

export const EthPurpleIcon = ({
  className,
  svgClassName,
  ...rest
}: IconProps): React.JSX.Element => {
  const applied = twMerge(svgStylesDefault, svgClassName)

  return (
    <IconElement className={cx('eth-purple-icon', className)} {...rest}>
      <svg
        className={applied}
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 327.5 533.3"
      >
        <path fill="#8A92B2" className="st0" d="M163.7,197.2V0L0,271.6L163.7,197.2z" />
        <path
          fill="#62688F"
          className="st1"
          d="M163.7,368.4V197.2L0,271.6L163.7,368.4z M163.7,197.2l163.7,74.4L163.7,0V197.2z"
        />
        <path fill="#454A75" className="st2" d="M163.7,197.2v171.2l163.7-96.8L163.7,197.2z" />
        <path fill="#8A92B2" className="st0" d="M163.7,399.4L0,302.7l163.7,230.7V399.4z" />
        <path fill="#62688F" className="st1" d="M327.5,302.7l-163.8,96.7v134L327.5,302.7z" />
      </svg>
    </IconElement>
  )
}

EthPurpleIcon.displayName = 'EthPurpleIcon'
