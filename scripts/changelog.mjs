// The public API changelog in static/changelog/: the drift monitor's public export
// (changelog.json, changelog.md, feed.xml, copied from typed's monitor) and the allow-list
// of APIs it may name (apis.json, kept here). An API enters the allow-list only once
// Truewire publishes its client on PyPI. checkChangelog refuses an entry whose API is not
// listed or that lacks its confirmation date, and a Markdown or RSS file that disagrees
// with the JSON, since those two are served as they are. `node scripts/changelog.mjs`
// runs it before every build; the /changelog page runs it again while prerendering.

const DAY = /^\d{4}-\d{2}-\d{2}$/

/** @typedef {{ function: string, method: string, path: string }} Endpoint */
/** @typedef {{ id: string, date: string, api: string, endpoint: Endpoint, change: string, confirmed: { by: string, date: string }, note?: string }} Entry */

/**
 * The checked entries, newest first as exported; throws naming every problem.
 * @param {{ data: unknown, apis: Record<string, string>, markdown: string, feed: string }} files
 * @returns {Entry[]}
 */
export function checkChangelog({ data, apis, markdown, feed }) {
  const problems = []
  const entries = /** @type {any} */ (data)?.entries
  if (!Array.isArray(entries)) throw new Error('static/changelog/changelog.json: expected {"entries": [...]}')
  const allowed = Object.keys(apis)
  entries.forEach((e, index) => {
    const name = typeof e?.id === 'string' ? e.id : `#${index + 1}`
    if (!allowed.includes(e?.api)) {
      problems.push(`entry ${name}: API ${JSON.stringify(e?.api)} is not in static/changelog/apis.json (${allowed.join(', ')})`)
    }
    if (typeof e?.confirmed?.date !== 'string' || !DAY.test(e.confirmed.date)) {
      problems.push(`entry ${name}: no confirmation date (confirmed.date)`)
    }
    if (typeof e?.date !== 'string' || !DAY.test(e.date)) problems.push(`entry ${name}: no date first seen`)
    if (typeof e?.id !== 'string') problems.push(`entry ${name}: no id`)
    if (typeof e?.change !== 'string' || typeof e?.endpoint?.function !== 'string') {
      problems.push(`entry ${name}: no endpoint function or change`)
    }
  })
  const ids = entries.map((e) => e?.id).sort()
  const guids = [...feed.matchAll(/<guid[^>]*>([^<]*)<\/guid>/g)].map((m) => unescapeXml(m[1])).sort()
  const items = feed.match(/<item>/g)?.length ?? 0
  if (items !== guids.length || JSON.stringify(guids) !== JSON.stringify(ids)) {
    problems.push(`static/changelog/feed.xml: items (${guids.join(', ') || 'none'}) are not the JSON's entries (${ids.join(', ') || 'none'})`)
  }
  const lines = markdown.split('\n').filter((l) => l.startsWith('- '))
  const mdApis = lines.map((l) => l.match(/^- \*\*\d{4}-\d{2}-\d{2}\*\* ([^:]+):/)?.[1])
  if (lines.length !== entries.length || mdApis.some((api) => !allowed.includes(api ?? ''))) {
    problems.push(`static/changelog/changelog.md: ${lines.length} entries, APIs ${JSON.stringify(mdApis)}, not the JSON's ${entries.length}`)
  }
  if (problems.length) throw new Error(`changelog refused:\n  ${problems.join('\n  ')}`)
  return entries
}

/** @param {string} text */
function unescapeXml(text) {
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&')
}

/** Reads static/changelog/ from disk (the build-time check and the tests). */
export async function readChangelog(dir = new URL('../static/changelog/', import.meta.url)) {
  const { readFileSync } = await import('node:fs')
  const read = (/** @type {string} */ name) => readFileSync(new URL(name, dir), 'utf8')
  return {
    data: JSON.parse(read('changelog.json')),
    apis: JSON.parse(read('apis.json')),
    markdown: read('changelog.md'),
    feed: read('feed.xml')
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const entries = checkChangelog(await readChangelog())
    console.log(`changelog: ${entries.length} entries, APIs allowed`)
  } catch (error) {
    console.error(/** @type {Error} */ (error).message)
    process.exit(1)
  }
}
