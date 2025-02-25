import type React from 'react'

import { twMerge } from 'tailwind-merge'

interface HelpTextProps {
  className?: string
  text: string
}

export function HelpText({ className, text }: HelpTextProps): React.JSX.Element {
  const classNames = twMerge('mb-1 mt-1 text-sm text-gray-800 dark:text-gray-500', className)

  return <p className={classNames}>{text}</p>
}
