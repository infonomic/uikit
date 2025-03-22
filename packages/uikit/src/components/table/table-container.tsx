import type * as React from 'react'

import cx from 'classnames'

export type TableContainerProps = React.JSX.IntrinsicElements['div']

export const TableContainer = function TableContainer({
  ref,
  className,
  children,
  ...rest
}: TableContainerProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  const classes = cx(
    'table--container break-normal overflow-hidden relative shadow-md rounded-md my-[16px] dark:border dark:border-canvas-700',
    className
  )
  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="table--scroller overflow-x-auto max-w-[calc(100vw-32px)]">{children}</div>
    </div>
  )
}
