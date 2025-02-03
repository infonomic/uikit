/**
 * rslib is excellent, and offers very simple configuration,
 * including the emitting css even when NOT bundling components
 * - which was impossible to configure in tsup.
 *
 * If the library is being consumed by a React front-end framework
 * then we'll rely on that framework's final 'build and bundle'
 * process to correctly bundle our components.
 */
import { defineConfig } from '@rslib/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      bundle: false,
      dts: {
        distPath: './dist/react'
      }
    }
  ],
  output: {
    cleanDistPath: true,
    distPath: {
      root: './dist/react'
    },
    cssModules: {},
    emitCss: true
  },
  source: {
    entry: {
      index: ['./src/react/**/!(*.stories|*.test).ts?(x)', './src/react/**/*.css']
    },
    tsconfigPath: './tsconfig.build.json'
  },
  plugins: [pluginReact()]
})
