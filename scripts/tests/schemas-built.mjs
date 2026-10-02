// Run after yarn build. Exercise Cloudflare's local asset binding, including _headers.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { getPlatformProxy } from 'wrangler'

// Keep platform metadata lookup offline as well as the asset requests.
process.env.CLOUDFLARE_CF_FETCH_ENABLED = 'false'

test('built schemas serve exact bytes with editor headers and preserve site CORP', async () => {
  const builtHeaders = readFileSync('.svelte-kit/cloudflare/_headers', 'utf8')
  assert.ok(builtHeaders.includes(readFileSync('_headers', 'utf8').trim()))
  const platform = await getPlatformProxy({
    configPath: 'wrangler.jsonc', environment: 'dev', persist: false,
    remoteBindings: false, envFiles: []
  })
  try {
    for (const name of ['docs.yml.json', 'truewire.toml.json']) {
      const bytes = readFileSync(`static/schemas/${name}`)
      assert.deepEqual(readFileSync(`.svelte-kit/cloudflare/schemas/${name}`), bytes)
      for (const method of ['GET', 'HEAD']) {
        const response = await platform.env.ASSETS.fetch(`https://local.test/schemas/${name}`, {
          // Miniflare's proxy rejects non-local Origin hosts before reaching assets.
          method, headers: { Origin: 'http://localhost:3000' }
        })
        assert.equal(response.status, 200)
        assert.equal(response.headers.get('content-type'), 'application/schema+json; charset=utf-8')
        assert.equal(response.headers.get('access-control-allow-origin'), '*')
        assert.equal(response.headers.get('cross-origin-resource-policy'), null)
        assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), method === 'HEAD' ? Buffer.alloc(0) : bytes)
      }
    }
    const page = await platform.env.ASSETS.fetch('https://local.test/')
    assert.equal(page.status, 200)
    assert.equal(page.headers.get('cross-origin-resource-policy'), 'same-origin')
    assert.equal(page.headers.get('access-control-allow-origin'), null)
    await page.arrayBuffer()
  } finally {
    await platform.dispose()
  }
})
