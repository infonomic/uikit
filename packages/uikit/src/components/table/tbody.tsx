import type * as React from 'react'

export type TableBodyProps = React.JSX.IntrinsicElements['tbody']

export const TableBody = function TableBody({
  ref,
  className,
  children,
  ...rest
}: TableBodyProps & {
  ref?: React.RefObject<HTMLTableSectionElement>
}): React.JSX.Element {
  return (
    <tbody ref={ref} className={className} {...rest}>
      {children}
    </tbody>
  )
}
