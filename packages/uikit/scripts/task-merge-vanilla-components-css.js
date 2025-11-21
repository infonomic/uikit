/**
 * Bundle CSS for vanilla CSS components - i.e. those whose CSS 
 * can be applied to HTML without a framework.
 */

import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from 'lightningcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Define paths relative to this script (in scripts/ folder)
const distDir = resolve(__dirname, '../dist')
const outputFile = join(distDir, 'styles/components-vanilla.css')

// List of component CSS files to include in the vanilla bundle
const componentSources = [
  join(distDir, 'components/card/card_module.css'),
  join(distDir, 'components/container/container_module.css'),
  join(distDir, 'components/badge/badge_module.css'),
  join(distDir, 'components/button/button_module.css'),
  join(distDir, 'components/button/button-group_module.css'),
  join(distDir, 'components/button/copy-button_module.css'),
  join(distDir, 'components/forms/input_module.css'),
  join(distDir, 'components/forms/input-adornment_module.css'),
  join(distDir, 'components/forms/text-area_module.css'),
  join(distDir, 'components/forms/label_module.css'),
  join(distDir, 'components/forms/error-text_module.css'),
  join(distDir, 'components/forms/help-text_module.css'),
  join(distDir, 'components/section/section_module.css')
  
]

async function bundleVanillaCssComponents() {
  console.log('🚀 Bundling Vanilla CSS Components...')
  
  let concatenatedCss = ''
  let foundFiles = 0

  for (const source of componentSources) {
    if (existsSync(source)) {
      try {
        const content = await readFile(source, 'utf8')
        concatenatedCss += content + '\n'
        foundFiles++
      } catch (err) {
        console.error(`❌ Error reading ${source}:`, err)
      }
    } else {
      console.warn(`⚠️ Source file not found (skipping): ${source}`)
    }
  }

  console.log(`📦 Merged ${foundFiles} component CSS files.`)

  if (concatenatedCss.trim() === '') {
    console.warn('⚠️ No CSS content to bundle.')
    return
  }

  try {
    // Minify using lightningcss
    const { code } = transform({
      filename: 'components-vanilla.css',
      code: Buffer.from(concatenatedCss),
      minify: true,
      sourceMap: false
    })

    await writeFile(outputFile, code)
    console.log(`✅ Vanilla components CSS bundled to: ${outputFile}`)
  } catch (err) {
    console.error('❌ Error transforming/writing CSS:', err)
    process.exit(1)
  }
}

async function run() {
  await bundleVanillaCssComponents()
}

// Run the process
run()
