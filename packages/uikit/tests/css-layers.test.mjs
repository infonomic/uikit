/**
 * CSS layer contract guard. See README "CSS cascade layers".
 *
 *   pnpm test              source checks
 *   pnpm test:css-build    source checks plus the built dist/ (run after `pnpm build`)
 */
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { test } from 'node:test'

import postcss from 'postcss'

import { INFONOMIC_LAYER_ORDER, infonomicLayerOrder } from '../src/css-layers.ts'

const root = resolve(import.meta.dirname, '..')
const exampleHost = resolve(root, '../../apps/tanstack')
const buildCheck = { skip: process.env.CSS_BUILD_CHECK !== '1' }

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(dir, entry.name)
    return entry.isDirectory() ? files(path) : [path]
  })
const sourceSheets = () => files(resolve(root, 'src')).filter((f) => f.endsWith('.css'))
const distSheets = () => files(resolve(root, 'dist')).filter((f) => f.endsWith('.css'))
const compact = (s) => s.replace(/\s/g, '')

const params = postcss.parse(INFONOMIC_LAYER_ORDER).nodes[0].params
const expected = params.split(',').map((s) => s.trim())

/** Layer names in the order the browser first sees them in this sheet. */
function firstLayerOrder(css) {
  const names = []
  const visit = (nodes) => {
    for (const node of nodes) {
      if (node.type !== 'atrule') continue
      if (node.name === 'layer')
        for (const name of node.params.split(',').map((s) => s.trim().split('.')[0]))
          if (name && !names.includes(name)) names.push(name)
      if (node.nodes) visit(node.nodes)
    }
  }
  visit(postcss.parse(css).nodes)
  return names
}

/** Ancestors of a node, nearest first. */
function* ancestors(node) {
  for (let p = node.parent; p; p = p.parent) yield p
}
const isLayered = (node) =>
  [...ancestors(node)].some((p) => p.type === 'atrule' && p.name === 'layer' && p.params.trim())
const isDescriptor = (node) =>
  [...ancestors(node)].some(
    (p) =>
      p.type === 'atrule' && /^(font-face|property|counter-style)$|(?:^|-)keyframes$/.test(p.name)
  )

/**
 * Exceptions to "no ordinary unlayered rules" (§2). Each needs a reason, and
 * the rule in the stylesheet needs a comment saying why. Keep this empty
 * unless a declaration must beat something layering cannot.
 */
const unlayeredAllowlist = [] // { file: 'src/…', prop: '…', reason: '…' }

test('INFONOMIC_LAYER_ORDER is the kit order, lowest to highest precedence', () => {
  assert.deepEqual(expected, [
    'base',
    'infonomic-base',
    'theme',
    'infonomic-theme',
    'infonomic-functional',
    'infonomic-typography',
    'components',
    'infonomic-components',
    'overrides',
    'infonomic-utilities',
    'utilities',
  ])
  assert.equal(postcss.parse(INFONOMIC_LAYER_ORDER).nodes.length, 1)
})

test('host overrides and kit utilities both precede Tailwind utilities', () => {
  assert.ok(expected.indexOf('overrides') > expected.indexOf('infonomic-components'))
  assert.ok(expected.indexOf('infonomic-utilities') > expected.indexOf('overrides'))
  assert.equal(expected.at(-1), 'utilities')
})

test('every kit stylesheet reserves the complete order before rules or imports', () => {
  const sheets = sourceSheets()
  assert.ok(sheets.length > 0)
  for (const file of sheets) {
    const first = postcss.parse(readFileSync(file, 'utf8')).nodes.find((n) => n.type !== 'comment')
    const where = relative(root, file)
    assert.equal(first?.type, 'atrule', where)
    assert.equal(first?.name, 'layer', where)
    assert.equal(first?.nodes, undefined, `${where}: the first @layer must be a statement`)
    assert.equal(compact(first.params), compact(params), where)
  }
})

