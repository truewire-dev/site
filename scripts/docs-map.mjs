// The one place that says how a file in the truewire toolchain repo maps onto a slug under
// content/docs/, and how a slug maps onto a route on this site. sync-docs.mjs uses the first
// half to know where to copy each file; render-docs.mjs uses both halves to rewrite the
// relative markdown links between synced pages (README's `docs/concepts.md`, an ADR's
// `0006-...md`) into site routes. Anything not covered falls back to a GitHub blob URL.

export const REPO_URL = 'https://github.com/truewire-dev/truewire'

/** Repo-relative source path (posix) for a content slug (`concepts`, `adr/0001-...`). */
export function repoPathForSlug(slug) {
  if (slug === 'index') return 'README.md'
  if (slug === 'roadmap') return 'ROADMAP.md'
  if (slug === 'contributing') return 'CONTRIBUTING.md'
  if (slug === 'adr/index') return 'docs/adr/README.md'
  return `docs/${slug}.md`
}

/** Inverse of repoPathForSlug, or null when the repo file has no page on this site. */
export function slugForRepoPath(path) {
  if (path === 'README.md') return 'index'
  if (path === 'ROADMAP.md') return 'roadmap'
  if (path === 'CONTRIBUTING.md') return 'contributing'
  if (path === 'docs/adr/README.md') return 'adr/index'
  const match = path.match(/^docs\/(.+)\.md$/)
  return match ? match[1] : null
}

/** Site-absolute route for a content slug. Roadmap and Contributing get top-level routes;
 * every other page lives under /docs, and a directory index owns its directory route. */
export function routeForSlug(slug) {
  if (slug === 'index') return '/docs'
  if (slug === 'roadmap') return '/roadmap'
  if (slug === 'contributing') return '/contributing'
  const trimmed = slug.endsWith('/index') ? slug.slice(0, -'/index'.length) : slug
  return `/docs/${trimmed}`
}
