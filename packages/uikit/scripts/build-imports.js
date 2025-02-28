import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.join(__dirname, '..', 'src', 'components')

// Convert kebab-case to PascalCase
const toPascalCase = str => {
  return str.replace(/(^\w|-\w)/g, match => match.replace('-', '').toUpperCase())
}

export const buildImports = extension => {
  const components = fs.readdirSync(srcDir)
  const importStatements = []
  const exportStatements = []

  for (const component of components) {
    const componentDir = path.join(srcDir, component)
    const files = fs.readdirSync(componentDir).filter(file => file.endsWith(`.${extension}`))

    for (const file of files) {
      const componentName = path.basename(file, `.${extension}`)
      const pascalCaseName = toPascalCase(componentName)
      importStatements.push(`import ${pascalCaseName}Component from './components/${component}/${file}'`)
      exportStatements.push(`export const ${pascalCaseName} = ${pascalCaseName}Component`)
    }
  }

  // biome-ignore lint/style/useTemplate: <explanation>
  return importStatements.join('\n') + '\n\n' + exportStatements.join('\n')
}

