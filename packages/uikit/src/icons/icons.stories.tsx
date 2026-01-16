// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

const IconsDemo = (): React.JSX.Element => (
  <div className="loader-demo grid grid-cols-8 gap-2">{/* Icons here. */}</div>
)

export default {
  title: 'Icons/All',
  component: IconsDemo,
  argTypes: {},
}

export const All = (): React.JSX.Element => {
  return (
    <div className="mb-6">
      <div className="max-w-[700px]">
        <IconsDemo />
      </div>
    </div>
  )
}
