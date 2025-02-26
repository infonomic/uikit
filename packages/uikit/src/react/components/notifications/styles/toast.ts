// types
import cx from 'classnames'

import type { ClassName, Close, Icon, IconType, Intent, Position } from '../types/toast'

const intentStyles: object = {
  primary: {
    background:
      'bg-theme-25 dark:bg-canvas-900 bg-gradient-to-tr from-canvas-900/20 to-canvas-900/20',
    border: 'border border-theme-600/50',
    color: 'text-gray-900 dark:text-gray-200',
    focus:
      'focus:outline-none focus:ring-theme-500 dark:focus:ring-theme-600/20 focus:ring-1 focus:ring-offset-1 dark:ring-offset-theme-600/20',
  },
  secondary: {
    background:
      'bg-theme-25 dark:bg-canvas-900 bg-gradient-to-tr from-gray-400/10 to-gray-400/10 dark:from-canvas-800/20 dark:to-canvas-800/20',
    border: 'border border-gray-500/50',
    color: 'text-gray-800 dark:text-gray-200',
    focus:
      'focus:outline-none focus:ring-gray-400 dark:focus:ring-canvas-800/30 focus:ring-1 focus:ring-offset-1 dark:ring-offset-canvas-800/20',
  },
  success: {
    background:
      'bg-theme-25 dark:bg-canvas-900 bg-gradient-to-tr from-theme-900/20 to-theme-900/20',
    border: 'border border-theme-400',
    color: 'text-gray-900 dark:text-gray-200',
    focus:
      'focus:outline-none focus:ring-theme-400 dark:focus:ring-green-600/30 focus:ring-1 focus:ring-offset-1 dark:ring-offset-green-600/20',
  },
  info: {
    background: 'bg-theme-25 bg-gradient-to-tr from-[#388bfd]/20 to-[#388bfd]/20',
    border: 'border border-[#388bfd]/50',
    color: 'text-gray-800 dark:text-gray-200',
    focus:
      'focus:outline-none focus:ring-[#388bfd] dark:focus:ring-[#388bfd]/30 focus:ring-1 focus:ring-offset-1 dark:ring-offset-[#388bfd]/20',
  },
  warning: {
    background: 'bg-theme-25 bg-gradient-to-tr from-theme-600/20 to-theme-600/20',
    border: 'border border-theme-600/50',
    color: 'text-gray-800 dark:text-gray-200',
    focus:
      'focus:outline-none focus:ring-theme-500 dark:focus:ring-theme-600/20 focus:ring-1 focus:ring-offset-1 dark:ring-offset-theme-600/20',
  },
  danger: {
    background: 'bg-theme-25 bg-gradient-to-tr from-red-600/20 to-red-600/20',
    border: 'border border-red-600/50',
    color: 'text-gray-800 dark:text-gray-200',
    focus:
      'focus:outline-none focus:ring-red-500 dark:focus:ring-red-600/20 focus:ring-1 focus:ring-offset-1 dark:ring-offset-red-600/20',
  },
}

/**
 * NOTE! - for the swipe radix-swipe-end animations - you need to be sure that the
 * <ToastPrimitive.Provider swipeDirection='right'> in root.tsx has been set
 * to a direction that makes sense - and 'agrees' with the position
 * setting below. <ToastPrimitive.Provider swipeDirection='right'> determines
 * which mouse drag, or touch gesture direction is going to be used to
 * trigger the end animation - so for example, it would be a little strange if
 * you had <ToastPrimitive.Provider swipeDirection='left'> configured in the provider,
 * but were animating out to the right.
 */

const positionStyles: object = {
  'top-left': {
    position: 'bottom-4 md:top-[88px] md:left-4 md:right-auto md:bottom-auto md:w-full md:max-w-sm',
    transition:
      'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-left',
    swipe: 'radix-swipe-end:animate-toast-swipe-out-left',
  },
  'top-right': {
    position: 'bottom-4 md:top-[88px] md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm',
    transition:
      'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
    swipe: 'radix-swipe-end:animate-toast-swipe-out-right',
  },
  'bottom-left': {
    position: 'bottom-4 md:left-4 md:right-auto md:w-full md:max-w-sm',
    transition:
      'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-left',
    swipe: 'radix-swipe-end:animate-toast-swipe-out-left',
  },
  'bottom-right': {
    position: 'bottom-4 md:right-4 md:left-auto md:w-full md:max-w-sm',
    transition:
      'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
    swipe: 'radix-swipe-end:animate-toast-swipe-out-right',
  },
}

export interface ToastStyleTypes {
  defaultProps: {
    intent: Intent
    position: Position
    icon: Icon
    iconType: IconType
    close: Close
    className: ClassName
  }
  styles: {
    base: {
      initial: object
    }
    intents: typeof intentStyles
    positions: typeof positionStyles
  }
}

export const toastStyles: ToastStyleTypes = {
  defaultProps: {
    intent: 'success',
    position: 'top-right',
    icon: true,
    iconType: 'success',
    close: true,
    className: 'toast',
  },
  styles: {
    base: {
      initial: {
        display: 'z-50 fixed inset-x-3 w-auto rounded-md shadow-md',
        typography: 'font-base font-normal text-sm',
        radix: cx(
          'radix-state-closed:animate-toast-hide',
          'translate-x-radix-toast-swipe-move-x', // needed for continuous motion during swipe. TODO: configure swipe up and down
          'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]'
        ),
      },
    },
    intents: intentStyles,
    positions: positionStyles,
  },
}
