import type React from 'react'

import type { Meta } from '@storybook/react-vite'

import { Timeline as TimelineComponent } from './timeline.js'

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components',
  component: TimelineComponent,
}

export default meta

export const Timeline = (): React.JSX.Element => (
  <div
    style={{
      maxWidth: '400px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <TimelineComponent>
      <TimelineComponent.Root>
        <TimelineComponent.Item>
          <TimelineComponent.Icon />
          <TimelineComponent.Heading>Website Launch</TimelineComponent.Heading>
          <TimelineComponent.Date>September 2023</TimelineComponent.Date>
          <TimelineComponent.Content>Some cool content here....</TimelineComponent.Content>
        </TimelineComponent.Item>
        <TimelineComponent.Item>
          <TimelineComponent.Icon />
          <TimelineComponent.Heading>Website Launch</TimelineComponent.Heading>
          <TimelineComponent.Date>September 2023</TimelineComponent.Date>
          <TimelineComponent.Content>Some cool content here....</TimelineComponent.Content>
        </TimelineComponent.Item>
        <TimelineComponent.Item>
          <TimelineComponent.Icon />
          <TimelineComponent.Heading>Website Launch</TimelineComponent.Heading>
          <TimelineComponent.Date>September 2023</TimelineComponent.Date>
          <TimelineComponent.Content>Some cool content here....</TimelineComponent.Content>
        </TimelineComponent.Item>
      </TimelineComponent.Root>
    </TimelineComponent>
  </div>
)
