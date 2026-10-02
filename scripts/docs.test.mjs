import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { repoPathForSlug, routeForSlug, slugForRepoPath } from './docs-map.mjs'

const contentDir = new URL('../content/docs/', import.meta.url)
const slugs = readdirSync(contentDir, { recursive: true })
  .filter((path) => path.endsWith('.md'))
  .map((path) => path.slice(0, -3))
const nav = JSON.parse(readFileSync(new URL('nav.json', contentDir), 'utf8'))
  .flatMap((item) => item.children ?? [item])

test('every synced page appears exactly once in navigation', () => {
  assert.deepEqual(nav.map((item) => item.slug).sort(), [...slugs].sort())
})

test('source paths round-trip and site routes are unique', () => {
  for (const slug of slugs) {
    assert.equal(slugForRepoPath(repoPathForSlug(slug)), slug)
  }
  assert.equal(new Set(slugs.map(routeForSlug)).size, slugs.length)
})

test('directory overview pages resolve to their public directory routes', () => {
  for (const directory of ['adr', 'shape']) {
    assert.equal(slugForRepoPath(`docs/${directory}/README.md`), `${directory}/index`)
    assert.equal(repoPathForSlug(`${directory}/index`), `docs/${directory}/README.md`)
    assert.equal(routeForSlug(`${directory}/index`), `/docs/${directory}`)
  }
})

test('0.11 guides and architecture decisions are present', () => {
  for (const slug of ['go', 'conform', 'shape/index', 'shape/workspace', 'shape/agents',
    'shape/packages', 'shape/toolchain', 'shape/score']) assert.ok(slugs.includes(slug), slug)
  for (let number = 1; number <= 19; number++) {
    const prefix = `adr/${String(number).padStart(4, '0')}-`
    assert.equal(slugs.filter((slug) => slug.startsWith(prefix)).length, 1, prefix)
  }
})
