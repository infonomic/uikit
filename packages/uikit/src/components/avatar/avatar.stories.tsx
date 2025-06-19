import type React from 'react'

import type { Meta } from '@storybook/react-vite'

import { Avatar as AvatarComponent } from './avatar.js'

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components',
  component: AvatarComponent,
}

export default meta

export const Avatar = (): React.JSX.Element => (
  <div
    style={{
      maxWidth: '300px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <AvatarComponent />
  </div>
)
