// types

import type { ClassName, Close, Icon, Intent } from '../types/alert'

const intentStyles: object = {
  primary: {
    background:
      'bg-gradient-to-tr from-primary-100/20 to-primary-200/20 dark:from-primary-600/10 dark:to-primary-600/10',
    border: 'border border-primary-600/50 dark:border-primary-600/60',
    color: 'text-gray-900 dark:text-gray-200',
  },
  secondary: {
    background:
      'bg-gradient-to-tr from-secondary-500/10 to-secondary-500/10 dark:from-secondary-200/20 dark:to-secondary-200/20',
    border: 'border border-secondary-800/50 dark:border-secondary-200/60',
    color: 'text-gray-900 dark:text-gray-200',
  },
  info: {
    background:
      'bg-gradient-to-tr from-[#388bfd]/20 to-[#388bfd]/20 dark:from-[#388bfd]/10 dark:to-[#388bfd]/10',
    border: 'border border-[#388bfd]/50 dark:border-[#388bfd]/60',
    color: 'text-gray-900 dark:text-gray-200',
  },
  success: {
    background:
      'bg-gradient-to-tr from-green-500/20 to-green-500/20 dark:from-green-500/10 dark:to-green-500/10',
    border: 'border border-green-600/50 dark:border-green-600/60',
    color: 'text-gray-900 dark:text-gray-200',
  },
  warning: {
    background:
      'bg-gradient-to-tr from-yellow-500/20 to-yellow-600/20 dark:from-yellow-600/10 dark:to-yellow-600/10',
    border: 'border border-yellow-600/50 dark:border-yellow-600/60',
    color: 'text-gray-900 dark:text-gray-200',
  },
  danger: {
    background:
      'bg-gradient-to-tr from-red-600/20 to-red-600/20 dark:from-red-600/10 dark:to-red-600/10',
    border: 'border border-red-600/50 dark:border-red-600/60',
    color: 'text-gray-900 dark:text-gray-200',
  },
}

export interface AlertStyleTypes {
  defaultProps: {
    intent: Intent
    icon: Icon
    close: Close
    className: ClassName
  }
  styles: {
    base: {
      initial: object
    }
    intents: typeof intentStyles
  }
}

export const alertStyles: AlertStyleTypes = {
  defaultProps: {
    intent: 'primary',
    icon: true,
    close: true,
    className: 'alert',
  },
  styles: {
    base: {
      initial: {
        display: 'flex gap-4 rounded-md py-4 px-4 mb-4',
        typography: 'font-base font-normal',
        width: 'w-full',
        transition: 'transition-all ease-in-out duration-300',
      },
    },
    intents: intentStyles,
  },
}
