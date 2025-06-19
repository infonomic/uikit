// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button.js'

import { Toast as ToastComponent } from './toast.js'

export const Toast = (): React.JSX.Element => {
  const [toast, setToast] = React.useState(false)

  const handleOpenToastClick = (): void => {
    setToast(!toast)
  }

  return (
    <>
      <div className="mb-6 max-w-[600px]">
        <Button onClick={handleOpenToastClick}>Open Toast</Button>
        <ToastComponent
          title="Note"
          iconType="success"
          intent="success"
          position="bottom-right"
          message="This is a test Toast modal that should appear when the button is clicked."
          open={toast}
          onOpenChange={setToast}
        />
      </div>
    </>
  )
}

const meta: Meta<typeof Toast> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Toast',
  component: ToastComponent,
}

export default meta
