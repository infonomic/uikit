// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { Search } from './search.js'

export default {
  title: 'Widgets/Search',
  component: Search,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <div className="max-w-[400px]">
      <Search variant="underlined" />
    </div>
  )
}
