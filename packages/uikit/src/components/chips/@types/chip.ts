import type { Intent, Size } from '../../@types/shared.js'

export const chipVariant = ['assist', 'filter', 'input', 'suggestion'] as const
export type ChipVariant = (typeof chipVariant)[number]

export type ChipIntent = Intent
export type ChipSize = Size
