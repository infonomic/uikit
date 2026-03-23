'use client'

import type React from 'react'

import { Select as SelectPrimitive } from '@base-ui/react/select'
import cx from 'classnames'

import { CheckIcon } from '../../icons/check-icon.js'
import { ChevronDownIcon } from '../../icons/chevron-down-icon.js'
import { ChevronUpIcon } from '../../icons/chevron-up-icon.js'
import { Button } from '../button/button.js'
import { HelpText } from './help-text.js'
import styles from './select.module.css'
import type { Intent } from '../@types/shared.js'
import type { Size, Variant } from '../button/@types/button.js'

export interface SelectValue {
  label: string
  value: string
  prefix?: string
  suffix?: string
}

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
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
    <div className={cx('infonomic-select-container', containerClassName)}>
      <SelectPrimitive.Root {...rest}>
        <SelectPrimitive.Trigger
          aria-label={ariaLabel ?? 'Select'}
          render={
            <Button
              id={id}
              intent={intent}
              variant={variant}
              size={size}
              className={cx('whitespace-nowrap', className)}
            />
          }
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            className={styles.positioner}
            alignItemWithTrigger={position !== 'popper'}
          >
            <SelectPrimitive.ScrollUpArrow className={styles['scroll-arrow']}>
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpArrow>
            <SelectPrimitive.Popup className={cx(styles.popup, size != null && styles[`popup-${size}`])}>
              <SelectPrimitive.List className={styles.list}>
                {children}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
            <SelectPrimitive.ScrollDownArrow className={styles['scroll-arrow']}>
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownArrow>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {helpText != null && helpText?.length > 0 && <HelpText text={helpText} />}
    </div>
  )
}

export const SelectItem = ({
  ref: forwardedRef,
  children,
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  ref?: React.RefObject<HTMLDivElement>
}) => {
  return (
    <SelectPrimitive.Item
      className={cx('infonomic-select-item', styles['select-item'], className)}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        className={cx('infonomic-select-item-indicator', styles['select-item-indicator'])}
      >
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

SelectItem.displayName = 'SelectItem'
