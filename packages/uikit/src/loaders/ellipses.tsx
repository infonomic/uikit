// https://github.com/JoshK2/react-spinners-css
import type React from 'react'

import classNames from 'classnames'

import type { LoaderProps } from './types/index.js'

export function LoaderEllipsis({
  color = '#CCCCCC',
  size = 80,
  className,
  style,
  ...rest
}: LoaderProps): React.JSX.Element {
  const height = size * 0.5

  const circles = [...Array(4)].map((_, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <div key={index} style={{ backgroundColor: `var(--loader-color, ${color})` }} />
  ))

  return (
    <div
      className={classNames('lds-ellipsis', className)}
      style={{ ...style, width: size, height }}
      {...rest}
    >
      {circles}
    </div>
  )
}
