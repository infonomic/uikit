/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactNode } from 'react'

// generic types
import type { Intent as t } from '../../@types/shared.js'

/**
 * This file contains the types and prop-types for Button and IconButton component.
 */

// typescript types
export const variant = ['outlined', 'filled'] as const
export type Variant = (typeof variant)[number]

export const size = ['sm', 'md', 'lg'] as const
export type Size = (typeof size)[number]

export type Intent = 'primary' | t
export type ClassName = string
export type Children = ReactNode
