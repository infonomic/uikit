'use client'

import type React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import cx from 'classnames'
import { Select as SelectPrimitive } from 'radix-ui'

import { Button } from '../button/button'

import type { Size, Variant } from '../button/types/button'
import type { Intent } from '../types/shared'

export interface SelectValue {
  label: string
  value: string
  prefix?: string
  suffix?: string
}

type SelectProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  id?: string
  intent?: Intent
  variant?: Variant
  size?: Size
  placeholder?: string
  position?: 'item-aligned' | 'popper'
  containerClassName?: string
  className?: string
  disabledValue?: string
  ariaLabel?: string
  helpText?: string
}

export function Select({
  id,
  children,
  placeholder,
  disabledValue,
  intent,
  variant,
  size,
  position,
  containerClassName,
  className,
  ariaLabel,
  helpText,
  ...rest
}: SelectProps): React.JSX.Element {
  return (
    <div className={cx(containerClassName)}>
      <SelectPrimitive.Root {...rest}>
        <SelectPrimitive.Trigger asChild aria-label={ariaLabel ?? 'Select'}>
          <Button
            id={id}
            intent={intent}
            variant={variant}
            size={size}
            className={cx('whitespace-nowrap', className)}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </Button>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position={position}
            className="select-content z-50"
            ref={(ref) => {
              if (ref == null) return
            }}
          >
            <SelectPrimitive.ScrollUpButton className="select-scroll-button">
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="select-viewport z-50 mt-[2px] border dark:border-canvas-700 shadow rounded-[6px] bg-white p-2 dark:bg-canvas-800">
              <SelectPrimitive.Group className="z-50">{children}</SelectPrimitive.Group>
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="select-scroll-button flex items-center justify-center text-gray-700 dark:text-gray-300">
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {helpText != null && helpText?.length > 0 && (
        <p className="mb-1 mt-1 text-sm text-gray-700 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  )
}

export const SelectItem = ({
  ref: forwardedRef,
  children,
  className,
  ...props
}: SelectPrimitive.SelectItemProps & {
  ref?: React.RefObject<React.ComponentRef<'div'>>
}) => {
  return (
    <SelectPrimitive.Item
      className={cx(
        'relative select-none',
        'data-[disabled]:text-gray-100 data-[disabled]:pointer-events-none',
        'data-[highlighted]:outline-none data-[highlighted]:bg-gray-200 data-[highlighted]:text-black',
        'dark:data-[highlighted]:bg-canvas-700 data-[highlighted]:text-black',
        'text-[15px] leading-none text-black dark:text-gray-300 ',
        'rounded-[3px] flex items-center h-[32px] pr-[35px] pl-[25px]',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

SelectItem.displayName = 'SelectItem'
