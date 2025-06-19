import type { Meta } from '@storybook/react-vite'

export const Base = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ maxWidth: '700px', margin: 'auto' }}>
          <div className="shadow p-3 border rounded">
            <h2>Heading 2</h2>
            <span className="muted">Muted text here.</span>
            <p>
              This is a paragraph of text that we&apos;ll use for our theme storybook page. This is
              a paragraph of text that we&apos;ll use for our theme storybook page. This is a
              paragraph of text that we&apos;ll use for our theme storybook page. This is a
              paragraph of text that we&apos;ll use for our theme storybook page.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Theme',
  component: Base,
}

export default meta
