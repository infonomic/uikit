import type * as React from 'react'

import cx from 'classnames'

export type TableHeaderProps = React.JSX.IntrinsicElements['thead']

export const TableHeader = function TableHeader({
  ref,
  className,
  children,
  ...rest
}: TableHeaderProps & {
  ref?: React.RefObject<HTMLTableSectionElement>
}): React.JSX.Element {
  const classes = cx(
    'text-xs text-gray-700 uppercase bg-canvas-100 dark:bg-canvas-700 dark:text-gray-400',
    className
  )

  return (
    <thead ref={ref} className={classes} {...rest}>
      {children}
    </thead>
  )
}
