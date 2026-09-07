// Build-time render: reads the committed markdown under content/docs/** (synced there from
// the truewire repo by scripts/sync-docs.mjs, never hand-edited) and renders it into
// src/lib/data/docs/**, which the docs shell (src/routes/(docs)/**) resolves pages and
// its sidebar from. Output is gitignored and wired into predev/prebuild/predeploy, so it is
// regenerated from the committed source on every dev boot and build and cannot drift
// from it. Without it having run there is simply nothing to render: an empty shell, not
// stale content.
//
// Beyond the HTML per page this also writes: the sidebar (_nav.json, from the ordered
// manifest content/docs/nav.json), one stylesheet for shiki's token colours (shiki.css,
// so the page CSP can stay at style-src 'self' with no inline styles), the raw markdown
// of every page as a static file at `<route>.md`, and llms.txt / llms-full.txt.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, posix as pathPosix } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { markedHighlight } from 'marked-highlight'
import { createHighlighter } from 'shiki'
import { REPO_URL, repoPathForSlug, routeForSlug, slugForRepoPath } from './docs-map.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const contentDir = join(here, '..', 'content', 'docs')
const dataDir = join(here, '..', 'src', 'lib', 'data', 'docs')
const staticDir = join(here, '..', 'static')
const SITE_BASE = 'https://truewire.dev'

const highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: ['python', 'bash', 'toml', 'json', 'jsonc', 'yaml']
})

// shiki colours every token with an inline `style="--shiki-light:...;--shiki-dark:..."`.
// Inline styles are exactly what the site's CSP forbids, so each distinct style string is
// swapped for a class here and the classes are written out once as shiki.css.
const styleClasses = new Map()
function classForStyle(style) {
  if (!styleClasses.has(style)) styleClasses.set(style, `sk${styleClasses.size}`)
  return styleClasses.get(style)
}

function highlight(code, lang) {
  const language = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text'
  const html = highlighter.codeToHtml(code.trimEnd(), {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false
  })
  // shiki returns <pre ...><code>...</code></pre>; only the <code> contents are wanted,
  // since the code renderer below supplies its own wrapper.
  const match = html.match(/<pre[^>]*><code[^>]*>([\s\S]*)<\/code><\/pre>/)
  const inner = match ? match[1] : html
  return inner.replace(/<span style="([^"]*)">/g, (_m, style) => `<span class="${classForStyle(style)}">`)
}

// Baked into every code block at build time, so DocsProse.svelte needs one delegated
// click listener on its container instead of walking the rendered DOM.
const copyButtonMarkup = '<button type="button" class="docs-code-copy" aria-label="Copy code" title="Copy code">'
  + '<svg class="docs-code-copy-icon docs-code-copy-icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></svg>'
  + '<svg class="docs-code-copy-icon docs-code-copy-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>'
  + '</button>'

function createMarked() {
  const m = new Marked()
  m.use(gfmHeadingId())
  m.use(markedHighlight({ highlight }))
  m.use({
    renderer: {
      code(token) {
        const lang = (token.lang || '').match(/\S*/)[0]
        const classAttr = lang ? ` class="language-${lang}"` : ''
        return `<div class="docs-code-wrap"><pre><code${classAttr}>${token.text}</code></pre>${copyButtonMarkup}</div>`
      }
    }
  })
  return m
}

/** Resolves a markdown-relative href, written against the page's location in the
 * truewire repo, into a site route when the target is a synced page, a GitHub URL when it
 * is any other repo file, and passes external/anchor/mailto hrefs through untouched. */
function resolveHref(slug, href) {
  if (/^([a-z]+:)?\/\//i.test(href) || href.startsWith('#') || href.startsWith('mailto:')) return href
  const hashIndex = href.indexOf('#')
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex)
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex)
  const repoDir = pathPosix.dirname(repoPathForSlug(slug))
  const repoPath = pathPosix.normalize(pathPosix.join(repoDir === '.' ? '' : repoDir, path))
  const targetSlug = slugForRepoPath(repoPath)
  if (targetSlug && existsSync(join(contentDir, `${targetSlug}.md`))) return `${routeForSlug(targetSlug)}${hash}`
  return `${REPO_URL}/blob/main/${repoPath}${hash}`
}

/** Rewrites every markdown link/image href in `raw` via resolveHref, before parsing. Plain
 * regex substitution: the doc set is small and none of its links carry a title. */
function rewriteLinks(slug, raw) {
  return raw.replace(/(!?\[[^\]]*\]\()([^)\s]+)(\))/g, (_m, pre, href, post) => pre + resolveHref(slug, href) + post)
}

