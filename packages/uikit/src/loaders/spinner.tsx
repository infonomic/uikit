// https://github.com/JoshK2/react-spinners-css
import type React from 'react'

import classNames from 'classnames'

import type { LoaderProps } from './types/index.js'

type SpinnerProps = Omit<LoaderProps, 'size'>

export function LoaderSpinner({ color, className, style }: SpinnerProps): React.JSX.Element {
  const circles = [...Array(12)].map((_, index) => {
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <div key={index}>
        <div
          className={classNames('div-after')}
          style={{ backgroundColor: color ? color : 'var(--loader-color)' }}
        />
      </div>
    )
  })

  return (
    <div className={classNames('lds-spinner', className)} style={{ ...style }}>
      {circles}
    </div>
  )
}
