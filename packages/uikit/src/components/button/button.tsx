'use client'

import type React from 'react'

import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
// @ts-expect-error
import Ripple from 'material-ripple-effects'

import styles from './button.module.css'
import type { Intent, Size, Variant } from './@types/button.js'

export type ButtonRefType<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

type AsButton = { asChild?: false } & React.ComponentPropsWithoutRef<'button'>

interface AsSlot {
  asChild?: true
}

export type ButtonProps<C extends React.ElementType = 'button'> = {
  variant?: Variant
  size?: Size
  type?: 'submit' | 'reset' | 'button'
  intent?: Intent
  fullWidth?: boolean
  ripple?: boolean
  className?: string
  children: React.ReactNode
  ref?: React.RefObject<ButtonRefType<C>>
} & (AsButton | AsSlot) &
  React.HTMLAttributes<HTMLElement>

export const Button = <C extends React.ElementType = 'button'>({
  variant = 'filled',
  size = 'md',
  type = 'button',
  intent = 'primary',
  fullWidth = false,
  ripple = true,
  className,
  children,
  asChild,
  ref,
  ...rest
}: ButtonProps<C>) => {
  const Comp: React.ElementType = asChild != null && asChild === true ? Slot : 'button'

  let onMouseDown: React.MouseEventHandler<HTMLButtonElement> | undefined
  if (ripple === true) {
    const rippleEffect = new Ripple()
    onMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (rest.onMouseDown) {
        ;(rest.onMouseDown as React.MouseEventHandler<HTMLButtonElement>)(e)
      }
      rippleEffect.create(e, variant === 'filled' || variant === 'gradient' ? 'light' : 'dark')
    }
  }

  return (
    <Comp
      ref={ref}
      type={type}
      className={cx(
        'button',
        intent,
        variant,
        size,
        styles.button,
        styles[variant],
        styles[size],
        styles[intent],
        { [styles.fullWidth]: fullWidth === true },
        className
      )}
      onMouseDown={onMouseDown}
      {...rest}
    >
      {children}
    </Comp>
  )
}
