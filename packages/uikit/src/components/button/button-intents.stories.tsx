import type { Meta, StoryObj } from '@storybook/react-vite'

import { capitalize } from '../../utils/capitalize.js'

import { intent } from '../@types/shared.js'
import { variant } from './@types/button.js'
import { Button } from './button.js'

type Story = StoryObj<typeof Button>

const AllIntents = (): React.JSX.Element => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {intent.map((i) => {
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr)',
              gap: '32px',
              marginBottom: '32px',
            }}
          >
            {variant.map((v) => {
              return (
                <Button key={`${i}-${v}`} intent={i} variant={v}>{`${capitalize(i)} ${v}`}</Button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export const Intents: Story = {
  render: () => <AllIntents />,
}

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Button',
  component: Button,
}

export default meta
