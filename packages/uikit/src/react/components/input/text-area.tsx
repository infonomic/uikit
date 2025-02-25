import type * as React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

import { HelpText } from './help-text'
import { Label } from './label'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  name: string
  label: string
  required?: boolean
  rows: number
  placeHolder?: string
  autoComplete?: string
  error?: boolean
  helpText?: string
  errorText?: string
  className?: string
  ref?: React.RefCallback<HTMLTextAreaElement | null> | React.RefObject<HTMLTextAreaElement | null>
}

export const TextArea = function TextArea({
  ref,
  id,
  name,
  label,
  rows = 4,
  required = false,
  placeHolder = '',
  autoComplete = 'off',
  error = false,
  helpText = '',
  errorText = '',
  className,
  ...rest
}: TextAreaProps): React.JSX.Element {
  const classes = twMerge(
    cx(
      'block w-full py-1 px-3',
      'rounded-md border border-primary-500 bg-gray-25/50 dark:border-primary-500 dark:bg-canvas-800/80',
      'text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-300',
      'hover:focus:outline-none hover:border-primary-600 dark:hover:border-primary-300',
      'focus:outline-none focus-visible:outline-none focus:border-primary-500 dark:focus:border-primary-700  focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-500 dark:ring-offset-canvas-900',
      'active:outline-none active:border-primary-500 dark:active:border-primary-700 active:ring-1 active:ring-offset-1 active:ring-primary-500 dark:ring-primary-500 dark:ring-offset-canvas-900'
    ),
    className
  )

  return (
    <fieldset className="mb-3">
      <Label id={id} htmlFor={id} required={required} label={label} />
      <textarea
        ref={ref}
        id={id}
        name={name}
        required={required}
        rows={rows}
        autoComplete={autoComplete}
        placeholder={placeHolder}
        aria-labelledby={`label-for-${id}`}
        aria-invalid={error}
        aria-required={required}
        aria-errormessage={errorText}
        aria-describedby={error ? `error-for-${id}` : undefined}
        className={classes}
        {...rest}
      />
      {error ? (
        <p id={`error-for-${id}`} className="mt-1 text-sm text-red-700">
          {errorText ?? helpText}
        </p>
      ) : (
        <HelpText text={helpText} />
      )}
    </fieldset>
  )
}
