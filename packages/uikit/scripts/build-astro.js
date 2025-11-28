import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildImports, buildTypes } from './build-imports.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define source and output paths
const srcDir = path.join(__dirname, '..', 'src')
const destDir = path.join(__dirname, '..', 'dist')
const outputFile = path.join(__dirname, '..', 'dist', 'astro.js')
const outputTypesFile = path.join(__dirname, '..', 'dist', 'astro.d.ts')

console.log('🚀 Preparing astro build')

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Copy .astro files to dist
function copyAstroFiles(srcDir, destDir) {
  const files = fs.readdirSync(srcDir)
  // biome-ignore lint/complexity/noForEach: <explanation>
  files.forEach(file => {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    if (fs.statSync(srcFile).isDirectory()) {
      copyAstroFiles(srcFile, destDir)
    } else if (file.endsWith('.astro')) {
      const relativePath = path.relative(path.join(__dirname, '..', 'src'), srcFile)
      const finalDestFile = path.join(destDir, relativePath)
      const finalDestDir = path.dirname(finalDestFile)
      if (!fs.existsSync(finalDestDir)) {
        fs.mkdirSync(finalDestDir, { recursive: true })
      }
      fs.copyFileSync(srcFile, finalDestFile)
    }
  })
}

// Copy .module.css files to dist
function copyCSSModuleFiles(srcDir, destDir) {
  const files = fs.readdirSync(srcDir)
  // biome-ignore lint/complexity/noForEach: <explanation>
  files.forEach(file => {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    if (fs.statSync(srcFile).isDirectory()) {
      copyCSSModuleFiles(srcFile, destDir)
    } else if (file.endsWith('.module.css')) {
      const relativePath = path.relative(path.join(__dirname, '..', 'src'), srcFile)
      const finalDestFile = path.join(destDir, relativePath)
      const finalDestDir = path.dirname(finalDestFile)
      if (!fs.existsSync(finalDestDir)) {
        fs.mkdirSync(finalDestDir, { recursive: true })
      }
      fs.copyFileSync(srcFile, finalDestFile)
    }
  })
}

copyAstroFiles(srcDir, destDir)
copyCSSModuleFiles(srcDir, destDir)

fs.writeFileSync(outputFile, buildImports('astro'))
fs.writeFileSync(outputTypesFile, buildTypes('astro'))

console.log('✅ Astro components built')
