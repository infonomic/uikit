// https://github.com/JoshK2/react-spinners-css
import type React from 'react'

import classNames from 'classnames'

import type { LoaderProps } from './types/index.js'

export function LoaderRing({ color, size = 60, className, style }: LoaderProps): React.JSX.Element {
  const circles = [...Array(4)].map((_, index) => {
    return (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        style={{
          borderColor: `${color || 'var(--loader-color)'} transparent transparent transparent`,
          width: size * 0.8,
          height: size * 0.8,
          margin: size * 0.1,
          borderWidth: size * 0.1,
        }}
      />
    )
  })

  return (
    <div
      className={classNames('lds-ring', className)}
      style={{ width: size, height: size, ...style }}
    >
      {circles}
    </div>
  )
}
