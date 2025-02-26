// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/button.js'

import { Toast } from './toast.js'

const meta: Meta<typeof Toast> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Toast',
  component: Toast,
}

export default meta

const AllVariants = (): React.JSX.Element => {
  const [toast, setToast] = React.useState(true)

  const handleOpenToastClick = (): void => {
    setToast(!toast)
  }

  return (
    <>
      <div className="mb-6 max-w-[600px]">
        <Button onClick={handleOpenToastClick}>Open Toast</Button>
        <Toast
          title="Notes"
          iconType="success"
          intent="secondary"
          position="bottom-right"
          message="This is a test Toast modal that should appear when the button is clicked."
          open={toast}
          onOpenChange={setToast}
        />
      </div>
    </>
  )
}

type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: () => <AllVariants />,
}

export const Interactive: Story = {
  args: {
    intent: 'secondary',
    title: 'Interactive Toast',
    message: 'This is an interactive toast component in Storybook.',
  },
}
