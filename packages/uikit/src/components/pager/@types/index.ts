export const variant = ['default', 'classic', 'dashboard'] as const
export type Variant = (typeof variant)[number]
