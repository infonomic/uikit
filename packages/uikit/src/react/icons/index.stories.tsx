// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { DangerIcon } from './danger-icon'
import { InfoIcon } from './info-icon'
import { SuccessIcon } from './success-icon'
import { WarningIcon } from './warning-icon'

export default {
  title: 'Icons/Sprites',
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[800px] grid grid-cols-12">
          <InfoIcon useSprite={true} />
          <WarningIcon useSprite={true} />
          <SuccessIcon useSprite={true} />
          <DangerIcon useSprite={true} />
        </div>
      </div>
    </>
  )
}
