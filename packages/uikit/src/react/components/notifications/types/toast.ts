// generic types
import type { Icons as i, Position as p, Intent as t } from '../../types/shared'

/**
 * This file contains the types and prop-types for Toast component.
 */

// typescript types
export type Intent = 'primary' | t
export type Position = 'top-right' | p
export type ClassName = string
export type Title = string
export type Message = string
export type Open = boolean
export type Icon = boolean
export type IconType = 'success' | i
export type Close = boolean
export type OnOpenChange = (open: boolean) => void
