import type { Meta, StoryObj } from '@storybook/react-vite'

import { ComboButton } from './combo-button.js'

type Story = StoryObj<typeof ComboButton>

const options = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 3', value: 'item3' },
]

const handleButtonClick = () => {
  alert('Button clicked!')
}

const handleOptionSelect = (value: string) => {
  alert(`Selected option: ${value}`)
}

const ComboButtonDemo = (): React.JSX.Element => {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="ml-12 mb-6">
        <h2 style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Combo Button</h2>
        <div className="flex items-center gap-4 mb-6">
          <ComboButton size="sm" options={options} onButtonClick={handleButtonClick} onOptionSelect={handleOptionSelect} >
            Combo Button
          </ComboButton>
        </div>
      </div>
    </div>
  )
}

export const ComboButtons: Story = {
  render: () => <ComboButtonDemo />,
}

const meta: Meta<typeof ComboButton> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Button',
  component: ComboButtonDemo,
}

export default meta
