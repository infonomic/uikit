'use client'

import type * as React from 'react'

import { CheckIcon } from '@radix-ui/react-icons'
import cx from 'classnames'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { Label as LabelPrimitive } from 'radix-ui'

import { ErrorText } from './error-text'
import { HelpText } from './help-text'
import type { Intent, Size, Variant } from './types/checkbox'

import styles from './checkbox.module.css'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  name: string
  label: string
  variant?: Variant
  size?: Size
  intent?: Intent
  reverse?: boolean
  checked?: boolean
  className?: string
  containerClasses?: string
  labelClasses?: string
  error?: boolean
  helpText?: string
  errorText?: string
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
}

export const Checkbox = function Checkbox({
  ref,
  id,
  name,
  label,
  variant = 'outlined',
  size = 'md',
  intent = 'primary',
  reverse = false,
  className,
  containerClasses,
  labelClasses,
  error = false,
  helpText = '',
  errorText = '',
  ...rest
}: Props & {
  ref?: React.RefObject<HTMLButtonElement>
}): React.JSX.Element {
  return (
    <div>
      <div className={cx(styles.container, containerClasses, { [styles.reverse]: reverse })}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          name={name}
          className={cx(styles.checkbox, styles[variant], styles[size], styles[intent], className)}
          {...rest}
        >
          <CheckboxPrimitive.Indicator forceMount className={styles.indicator}>
            <CheckIcon className={styles.icon} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <LabelPrimitive.Label htmlFor={id} className={cx(styles.label, labelClasses)}>
          {label}
        </LabelPrimitive.Label>
      </div>
      {error ? (
        <ErrorText id={`error-for-${id}`} text={errorText ?? helpText} />
      ) : (
        helpText?.length > 0 && <HelpText text={helpText} />
      )}
    </div>
  )
}
