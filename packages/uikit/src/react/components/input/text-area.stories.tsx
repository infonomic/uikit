// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'
import { useState } from 'react'

import { TextArea } from './index'

export default {
  title: 'Components/Input/TextArea',
  component: TextArea,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[400px]">
          <TextArea
            required
            id="message"
            name="message"
            rows={5}
            label="Message"
            helpText="Please enter a message."
            disabled={false}
            error={false}
          />
        </div>
      </div>
    </>
  )
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[400px]">
          <TextArea
            required
            id="message"
            name="message"
            rows={5}
            label="Message"
            helpText="Please enter a message."
            disabled={false}
            error={true}
            errorText="Messages must be longer than 15 characers..."
          />
        </div>
      </div>
    </>
  )
}
