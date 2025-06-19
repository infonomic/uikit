import type { Meta } from '@storybook/react-vite'

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

function CodeDemo({ code, className, language = 'jsx' }: CodeProps): React.JSX.Element {
  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre style={{ backgroundColor: 'var(--canvas-800)' }} className={className}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div {...lineProps} key={i} style={{ lineHeight: 1.3 }}>
                <span style={{ marginLeft: '-8px', marginRight: '12px' }}>{i + 1}</span>
                {line.map((token, key) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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

export const Code = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ maxWidth: '700px', margin: 'auto' }} className="prose">
          <h1>Heading 1</h1>
          <p>
            This is a <code>inline code here</code> of text that we&apos;ll use for our typography
            and code storybook page. This is a paragraph of text that we&apos;ll use for our
            typography and code storybook page. Here is a code block...
          </p>
          <CodeDemo code={code} />
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

const meta: Meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Typography',
  component: Code,
}

export default meta
