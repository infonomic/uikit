import type { Meta, StoryObj } from '@storybook/react-vite'

import { DirectionalButton, PlayButton, StopButton } from './control-buttons.js'

type Story = StoryObj<typeof DirectionalButton>

const ControlsDemo = (): React.JSX.Element => {
  return (
    <>
      <div className="ml-12 mb-6">
        <h2 style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Small</h2>
        <div className="flex items-center gap-4 mb-6">
          <DirectionalButton direction="left" size="sm" />
          <StopButton size="sm" />
          <PlayButton size="sm" />
          <DirectionalButton direction="right" size="sm" />
          <DirectionalButton direction="up" size="sm" />
          <DirectionalButton direction="down" size="sm" />
        </div>
      </div>
      <div className="ml-12 mb-6">
        <h2 style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Medium</h2>
        <div className="flex items-center gap-4 mb-6">
          <DirectionalButton direction="left" size="md" />
          <StopButton size="md" />
          <PlayButton size="md" />
          <DirectionalButton direction="right" size="md" />
          <DirectionalButton direction="up" size="md" />
          <DirectionalButton direction="down" size="md" />
        </div>
      </div>
      <div className="ml-12 mb-6">
        <h2 style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Large</h2>
        <div className="flex items-center gap-4 mb-6">
          <DirectionalButton direction="left" size="lg" />
          <StopButton size="lg" />
          <PlayButton size="lg" />
          <DirectionalButton direction="right" size="lg" />
          <DirectionalButton direction="up" size="lg" />
          <DirectionalButton direction="down" size="lg" />
        </div>
      </div>
    </>
  )
}

export const Controls: Story = {
  render: () => <ControlsDemo />,
}

const meta: Meta<typeof DirectionalButton> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Button',
  component: ControlsDemo,
}

export default meta
