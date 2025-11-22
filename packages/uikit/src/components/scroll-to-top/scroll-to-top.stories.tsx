import type { Meta } from '@storybook/react-vite'

import { ScrollToTop as ScrollToTopComponent } from './scroll-to-top.js'

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components',
  component: ScrollToTopComponent,
}

export default meta

export const ScrollToTop = (): React.JSX.Element => {
  return (
    <div>
      <div style={{ maxWidth: '600px', height: '160vh', margin: '2rem auto' }}>
        <p>Scroll down to see the button appear.</p>
      </div>
      <ScrollToTopComponent />
    </div>
  )
}
