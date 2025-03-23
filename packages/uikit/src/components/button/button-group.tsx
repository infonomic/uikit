'use client'

import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import React, { type Ref, type ComponentPropsWithoutRef, useState } from 'react'

import cx from 'classnames'

import type { EnableRipple, Intent, Size, Variant } from './@types/button'
import { Button } from './button'

import styles from './button-group.module.css'

interface ButtonGroupContextType {
  variant?: Variant
  size?: Size
  ripple?: EnableRipple
  expandToFit?: boolean
  active?: Intent
  inactive?: Intent
  value?: string | string[]
}

const ButtonGroupContext = React.createContext<ButtonGroupContextType>({
  size: 'md',
  variant: 'filled',
  ripple: true,
  expandToFit: false,
  active: 'primary',
  inactive: 'noeffect',
})

type ToggleGroupRootProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>

// Create separate props for single and multiple modes
type SingleToggleGroupProps = Omit<ToggleGroupRootProps, 'type' | 'value' | 'onValueChange'> & {
  type: 'single'
  value?: string
  onValueChange?: (value: string) => void
}

type MultipleToggleGroupProps = Omit<ToggleGroupRootProps, 'type' | 'value' | 'onValueChange'> & {
  type: 'multiple'
  value?: string[]
  onValueChange?: (value: string[]) => void
}

export type ButtonGroupProps = (SingleToggleGroupProps | MultipleToggleGroupProps) & {
  onValueChange?: (value: string | string[]) => void
  ref?: Ref<HTMLDivElement>
} & ButtonGroupContextType

// Updated to use ref as a prop and not React.forwardRef
const ButtonGroup = ({
  className,
  variant = 'filled',
  size = 'md',
  ripple = true,
  expandToFit = false,
  active = 'primary',
  inactive = 'noeffect',
  type,
  onValueChange,
  value,
  defaultValue,
  children,
  ref,
  ...props
}: ButtonGroupProps) => {
  if (type === 'multiple') {
    return (
      <ToggleGroupPrimitive.Root
        type="multiple"
        defaultValue={defaultValue as string[]}
        value={value as string[]}
        ref={ref}
        onValueChange={onValueChange}
        className={cx(styles['button-group'], className)}
        {...props}
      >
        <ButtonGroupContext value={{ variant, size, ripple, expandToFit, active, inactive, value }}>
          {children}
        </ButtonGroupContext>
      </ToggleGroupPrimitive.Root>
    )
  }
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value as string}
      defaultValue={defaultValue as string}
      ref={ref}
      onValueChange={onValueChange}
      className={cx(styles['button-group'], className)}
      {...props}
    >
      <ButtonGroupContext value={{ variant, size, ripple, expandToFit, active, inactive, value }}>
        {children}
      </ButtonGroupContext>
    </ToggleGroupPrimitive.Root>
  )
}

ButtonGroupContext.displayName = ToggleGroupPrimitive.Root.displayName

type ButtonGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
  ref?: Ref<HTMLButtonElement> // Updated ref type
} & ButtonGroupContextType

const ButtonGroupItem = ({ className, children, value, ref, ...props }: ButtonGroupItemProps) => {
  const context = React.useContext(ButtonGroupContext)
  const active = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value

  return (
    <ToggleGroupPrimitive.Item asChild value={value} ref={ref} {...props}>
      <Button
        className={className}
        fullWidth={context.expandToFit}
        variant={context.variant}
        intent={active ? context.active : context.inactive}
        size={context.size}
        ripple={context.ripple}
      >
        {children}
      </Button>
    </ToggleGroupPrimitive.Item>
  )
}

ButtonGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ButtonGroup, ButtonGroupItem }
