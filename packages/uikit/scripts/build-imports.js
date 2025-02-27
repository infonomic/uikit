import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.join(__dirname, '..', 'src', 'components')

export const buildImports = extension => {
  const components = fs.readdirSync(srcDir)
  const validComponents = components.filter(component => {
    const componentPath = path.join(srcDir, component, `${component}.${extension}`)
    return fs.existsSync(componentPath)
  })

  // biome-ignore lint/style/useTemplate: <explanation>
  return validComponents.map(component => {
    return `import ${component}Component from './components/${component}/${component}.${extension}'`
  }).join('\n')
    + '\n\n'
    + validComponents.map(component => `export const ${component} = ${component}Component`).join('\n')
}

