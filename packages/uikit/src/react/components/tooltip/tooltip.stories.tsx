// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { type Meta, type StoryObj } from '@storybook/react'

import { Button } from '../button/button.js'
import { Tooltip } from '../tooltip/tooltip.js'

const meta: Meta<typeof Tooltip> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Tooltip',
  component: Tooltip
}

export default meta

type Story = StoryObj<typeof Tooltip>

const Demo = (): React.JSX.Element => {
  return (
    <>
      <div
        style={{
          maxWidth: '100px',
          marginLeft: '12rem',
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '46px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
      >
        <Tooltip text="I'm a tooltip" side="top" sideOffset={5}>
          <Button fullWidth={true} size="sm">
            Top
          </Button>
        </Tooltip>
        <Tooltip text="I'm a tooltip" side="left" sideOffset={5}>
          <Button fullWidth={true} size="sm">
            Left
          </Button>
        </Tooltip>
        <Tooltip text="I'm a tooltip" side="right" sideOffset={5}>
          <Button fullWidth={true} size="sm">
            Right
          </Button>
        </Tooltip>
        <Tooltip text="I'm a tooltip" side="bottom" sideOffset={5}>
          <Button fullWidth={true} size="sm">
            Bottom
          </Button>
        </Tooltip>
      </div>
    </>
  )
}

export const All: Story = {
  render: () => <Demo />
}
