// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

export default {
  title: 'Typography',
  argTypes: {}
}

export const Small = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '36px' }}>
        <div
          style={{ maxWidth: '700px', margin: 'auto' }}
          className="prose prose-lg dark:prose-invert"
        >
          <h1>Heading 1 - With Some More Text to Test on Mobile</h1>
          <p>
            This is a paragraph of text that we&apos;ll use for our typography storybook page. This
            is a paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page.
          </p>
          <h2>Heading 2 - With Some More Text to Test on Mobile</h2>
          <p>
            This is a paragraph of text that we&apos;ll use for our typography storybook page. This
            is a paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page.
          </p>
          <h3>Heading 3 - With Some More Text to Test on Mobile</h3>
          <p>
            This is a paragraph of text that we&apos;ll use for our typography storybook page. This
            is a paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page. This is a
            paragraph of text that we&apos;ll use for our typography storybook page.
          </p>
          <h4>Heading 4 - With Some More Text to Test on Mobile</h4>
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
