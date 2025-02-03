// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

export default {
  title: 'Typography',
  argTypes: {}
}

export const Quote = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '36px' }}>
        <div
          style={{ maxWidth: '700px', margin: 'auto' }}
          className="prose prose-lg dark:prose-invert"
        >
          <h1>Heading 1</h1>
          <p>
            This is a paragraph of text that we&apos;ll use for our typography storybook page. This
            is a paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page.
          </p>
          <blockquote>This is some text inside a blockquote.</blockquote>
          <p>
            This is a paragraph of text that we&apos;ll use for our typography storybook page. This
            is a paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page.
          </p>
        </div>
      </div>
    </>
  )
}