function extractTitle(raw, fallback) {
  const match = raw.match(/^#\s+(.+)$/m)
  return match ? match[1].trim().replace(/`/g, '') : fallback
}

/** First paragraph after the H1, flattened to plain text, for the page's meta description. */
function extractDescription(raw) {
  const lines = raw.split('\n')
  const h1 = lines.findIndex((line) => /^#\s/.test(line))
  let i = h1 + 1
  while (i < lines.length && (lines[i].trim() === '' || /^(\*\*|[-*] |>|\||#|```)/.test(lines[i]))) i++
  const para = []
  while (i < lines.length && lines[i].trim() !== '') para.push(lines[i++])
  return para.join(' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').trim().slice(0, 300)
}

/** Every markdown page under content/docs/, as slugs. */
function discoverPages() {
  const slugs = []
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(join(dir, entry.name), prefix ? `${prefix}/${entry.name}` : entry.name)
      else if (entry.name.endsWith('.md')) {
        const stem = entry.name.slice(0, -'.md'.length)
        slugs.push(prefix ? `${prefix}/${stem}` : stem)
      }
    }
  }
  walk(contentDir, '')
  return slugs.sort()
}

/** Writes the link-rewritten markdown of one page at `<route>.md` under static/, so a
 * page's raw markdown can be fetched by appending `.md` to its URL. */
function writeRawMarkdown(route, raw) {
  const outPath = join(staticDir, `${route.slice(1)}.md`)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, raw.endsWith('\n') ? raw : `${raw}\n`)
}

function renderPage(slug) {
  const raw = readFileSync(join(contentDir, `${slug}.md`), 'utf8')
  const route = routeForSlug(slug)
  const title = extractTitle(raw, slug)
  const description = extractDescription(raw)
  const rewritten = rewriteLinks(slug, raw)
  const html = createMarked().parse(rewritten)
  const outPath = join(dataDir, 'pages', `${slug}.json`)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify({ slug, route, title, description, html }, null, 2) + '\n')
  writeRawMarkdown(route, rewritten)
  console.log(`rendered ${slug} -> ${route}`)
  return { slug, route, title, raw: rewritten }
}

/** Resolves content/docs/nav.json (an ordered manifest of slugs, optionally grouped) into
 * the sidebar shape the shell renders: titles default to the page's own H1. */
function buildNav(metas) {
  const bySlug = new Map(metas.map((meta) => [meta.slug, meta]))
  const link = (item) => {
    const meta = bySlug.get(item.slug)
    if (!meta) throw new Error(`nav.json: no page for slug "${item.slug}"`)
    return { title: item.title ?? meta.title, href: meta.route }
  }
  const manifest = JSON.parse(readFileSync(join(contentDir, 'nav.json'), 'utf8'))
  return manifest.map((item) => 'children' in item
    ? { title: item.title, children: item.children.map(link) }
    : link(item))
}

const LLMS_INTRO = 'Truewire turns any API, REST or WebSocket, into a typed, validated client built from recorded wire examples. Source: https://github.com/truewire-dev/truewire'

function buildLlmsIndex(metas) {
  const lines = ['# Truewire', '', `> ${LLMS_INTRO}`, '', '## Docs', '']
  for (const { route, title } of metas) lines.push(`- [${title}](${SITE_BASE}${route}.md)`)
  return `${lines.join('\n')}\n`
}

function buildLlmsFull(metas) {
  const header = `# Truewire\n\n> ${LLMS_INTRO}\n`
  const sections = metas.map(({ route, raw }) => `> Source: ${SITE_BASE}${route}.md\n\n${raw.trim()}`)
  return `${[header, ...sections].join('\n\n---\n\n')}\n`
}

// Generated artifacts: cleared first so a page removed from content/docs/ cannot survive.
rmSync(dataDir, { recursive: true, force: true })
rmSync(join(staticDir, 'docs'), { recursive: true, force: true })
for (const name of ['docs.md', 'roadmap.md', 'contributing.md', 'llms.txt', 'llms-full.txt']) {
  rmSync(join(staticDir, name), { force: true })
}
mkdirSync(dataDir, { recursive: true })

const metas = discoverPages().map(renderPage)
const navOrder = new Map()
JSON.parse(readFileSync(join(contentDir, 'nav.json'), 'utf8'))
  .flatMap((item) => item.children ?? [item])
  .forEach((item, i) => navOrder.set(item.slug, i))
metas.sort((a, b) => (navOrder.get(a.slug) ?? 1e9) - (navOrder.get(b.slug) ?? 1e9))

writeFileSync(join(dataDir, '_nav.json'), JSON.stringify(buildNav(metas), null, 2) + '\n')
console.log('rendered _nav.json')

const shikiCss = [...styleClasses].map(([style, cls]) => `.${cls}{${style}}`).join('\n')
writeFileSync(join(dataDir, 'shiki.css'), `${shikiCss}\n`)
console.log(`rendered shiki.css (${styleClasses.size} token classes)`)

writeFileSync(join(staticDir, 'llms.txt'), buildLlmsIndex(metas))
writeFileSync(join(staticDir, 'llms-full.txt'), buildLlmsFull(metas))
console.log('rendered llms.txt, llms-full.txt')
