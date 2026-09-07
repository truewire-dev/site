import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import adapterCloudflare from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// src/app.html carries one inline script: the pre-paint colour-mode resolver. SvelteKit's
// CSP support hashes only the inline scripts it generates itself, so the hash of ours is
// computed here from the same file and added to script-src. Every page is prerendered, so
// the policy ships as a <meta http-equiv> tag (hash mode); the headers a meta tag cannot
// carry (frame-ancestors and friends) live in _headers at the repo root instead.
function appHtmlScriptHash() {
  const html = readFileSync(new URL('./src/app.html', import.meta.url), 'utf8')
  const match = html.match(/<script>([\s\S]*?)<\/script>/)
  if (!match) throw new Error('src/app.html: expected one inline <script> to hash for the CSP')
  return `sha256-${createHash('sha256').update(match[1]).digest('base64')}`
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapterCloudflare(),
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ['none'],
        'script-src': ['self', appHtmlScriptHash()],
        'style-src': ['self'],
        // SvelteKit's screen-reader route announcer uses this exact inline style.
        // Permit only its hash; keep arbitrary inline styles blocked.
        'style-src-attr': ['unsafe-hashes', 'sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo='],
        'img-src': ['self', 'data:'],
        'font-src': ['self'],
        'connect-src': ['self'],
        'manifest-src': ['self'],
        'base-uri': ['none'],
        'form-action': ['none']
      }
    }
  }
}

export default config
