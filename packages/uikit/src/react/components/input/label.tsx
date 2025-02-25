import type React from 'react'

import { twMerge } from 'tailwind-merge'

interface LabelProps {
  className?: string
  id: string
  htmlFor: string
  label: string
  required?: boolean
}

export function Label({ className, id, htmlFor, label, required }: LabelProps): React.JSX.Element {
  const classNames = twMerge('block font-medium text-gray-800 dark:text-gray-500', className)

  return (
    <label id={`label-for-${id}`} htmlFor={htmlFor} className={classNames}>
      {label}
      {required != null && <span className="text-red-600">&nbsp;*</span>}
    </label>
  )
}
