// Copy the public toolchain's published schemas verbatim; never fetch during a build.
// TRUEWIRE_REPO=../truewire node scripts/sync-schemas.mjs [--check]
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const published = 'packages/truewire/src/truewire/schemas/published'
const required = ['docs.yml.json', 'truewire.toml.json']

export function syncSchemas(repo, destination, { check = false, log = console.log } = {}) {
  const source = join(repo, published)
  if (!existsSync(source)) throw new Error(`No published schemas at ${source} (set TRUEWIRE_REPO to a public truewire checkout).`)
  const entries = readdirSync(source, { withFileTypes: true }).filter((entry) => entry.name.endsWith('.json'))
  const names = entries.map((entry) => entry.name).sort()
  for (const name of required) {
    if (!names.includes(name)) throw new Error(`Missing required published schema: ${name}`)
  }
  // Validate every input before changing any committed file. Preserve its original bytes.
  const files = new Map(names.map((name) => {
    if (!entries.find((entry) => entry.name === name).isFile()) throw new Error(`Schema must be a regular file: ${name}`)
    const bytes = readFileSync(join(source, name))
    const schema = JSON.parse(bytes.toString('utf8'))
    if (schema?.$id !== `https://truewire.dev/schemas/${name}` || typeof schema?.$schema !== 'string') {
      throw new Error(`Invalid published schema identity or dialect: ${name}`)
    }
    return [name, bytes]
  }))
  const stale = (existsSync(destination) ? readdirSync(destination) : [])
    .filter((name) => name.endsWith('.json') && !files.has(name)).sort()
  const changed = names.filter((name) => !existsSync(join(destination, name)) ||
    !readFileSync(join(destination, name)).equals(files.get(name)))
  if (check) {
    if (changed.length || stale.length) {
      throw new Error(`Schemas out of sync: changed/missing [${changed.join(', ')}]; stale [${stale.join(', ')}]`)
    }
    log(`Verified ${names.length} schemas: source and static files are byte-identical.`)
    return
  }
  mkdirSync(destination, { recursive: true })
  for (const name of stale) {
    unlinkSync(join(destination, name))
    log(`Removed stale schema: ${name}`)
  }
  for (const [name, bytes] of files) {
    writeFileSync(join(destination, name), bytes)
    log(`${published}/${name} -> static/schemas/${name}`)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.slice(2).some((arg) => arg !== '--check')) throw new Error('Usage: sync-schemas.mjs [--check]')
    syncSchemas(resolve(process.env.TRUEWIRE_REPO || join(here, '..', '..', 'truewire')),
      join(here, '..', 'static', 'schemas'), { check: process.argv.includes('--check') })
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
