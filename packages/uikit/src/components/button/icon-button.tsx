'use client'

import type React from 'react'

import cx from 'classnames'

import { Button } from './button'
import styles from './button.module.css'
import type { ButtonProps } from './button.js'

type IconButtonProps<C extends React.ElementType = 'button'> = ButtonProps<C> & {
  square?: boolean
  round?: boolean
}

export const IconButton = <C extends React.ElementType = 'button'>({
  square = false,
  round = true,
  variant,
  size = 'sm',
  intent,
  className,
  children,
  ...rest
}: IconButtonProps<C>) => {
  return (
    <Button
      variant={variant}
      size={size}
      intent={intent}
      className={cx(
        'icon-button',
        variant,
        size,
        intent,
        { [styles.square]: square },
        { [styles.round]: !square && round },
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}
