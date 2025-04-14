import Image from 'next/image'
import Link from 'next/link'

import { Container, Section } from '@infonomic/uikit/react'

export default function Home() {
  return (
    <Section>
      <Container className="prose">
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1>Welcome to Next.js!</h1>
          <p className="mb-8">This is a sample application using Next.js.</p>
          <div className="flex flex-col gap-4 text-center">
            <Link href="/about" className="text-blue-500 hover:underline">
              Go to About page
            </Link>
            <Link href="/buttons" className="text-blue-500 hover:underline">
              Go to the Buttons page
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