test('kit declarations are layered and do not use important', () => {
  const issues = []
  for (const file of sourceSheets()) {
    const where = relative(root, file)
    postcss.parse(readFileSync(file, 'utf8')).walkDecls((d) => {
      if (d.important) issues.push(`${where}:${d.source.start.line} ${d.prop} !important`)
      else if (!isLayered(d) && !isDescriptor(d)) {
        const allowed = unlayeredAllowlist.find((a) => a.file === where && a.prop === d.prop)
        if (!allowed?.reason) issues.push(`${where}:${d.source.start.line} ${d.prop} is unlayered`)
      }
    })
  }
  assert.deepEqual(issues, [])
})

test('apply directives cannot bypass declaration layering', () => {
  for (const file of sourceSheets()) {
    postcss.parse(readFileSync(file, 'utf8')).walkAtRules('apply', (node) => {
      assert.ok(isLayered(node), `Unlayered @apply in ${file}:${node.source.start.line}`)
      assert.doesNotMatch(node.params, /!important\b/, file)
    })
  }
})

test('@scope rules never select the scope root by :root, html or a leading .dark', () => {
  // Inside @scope (:root[…]) these selectors match nothing, silently. Use
  // :scope, :scope.dark .x or .x:is(.dark *) instead.
  const issues = []
  for (const file of sourceSheets()) {
    postcss.parse(readFileSync(file, 'utf8')).walkRules((rule) => {
      if (![...ancestors(rule)].some((p) => p.type === 'atrule' && p.name === 'scope')) return
      for (const selector of rule.selectors)
        if (/^\s*(?::root|html)\b|^\s*\.dark\b/.test(selector))
          issues.push(`${relative(root, file)}:${rule.source.start.line} ${selector}`)
    })
  }
  assert.deepEqual(issues, [])
})

test('the PostCSS plugin establishes the order before imports, partial preludes and nested rules', async () => {
  for (const css of [
    '.host { color: red }',
    '@import "host.css"; .host { color: red }',
    '@layer components { @scope (.host) { .box { padding: 1rem } } }',
    '@layer utilities, overrides; @layer overrides { .brand { color: red } }',
  ]) {
    const { css: output } = await postcss([infonomicLayerOrder()]).process(css, { from: undefined })
    assert.deepEqual(firstLayerOrder(output), expected, css)
    const again = await postcss([infonomicLayerOrder()]).process(output, { from: undefined })
    assert.deepEqual(firstLayerOrder(again.css), expected, css)
  }
})

test('the example host keeps both early-head and pre-hash integration', () => {
  const html = readFileSync(resolve(exampleHost, 'index.html'), 'utf8')
  const head = html.slice(html.indexOf('<head>') + '<head>'.length).replace(/<!--[\s\S]*?-->/g, '')
  const style = head.match(/^\s*<style>([\s\S]*?)<\/style>/)
  assert.ok(style, 'the layer-order <style> must be the first element in <head>')
  assert.equal(compact(style[1]), compact(INFONOMIC_LAYER_ORDER))
  assert.match(
    readFileSync(resolve(exampleHost, 'vite.config.ts'), 'utf8'),
    /postcss: \{ plugins: \[infonomicLayerOrder\(\)\] \}/
  )
})

test(
  'published export has JS and declarations without a React or PostCSS runtime import',
  buildCheck,
  async () => {
    const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
    const entry = manifest.exports['./css-layers']
    assert.ok(readFileSync(resolve(root, entry.types), 'utf8').includes('INFONOMIC_LAYER_ORDER'))
    const js = readFileSync(resolve(root, entry.import), 'utf8')
    assert.doesNotMatch(js, /(?:import|from)\s*['"](?:react|postcss)/)
    const shipped = await import(resolve(root, entry.import))
    assert.equal(shipped.INFONOMIC_LAYER_ORDER, INFONOMIC_LAYER_ORDER)
    const { css } = await postcss([shipped.infonomicLayerOrder()]).process('.box { width: 1px }', {
      from: undefined,
    })
    assert.deepEqual(firstLayerOrder(css), expected)
  }
)

test('every emitted kit stylesheet preserves first-appearance order', buildCheck, () => {
  const sheets = distSheets()
  assert.ok(sheets.length > 0)
  for (const file of sheets)
    assert.deepEqual(firstLayerOrder(readFileSync(file, 'utf8')), expected, relative(root, file))
})
