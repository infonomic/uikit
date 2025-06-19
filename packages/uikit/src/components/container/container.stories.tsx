// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Section } from '../section/section.js'
import { Container as ContainerComponent } from './container.js'

const meta: Meta<typeof ContainerComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Container',
  component: ContainerComponent,
}

export default meta

type Story = StoryObj<typeof ContainerComponent>

export const Container = (): React.JSX.Element => {
  return (
    <Section style={{ height: '100vh' }}>
      <ContainerComponent
        style={{
          backgroundColor: 'lightblue',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>I'm in a container</p>
      </ContainerComponent>
    </Section>
  )
}

// export const Default: Story = {
//   render: () => <DivDemo />,
// }
