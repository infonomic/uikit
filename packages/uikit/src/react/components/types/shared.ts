/* eslint-disable @typescript-eslint/naming-convention */

// typescript types

// Arrays make available an iterator for easy storybook layout

export const size = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type Size = (typeof size)[number]

export const intent = [
  'primary',
  'secondary',
  'noeffect',
  'success',
  'info',
  'warning',
  'danger'
] as const

export type Intent = (typeof intent)[number]

export const position = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const
export type Position = (typeof position)[number]
