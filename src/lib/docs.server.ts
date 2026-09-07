// Every rendered docs page and the sidebar, read from scripts/render-docs.mjs's output
// under src/lib/data/docs/ (gitignored; regenerated at predev/prebuild). Server-only on
// purpose: with every route prerendered, the page HTML is baked into each page's own
// output at build time instead of shipping the whole doc set in the client bundle.

export type DocPage = { slug: string, route: string, title: string, description: string, html: string }
export type NavLink = { title: string, href: string }
export type NavSection = { title: string, children: NavLink[] }
export type Nav = (NavLink | NavSection)[]

const pageModules = import.meta.glob<{ default: DocPage }>('$lib/data/docs/pages/**/*.json', { eager: true })
export const pages: DocPage[] = Object.values(pageModules).map((mod) => mod.default)
const byRoute = new Map(pages.map((page) => [page.route, page]))

/** The page rendered at a site route (`/docs`, `/docs/adr`, `/roadmap`), if any. */
export function pageByRoute(route: string): DocPage | undefined {
  return byRoute.get(route)
}

const navModules = import.meta.glob<{ default: Nav }>('$lib/data/docs/_nav.json', { eager: true })
export const nav: Nav = Object.values(navModules)[0]?.default ?? []
