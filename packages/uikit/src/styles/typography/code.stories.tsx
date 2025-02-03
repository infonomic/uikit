// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import cx from 'classnames'
import { Highlight, themes } from 'prism-react-renderer'

const code = `const x = 'foo';
function printFoo() {
  console.log(x);
}
printFoo();`

type CodeIntrinsicProps = React.JSX.IntrinsicElements['pre']
interface CodeProps extends CodeIntrinsicProps {
  className?: string
  title?: string
  code: string
  language?: string
}

function Code({ code, className, language = 'jsx' }: CodeProps): React.JSX.Element {
  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={cx('bg-canvas-800', className)}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            return (
              <div {...lineProps} key={i} className="leading-5">
                <span className="-ml-2 mr-3">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default {
  title: 'Typography',
  argTypes: {}
}

export const CodeDemo = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '36px' }}>
        <div
          style={{ maxWidth: '700px', margin: 'auto' }}
          className="prose prose-lg dark:prose-invert"
        >
          <h1>Heading 1</h1>
          <p>
            This is a <code>inline code here</code> of text that we&apos;ll use for our typography
            and code storybook page. This is a paragraph of text that we&apos;ll use for our
            typography and code storybook page. Here is a code block...
          </p>
          <Code code={code} />
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
