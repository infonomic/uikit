import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import type React from 'react'
import styles from './radio-group.module.css'

export interface RadioGroupValue {
  id: string
  value: string
  label: string
}

export const RadioGroupItem = ({
  ref: forwardedRef,
  className,
  id,
  value,
  label,
  ...props
}: RadioGroupPrimitive.RadioGroupItemProps & {
  label: string
  ref?: React.RefObject<React.ComponentRef<'div'>>
}) => {
  return (
    <div ref={forwardedRef} style={{ display: 'flex', alignItems: 'center' }}>
      <RadioGroupPrimitive.Item {...props} className={styles.Item} value={value} id={id}>
        <RadioGroupPrimitive.Indicator className={styles.Indicator} />
      </RadioGroupPrimitive.Item>
      <label className={styles.Label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export const RadioGroup = ({ children }: { children: React.ReactNode }) => (
  <form>
    <RadioGroupPrimitive.Root
      className={styles.Root}
      defaultValue="default"
      aria-label="View density"
    >
      {children}
    </RadioGroupPrimitive.Root>
  </form>
)
