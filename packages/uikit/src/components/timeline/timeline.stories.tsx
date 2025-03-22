// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import { Timeline } from './timeline'

const TimelineDemo = (): React.JSX.Element => (
  <Timeline>
    <Timeline.Root>
      <Timeline.Item>
        <Timeline.Icon />
        <Timeline.Heading>Website Launch</Timeline.Heading>
        <Timeline.Date>September 2023</Timeline.Date>
        <Timeline.Content>Some cool content here....</Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Icon />
        <Timeline.Heading>Website Launch</Timeline.Heading>
        <Timeline.Date>September 2023</Timeline.Date>
        <Timeline.Content>Some cool content here....</Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Icon />
        <Timeline.Heading>Website Launch</Timeline.Heading>
        <Timeline.Date>September 2023</Timeline.Date>
        <Timeline.Content>Some cool content here....</Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  </Timeline>
)

export default {
  title: 'Components/Timeline',
  component: TimelineDemo,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[300px]">
          <TimelineDemo />
        </div>
      </div>
    </>
  )
}
