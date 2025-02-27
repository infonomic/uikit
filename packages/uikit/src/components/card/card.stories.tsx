import type { Meta } from '@storybook/react'

import { Button } from '../button/button.js'
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card.js'

export const Card = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '48px' }} className="mb-6">
        <div style={{ maxWidth: '400px', marginBottom: '24px' }}>
          <CardComponent>
            <CardHeader>
              <CardTitle>
                <h2>Normal Card</h2>
              </CardTitle>
              <CardDescription>
                <p>Card description here.</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card body with some text here.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">A Button</Button>
            </CardFooter>
          </CardComponent>
        </div>
        <div style={{ maxWidth: '400px', marginBottom: '24px' }}>
          <CardComponent hover={true}>
            <CardHeader>
              <CardTitle>
                <h2>Card Hover</h2>
              </CardTitle>
              <CardDescription>
                <p>Card description here.</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card body with some text here.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">A Button</Button>
            </CardFooter>
          </CardComponent>
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
  title: 'Components',
  component: Card,
}

export default meta
