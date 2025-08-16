'use client'

import cx from 'classnames'
import type React from 'react'
import { Button } from './button'
import type { ButtonProps } from './button.js'

import styles from './button.module.css'

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
