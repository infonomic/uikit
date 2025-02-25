import type React from 'react'

import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

type InputAdornmentIntrinsicProps = React.JSX.IntrinsicElements['div']
export interface InputAdornmentProps extends InputAdornmentIntrinsicProps {
  className?: string
  position?: 'start' | 'end'
  margins?: boolean
  children: React.ReactNode
}

export function InputAdornment({
  position = 'start',
  margins = true,
  className,
  children,
  ...rest
}: InputAdornmentProps): React.JSX.Element {
  const classes = cx(
    'flex items-center whitespace-nowrap',
    position === 'start' ? 'ml-[4px] justify-start' : 'mr-[4px] justify-end'
  )
  const merged = twMerge(classes, className)

  return (
    <div className={merged} {...rest}>
      {children}
    </div>
  )
}
