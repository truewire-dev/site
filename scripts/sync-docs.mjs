// Copies the toolchain's own markdown into content/docs/, the committed source the docs
// shell renders from (scripts/render-docs.mjs). Run it from a checkout of the truewire
// repo, review the diff, and commit the result; nothing here is fetched at build time.
//
//   TRUEWIRE_REPO=../truewire node scripts/sync-docs.mjs
//
// The file set is explicit rather than a glob over docs/, so an internal note that lands
// in the toolchain repo does not become a public page by accident.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { slugForRepoPath } from './docs-map.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const contentDir = join(here, '..', 'content', 'docs')
const repo = resolve(process.env.TRUEWIRE_REPO || join(here, '..', '..', 'truewire'))

if (!existsSync(join(repo, 'README.md'))) {
  console.error(`No truewire checkout at ${repo} (set TRUEWIRE_REPO).`)
  process.exit(1)
}

const files = [
  'README.md',
  'ROADMAP.md',
  'CONTRIBUTING.md',
  'docs/concepts.md',
  'docs/spec/authoring.md',
  'docs/standards.md',
  'docs/truewire-toml.md',
  'docs/plan.md',
  'docs/typescript.md',
  ...readdirSync(join(repo, 'docs', 'adr'))
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => `docs/adr/${name}`)
]

/** Drops a badges-only line (shields, CI status) directly under the README's H1; it is
 * GitHub furniture, not documentation. */
function stripBadges(raw) {
  const lines = raw.split('\n')
  const h1 = lines.findIndex((line) => /^#\s/.test(line))
  if (h1 === -1) return raw
  let i = h1 + 1
  while (i < lines.length && lines[i].trim() === '') i++
  if (i < lines.length && /^(\[!\[|!\[)/.test(lines[i].trim())) {
    lines.splice(i, 1)
    while (i < lines.length && lines[i].trim() === '' && i > 0 && lines[i - 1].trim() === '') lines.splice(i, 1)
  }
  return lines.join('\n')
}

// Regenerate from scratch so a page removed upstream does not linger here. nav.json is
// hand-written and stays.
for (const entry of existsSync(contentDir) ? readdirSync(contentDir) : []) {
  if (entry !== 'nav.json') rmSync(join(contentDir, entry), { recursive: true, force: true })
}

for (const file of files) {
  const slug = slugForRepoPath(file)
  if (!slug) throw new Error(`${file}: no slug mapping in scripts/docs-map.mjs`)
  let raw = readFileSync(join(repo, file), 'utf8')
  if (file === 'README.md') raw = stripBadges(raw)
  const out = join(contentDir, `${slug}.md`)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, raw.endsWith('\n') ? raw : `${raw}\n`)
  console.log(`${file} -> content/docs/${slug}.md`)
}
