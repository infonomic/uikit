import { Button, Container, Section } from '@infonomic/uikit/react'

const variant = ['filled', 'outlined', 'gradient', 'text'] as const
const intent = ['primary', 'secondary', 'noeffect', 'success', 'info', 'warning', 'danger'] as const

function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function ButtonsPage() {
  return (
    <Section className="py-4">
      <Container className="prose">
        <h1>About Page</h1>
        <p>This is the about page...</p>
      </Container>
    </Section>
  )
}
