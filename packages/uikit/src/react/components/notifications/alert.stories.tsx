// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { intent } from '../types/shared'

import { Alert } from './index'

const meta: Meta<typeof Alert> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Alert',
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

const AllVariants = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6 max-w-[600px]">
        {intent.map((intent: string) => {
          if (intent !== 'noeffect') {
            return (
              <Alert intent={intent} key={intent}>
                This is a {intent} alert - with some additional text here.
              </Alert>
            )
          }
          return null
        })}
        <Alert intent="info" title="This is a title">
          This is an info alert with a title and with some additional text here.
        </Alert>
      </div>
    </>
  )
}

export const All: Story = {
  render: () => <AllVariants />,
}
