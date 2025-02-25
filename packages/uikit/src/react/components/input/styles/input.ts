import inputFilled from './input-filled'
import inputOutlined from './input-outlined'
import inputUnderlined from './input-underlined'

import type { ClassName, Intent, Size, Variant } from '../types/input'

export interface InputStyleTypes {
  defaultProps: {
    variant: Variant
    size: Size
    intent: Intent
    className: ClassName
  }
  styles: {
    base: {
      initial: object
    }
    sizes: {
      sm: object
      md: object
      lg: object
    }
    variants: {
      outlined: typeof inputOutlined
      filled: typeof inputFilled
      underlined: typeof inputUnderlined
    }
  }
}

export const input: InputStyleTypes = {
  defaultProps: {
    variant: 'outlined',
    size: 'md',
    intent: 'primary',
    className: '',
  },
  styles: {
    base: {
      initial: {
        display: 'flex',
        gap: 'gap-2',
        align: 'items-center',
        fontFamily: 'font-base',
        fontWeight: 'font-normal',
        border: 'outline-none',
        width: 'w-full',
        transition: 'transition-all ease-in-out duration-200',
        disabled: 'disabled:opacity-70 disabled:pointer-events-none',
      },
    },
    sizes: {
      sm: {
        fontSize: 'text-sm',
        py: 'py-[5px]',
        px: 'px-2',
      },
      md: {
        fontSize: 'text-base',
        py: 'py-[7px]',
        px: 'px-2.5',
      },
      lg: {
        fontSize: 'text-lg',
        py: 'py-3',
        px: 'px-3',
      },
    },
    variants: {
      outlined: inputOutlined,
      filled: inputFilled,
      underlined: inputUnderlined,
    },
  },
}
