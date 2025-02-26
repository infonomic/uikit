import type React from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import objectsToString from '../../utils/objectsToString'
import { closeButtonStyles } from './styles/index'

import type { Intent } from '../types/shared'

type ButtonProps = React.JSX.IntrinsicElements['button']
export interface CloseButtonProps extends ButtonProps {
  intent?: Intent
  onClick: (event: React.SyntheticEvent) => void
}

export const CloseButton = function CloseButton({
  ref,
  intent,
  onClick,
  className,
  children,
  ...rest
}: CloseButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>
}): React.JSX.Element {
  const closeButtonStyle = objectsToString(
    closeButtonStyles[intent as keyof typeof closeButtonStyles]
  )
  const classes = twMerge(
    cx('outline-none p-1 rounded-full transition-hover duration-300', closeButtonStyle),
    className
  )

  return (
    <button
      ref={ref}
      aria-label="Close"
      className={classes}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <Cross2Icon />
    </button>
  )
}
