import { Container, Section } from '@infonomic/uikit/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/prose')({
  component: Prose,
})

function Prose() {
  return (
    <Section className="py-4">
      <Container className="prose">
        <h1>About Page</h1>
        <p>This is the about page...</p>
      </Container>
    </Section>
  )
}
