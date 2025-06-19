// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Overlay } from './overlay.js'

const meta: Meta<typeof Overlay> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Overlay',
  component: Overlay,
}

export default meta

type Story = StoryObj<typeof Overlay>

export const Default: Story = {
  render: () => <Overlay />,
}

export const Interactive: Story = {
  args: {
    isUnmounting: false,
  },
}
