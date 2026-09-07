import { error } from '@sveltejs/kit'
import { pageByRoute, pages } from '$lib/docs.server'
import type { EntryGenerator, PageServerLoad } from './$types'

// One route renders every page under /docs; `path` is '' at /docs itself. Roadmap and
// Contributing have their own top-level routes and are excluded here.
export const entries: EntryGenerator = () => pages
  .filter((page) => page.route.startsWith('/docs'))
  .map((page) => ({ path: page.route === '/docs' ? '' : page.route.slice('/docs/'.length) }))

export const load: PageServerLoad = ({ params }) => {
  const doc = pageByRoute(params.path ? `/docs/${params.path}` : '/docs')
  if (!doc) error(404, 'Page not found')
  return { doc }
}
