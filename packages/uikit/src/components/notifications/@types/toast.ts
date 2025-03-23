// generic types
import type { Icons as i, Position as p, Intent as t } from '../../@types/shared.js'

/**
 * This file contains the types and prop-types for Toast component.
 */

// typescript types
export type Intent = 'primary' | t
export type Position = 'top-right' | p
export type IconType = 'success' | i
export type OnOpenChange = (open: boolean) => void
