import cx from 'classnames'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import type React from 'react'
import type { Intent } from '../@types/shared'
import styles from './radio-group.module.css'

export interface RadioGroupValue {
  id: string
  value: string
  label: string
}

export const RadioGroupItem = ({
  intent = 'primary',
  className,
  id,
  value,
  label,
  ref: forwardedRef,
  ...props
}: RadioGroupPrimitive.RadioGroupItemProps & {
  intent?: Intent
  className?: string
  id: string
  value: string
  label: string
  ref?: React.RefObject<React.ComponentRef<'div'>>
}) => {
  return (
    <div ref={forwardedRef} className={styles['item-container']}>
      <RadioGroupPrimitive.Item
        {...props}
        className={cx(styles.item, styles[intent])}
        value={value}
        id={id}
      >
        <RadioGroupPrimitive.Indicator className={styles.indicator} />
      </RadioGroupPrimitive.Item>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export const RadioGroup = ({
  ref: forwardedRef,
  className,
  direction = 'column',
  children,
  ...props
}: RadioGroupPrimitive.RadioGroupProps & {
  direction?: 'row' | 'column'
  className?: string
  children: React.ReactNode
  ref?: React.RefObject<React.ComponentRef<'div'>>
}) => (
  <RadioGroupPrimitive.Root
    ref={forwardedRef}
    className={styles[direction]}
    // aria-label="View density"
    {...props}
  >
    {children}
  </RadioGroupPrimitive.Root>
)
