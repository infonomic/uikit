'use client'
import React from 'react'
import cx from 'classnames'
import { Slot } from '@radix-ui/react-slot'
// @ts-ignore
import Ripple from 'material-ripple-effects'

import type { Variant, Intent, Size } from './types/button.js'

import styles from './button.module.css'

// Define the ref type based on asChild prop
type RefType = React.Ref<HTMLButtonElement> | React.Ref<HTMLElement>

// Your existing types...
type AsButton = { asChild?: false } & React.ComponentPropsWithoutRef<'button'>

// Or AsSlot
interface AsSlot {
  asChild?: true
}

export type ButtonProps = {
  variant?: Variant
  size?: Size
  type?: 'submit' | 'reset' | 'button'
  intent?: Intent
  fullWidth?: boolean
  ripple?: boolean
  className?: string
  children: React.ReactNode
  ref?: React.RefObject<RefType>
} & (AsButton | AsSlot)

export const Button = ({
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
}: ButtonProps) => {
  const Comp = asChild != null ? Slot : ('button' as React.ElementType)

  let onMouseDown: React.MouseEventHandler<HTMLButtonElement> | undefined
  if (ripple != null && ripple === true) {
    const rippleEffect = ripple !== undefined && new Ripple()
    onMouseDown = (e: any) => {
      // @ts-expect-error: ignore
      onMouseDown = rest?.onMouseDown
      rippleEffect.create(e, variant === 'filled' || variant === 'gradient' ? 'light' : 'dark')
      typeof onMouseDown === 'function' && onMouseDown(e)
    }
  }

  return (
    <Comp
      ref={ref}
      type={type}
      className={cx(
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
