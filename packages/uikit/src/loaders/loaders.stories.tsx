// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { LoaderEllipsis } from './ellipses.js'
import { LoaderRing } from './ring.js'
import { LoaderSpinner } from './spinner.js'

interface LoaderProps {
  loader: React.JSX.Element
  label: string
}

function Loader({ loader, label }: LoaderProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center">
      {loader}
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  )
}

const LoaderDemo = (): React.JSX.Element => (
  <div className="loader-demo grid grid-cols-4 gap-5">
    <Loader loader={<LoaderRing size={48} />} label="Ring" />
    <Loader loader={<LoaderEllipsis size={48} />} label="Ellipsis" />
    <Loader loader={<LoaderSpinner />} label="Spinner" />
  </div>
)

export default {
  title: 'Loaders/All',
  component: LoaderDemo,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[700px]">
          <LoaderDemo />
        </div>
      </div>
    </>
  )
}
