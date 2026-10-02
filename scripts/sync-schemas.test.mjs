import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { syncSchemas } from './sync-schemas.mjs'

function fixture(t) {
  const root = mkdtempSync(join(process.env.PAPERCLIP_RUN_SCRATCH_DIR || tmpdir(), 'schema-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = join(root, 'packages/truewire/src/truewire/schemas/published')
  const destination = join(root, 'static/schemas')
  mkdirSync(source, { recursive: true })
  mkdirSync(destination, { recursive: true })
  const add = (name) => {
    const bytes = Buffer.from(JSON.stringify({
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: `https://truewire.dev/schemas/${name}`, title: 'Schéma', type: 'object'
    }, null, 3) + '\r\n')
    writeFileSync(join(source, name), bytes)
    return bytes
  }
  add('docs.yml.json')
  add('truewire.toml.json')
  const messages = []
  const run = (check = false) => syncSchemas(root, destination, { check, log: (line) => messages.push(line) })
  return { root, source, destination, add, messages, run }
}

test('copies every published JSON byte-for-byte and is repeatable', (t) => {
  const f = fixture(t)
  const extra = f.add('future.json')
  writeFileSync(join(f.source, 'README.md'), 'Not a schema')
  f.run()
  for (const name of ['docs.yml.json', 'truewire.toml.json', 'future.json']) {
    assert.deepEqual(readFileSync(join(f.destination, name)), readFileSync(join(f.source, name)))
  }
  f.run()
  f.run(true)
  assert.deepEqual(readFileSync(join(f.destination, 'future.json')), extra)
  assert.match(f.messages.at(-1), /3 schemas.*byte-identical/)
})

test('check reports missing, changed and stale files without writing; sync reports removals', (t) => {
  const f = fixture(t)
  assert.throws(() => f.run(true), /changed\/missing \[docs.yml.json, truewire.toml.json\]/)
  f.run()
  writeFileSync(join(f.destination, 'docs.yml.json'), 'drift')
  writeFileSync(join(f.destination, 'old.json'), '{}')
  writeFileSync(join(f.destination, 'README.md'), 'keep')
  assert.throws(() => f.run(true), /changed\/missing \[docs.yml.json\]; stale \[old.json\]/)
  assert.equal(readFileSync(join(f.destination, 'docs.yml.json'), 'utf8'), 'drift')
  assert.equal(readFileSync(join(f.destination, 'old.json'), 'utf8'), '{}')
  f.run()
  assert.ok(f.messages.includes('Removed stale schema: old.json'))
  assert.equal(readFileSync(join(f.destination, 'README.md'), 'utf8'), 'keep')
  f.run(true)
})

test('missing source or required schema fails before changing output', (t) => {
  const f = fixture(t)
  assert.throws(() => syncSchemas(join(f.root, 'absent'), f.destination), /set TRUEWIRE_REPO/)
  f.run()
  const before = readFileSync(join(f.destination, 'docs.yml.json'))
  rmSync(join(f.source, 'truewire.toml.json'))
  assert.throws(() => f.run(), /Missing required published schema: truewire.toml.json/)
  assert.deepEqual(readFileSync(join(f.destination, 'docs.yml.json')), before)
})

test('malformed JSON and wrong schema identity fail before pruning or copying', (t) => {
  const f = fixture(t)
  f.run()
  const before = readFileSync(join(f.destination, 'docs.yml.json'))
  writeFileSync(join(f.destination, 'old.json'), '{}')
  writeFileSync(join(f.source, 'truewire.toml.json'), '{bad')
  assert.throws(() => f.run(), SyntaxError)
  writeFileSync(join(f.source, 'truewire.toml.json'), '{}')
  assert.throws(() => f.run(), /Invalid published schema identity or dialect/)
  assert.deepEqual(readFileSync(join(f.destination, 'docs.yml.json')), before)
  assert.equal(readFileSync(join(f.destination, 'old.json'), 'utf8'), '{}')
})
