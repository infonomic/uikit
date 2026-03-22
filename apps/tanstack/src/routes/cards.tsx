import { Button, Card, Container, Section } from '@infonomic/uikit/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cards')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Section className="py-4">
      <Container className="prose">
        <h1>Cards</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Card.Header>
              <Card.Title>Card Title</Card.Title>
              <Card.Description>
                This is a description of the card.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>This is the main content of the card. It can include text, images, or any other elements.</p>
            </Card.Content>
            <Card.Footer>
              <Button>
                Action
              </Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title>Outlined Card</Card.Title>
              <Card.Description>
                This another card description.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>The outlined variant can be used to create a more subtle emphasis on the card's content.</p>
            </Card.Content>
            <Card.Footer>
              <Button>
                Action
              </Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title>Gradient Card</Card.Title>
              <Card.Description>
                And yet another car description.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>The gradient variant can be used to draw attention to important information or to create a more dynamic design.</p>
            </Card.Content>
            <Card.Footer>
              <Button>
                Action
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </Section>)
}
