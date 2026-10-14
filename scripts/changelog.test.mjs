import assert from 'node:assert/strict'
import test from 'node:test'
import { checkChangelog, readChangelog } from './changelog.mjs'

const files = await readChangelog()
const entry = (api, confirmed = { by: 'marcel', date: '2026-10-14' }) => ({
  id: `${api}/0123456789abcdef`, date: '2026-10-13', api, job: api,
  endpoint: { function: 'feed.get_posts', method: 'GET', path: '/xrpc/app.bsky.feed.getPosts' },
  change: 'adds field `labels` (array)', check: 'key_added', pointer: '/posts/*/labels', confirmed
})
const withEntries = (entries) => ({
  ...files,
  data: { entries },
  markdown: entries.map((e) => `- **${e.date}** ${e.api}: x.`).join('\n'),
  feed: entries.map((e) => `<item><guid isPermaLink="false">${e.id}</guid></item>`).join('')
})

test('the committed changelog passes', () => {
  assert.ok(Array.isArray(checkChangelog(files)))
})

test('allowed APIs with a confirmation date pass', () => {
  assert.equal(checkChangelog(withEntries([entry('bluesky'), entry('weather_gov')])).length, 2)
})

test('an API not in the allow-list is refused', () => {
  assert.throws(() => checkChangelog(withEntries([entry('kraken')])), /"kraken" is not in static\/changelog\/apis.json/)
})

test('an entry without its confirmation date is refused', () => {
  assert.throws(() => checkChangelog(withEntries([entry('bluesky', { by: 'marcel' })])), /no confirmation date/)
  assert.throws(() => checkChangelog(withEntries([entry('bluesky', null)])), /no confirmation date/)
})

test('a feed or Markdown file that disagrees with the JSON is refused', () => {
  const ok = withEntries([entry('bluesky')])
  assert.throws(() => checkChangelog({ ...ok, feed: ok.feed + '<item><guid>kraken/1</guid></item>' }), /feed.xml/)
  assert.throws(() => checkChangelog({ ...ok, markdown: ok.markdown + '\n- **2026-10-13** kraken: x.' }), /changelog.md/)
})
