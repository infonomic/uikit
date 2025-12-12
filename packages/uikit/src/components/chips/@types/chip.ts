import type { Intent, Size } from '../../@types/shared.js'

export const chipVariant = ['assist', 'selectable', 'removable', 'selectable-removable'] as const
export type ChipVariant = (typeof chipVariant)[number]

export type ChipIntent = Intent
export type ChipSize = Size
