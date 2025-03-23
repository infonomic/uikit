// generic types
import type { Intent as t } from '../../@types/shared.js'

import type { Size as s } from '../../@types/shared.js'

/**
 * This file contains the types and prop-types for Button and IconButton component.
 */

// typescript types
export const variant = ['filled', 'outlined', 'gradient', 'text'] as const
export type Variant = (typeof variant)[number]

export type Size = 'md' | s
export type Intent = 'primary' | t
export type FullWidth = boolean
export type EnableRipple = boolean
