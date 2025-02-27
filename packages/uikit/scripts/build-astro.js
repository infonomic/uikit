import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildImports } from './build-imports.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define source and output paths
const srcDir = path.join(__dirname, '..', 'src', 'components')
const destDir = path.join(__dirname, '..', 'dist', 'components')
const outputFile = path.join(__dirname, '..', 'dist', 'astro.js')

console.log('🚀 Preparing astro build')

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Copy .astro files to dist
function copyAstroFiles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  const files = fs.readdirSync(srcDir)
  // biome-ignore lint/complexity/noForEach: <explanation>
  files.forEach(file => {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    if (fs.statSync(srcFile).isDirectory()) {
      copyAstroFiles(srcFile, destFile)
    } else if (file.endsWith('.astro'))
      fs.copyFileSync(srcFile, destFile)
  })
}

copyAstroFiles(srcDir, destDir)

fs.writeFileSync(outputFile, buildImports('astro'))
// fs.writeFileSync('dist/astro.d.ts', buildTypes('astro'))

console.log('✅ Astro components built')
