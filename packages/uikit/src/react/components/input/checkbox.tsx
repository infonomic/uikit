'use client'

import type * as React from 'react'

import { CheckIcon } from '@radix-ui/react-icons'
import cx from 'classnames'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { Label as LabelPrimitive } from 'radix-ui'
import { twMerge } from 'tailwind-merge'

import objectsToString from '../../utils/objectsToString'
import { checkbox } from './styles/checkbox'

import type { ClassName, Intent, Size, Variant } from './types/checkbox'

import { HelpText } from './help-text'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  name: string
  label: string
  variant?: Variant
  size?: Size
  intent?: Intent
  checked?: boolean
  className?: ClassName
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
  variant,
  size,
  intent,
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
  // 1. init
  const { defaultProps, styles } = checkbox
  const { base, variants, sizes } = styles

  // 2. set default props
  variant = variant ?? defaultProps.variant
  intent = intent ?? defaultProps.intent
  size = size ?? defaultProps.size
  className = className ?? defaultProps.className

  // 3. set styles
  const checkboxBase = objectsToString(base.initial)
  const checkboxSize = objectsToString(sizes[size as keyof object])
  const checkboxVariant = objectsToString(variants[variant as keyof object][intent])
  // NOTE: make sure inputVariant comes after size - so that it can override padding
  const classes = twMerge(cx(checkboxBase, checkboxSize, checkboxVariant), className)

  const containerClassesMerged = twMerge('flex items-center', containerClasses)

  const labelClassesMerged = twMerge(
    'ml-3 cursor-pointer select-none font-medium text-gray-800 dark:text-gray-400',
    labelClasses
  )

  return (
    <div>
      <div className={containerClassesMerged}>
        <CheckboxPrimitive.Root ref={ref} id={id} name={name} className={classes} {...rest}>
          <CheckboxPrimitive.Indicator forceMount className="component--checkbox-indicator">
            <CheckIcon className="component--checkbox-icon h-[20px] w-[20px] self-center text-white dark:text-black" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <LabelPrimitive.Label htmlFor={id} className={labelClassesMerged}>
          {label}
        </LabelPrimitive.Label>
      </div>
      {error ? (
        <p id={`error-for-${id}`} className="mb-1 mt-1 text-sm text-red-700">
          {errorText ?? helpText}
        </p>
      ) : (
        helpText?.length > 0 && <HelpText text={helpText} />
      )}
    </div>
  )
}
