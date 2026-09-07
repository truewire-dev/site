import { pages } from '$lib/docs.server'

export const prerender = true

export function GET() {
  const base = 'https://truewire.dev'
  const staticRoutes = [
    { url: '/', priority: '1.0', freq: 'monthly' },
    { url: '/docs', priority: '0.9', freq: 'weekly' },
    { url: '/roadmap', priority: '0.7', freq: 'weekly' },
    { url: '/contributing', priority: '0.5', freq: 'monthly' }
  ]
  const docRoutes = pages
    .filter((page) => page.route.startsWith('/docs/'))
    .map((page) => ({ url: page.route, priority: '0.7', freq: 'weekly' }))
  const entries = [...staticRoutes, ...docRoutes]
    .map((r) => `  <url>\n    <loc>${base}${r.url}</loc>\n    <changefreq>${r.freq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`)
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
