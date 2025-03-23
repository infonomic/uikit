'use client'
import type React from 'react'

import cx from 'classnames'

import type { Intent, Size, Variant } from './@types/input.js'
import { ErrorText } from './error-text.js'
import { HelpText } from './help-text.js'
import { Label } from './label.js'

import type { InputAdornmentProps } from './input-adornment.js'

import styles from './input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  label?: string
  variant?: Variant
  inputSize?: Size
  intent?: Intent
  required?: boolean
  type?: string
  placeHolder?: string
  autoComplete?: string
  startAdornment?: React.ReactElement<InputAdornmentProps>
  endAdornment?: React.ReactElement<InputAdornmentProps>
  error?: boolean
  helpText?: string
  errorText?: string
  className?: string
  ref?: React.RefCallback<HTMLInputElement | null> | React.RefObject<HTMLInputElement | null>
}

export const Input = <C extends React.ElementType = 'input'>({
  ref,
  id,
  name,
  type = 'text',
  variant = 'outlined',
  inputSize = 'md',
  intent = 'primary',
  required,
  label,
  startAdornment,
  endAdornment,
  placeHolder = '',
  autoComplete = 'off',
  error = false,
  helpText = '',
  errorText = '',
  className,
  ...rest
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label != null && <Label id={id} htmlFor={id} required={required} label={label} />}
      <div className={styles.inputContainer}>
        {startAdornment != null && (
          <div className={cx(styles.startAdornment, styles[variant])}>{startAdornment}</div>
        )}
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeHolder}
          aria-labelledby={`label-for-${id}`}
          aria-invalid={error}
          aria-required={required}
          aria-errormessage={errorText}
          aria-describedby={error ? `error-for-${id}` : undefined}
          className={cx(
            styles.input,
            styles[variant],
            styles[inputSize],
            styles[intent],
            { [styles.startAdornmentPadding]: startAdornment != null },
            { [styles.endAdornmentPadding]: endAdornment != null },
            { [styles.error]: error },
            className
          )}
          {...rest}
        />
        {endAdornment != null && (
          <div className={cx(styles.endAdornment, styles[variant])}>{endAdornment}</div>
        )}
      </div>
      {error ? (
        <ErrorText id={`error-for-${id}`} text={errorText ?? helpText} />
      ) : (
        helpText?.length > 0 && <HelpText text={helpText} />
      )}
    </div>
  )
}
