// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { DangerIcon } from './danger-icon.js'
import { InfoIcon } from './info-icon.js'
import { SuccessIcon } from './success-icon.js'
import { WarningIcon } from './warning-icon.js'

export default {
  title: 'Icons/Sprites',
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <div className="mb-6">
      <div className="max-w-[800px] grid grid-cols-12">
        <InfoIcon />
        <WarningIcon />
        <SuccessIcon />
        <DangerIcon />
      </div>
    </div>
  )
}
