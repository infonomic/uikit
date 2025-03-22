import type * as React from 'react'

import cx from 'classnames'

export type TableFooterProps = React.JSX.IntrinsicElements['tfoot']

export const TableFooter = function TableFooter({
  ref,
  className,
  children,
  ...rest
}: TableFooterProps & {
  ref?: React.RefObject<HTMLTableSectionElement>
}): React.JSX.Element {
  const classes = cx(
    'text-xs text-gray-700 uppercase bg-canvas-100 dark:bg-canvas-700 dark:text-gray-400',
    className
  )

  return (
    <tfoot ref={ref} className={classes} {...rest}>
      {children}
    </tfoot>
  )
}
