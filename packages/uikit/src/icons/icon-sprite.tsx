import type React from 'react'
import ReactDOM from 'react-dom'

// keep a list of the icon ids we put in the symbol
const icons = ['icon-1', 'icon-2']

export interface IconSpriteProps {
  id: string
}

// then define an Icon component that references the
export function IconSprite({ id, ...props }: IconSpriteProps): React.JSX.Element {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  )
}
