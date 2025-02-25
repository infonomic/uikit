import cx from 'classnames'

import inputFilled from './checkbox-filled'
import inputOutlined from './checkbox-outlined'

import type { ClassName, Intent, Size, Variant } from '../types/checkbox'

export interface CheckboxStyleTypes {
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
    }
  }
}

export const checkbox: CheckboxStyleTypes = {
  defaultProps: {
    variant: 'outlined',
    size: 'md',
    intent: 'primary',
    className: cx(
      'component--checkbox flex h-[18px] w-[18px] items-center justify-center rounded outline-none focus:outline-none'
    ),
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
      },
      md: {
        fontSize: 'text-base',
        py: 'py-[7px]',
      },
      lg: {
        fontSize: 'text-lg',
        py: 'py-3',
      },
    },
    variants: {
      outlined: inputOutlined,
      filled: inputFilled,
    },
  },
}
