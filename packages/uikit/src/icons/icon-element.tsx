import type { ReactNode } from 'react'
import type React from 'react'

import styles from './icons.module.css'

import cx from 'classnames'

export interface IconElementProps extends React.ComponentProps<'div'> {
  width?: string
  height?: string
  menuItem?: boolean
  children: ReactNode
  className?: string
}

export const IconElement = (props: IconElementProps): React.JSX.Element => {
  const { className, children, width = '22px', height = '22px', menuItem = false, ...rest } = props
  return (
    <div
      style={{
        width,
        height,
        flex: `0 0 ${width}`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: menuItem != null && menuItem ? '1.2rem' : '0',
      }}
      className={cx(styles['element-root'], className)}
      {...rest}
    >
      {children}
    </div>
  )
}
