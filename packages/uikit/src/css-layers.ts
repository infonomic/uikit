import type { Plugin } from 'postcss'

const layers =
  'base, infonomic-base, theme, infonomic-theme, infonomic-functional, infonomic-typography, components, infonomic-components, overrides, infonomic-utilities, utilities'

/**
 * The kit's cascade-layer order, lowest to highest precedence, shared by the
 * kit and its hosts. Hosts place their own component CSS in `components`,
 * restyles and brand tokens in `overrides`, and Tailwind utilities in
 * `utilities`, which has the final say.
 *
 * Render it as the first element in the document head
 * (`<style>{INFONOMIC_LAYER_ORDER}</style>`) so CSS injected in development
 * cannot establish a partial order first.
 */
export const INFONOMIC_LAYER_ORDER = `@layer ${layers};`

/**
 * PostCSS plugin that prepends INFONOMIC_LAYER_ORDER to every stylesheet
 * before the host bundler hashes it. This covers production, where stylesheet
 * links can be hoisted above the inline head statement. Repeated statements
 * are harmless, but a partial order cannot be repaired once the browser has
 * seen it, so use the plugin and the head statement together.
 *
 * This entry imports nothing from the React component graph at runtime.
 */
export function infonomicLayerOrder(): Plugin {
  return {
    postcssPlugin: 'infonomic-layer-order',
    Once(root, { AtRule }) {
      root.prepend(new AtRule({ name: 'layer', params: layers }))
    },
  }
}
