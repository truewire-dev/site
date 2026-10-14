# truewire.dev

The website for [Truewire](https://github.com/truewire-dev/truewire): landing page, docs,
roadmap. SvelteKit 2 + Svelte 5, fully prerendered, deployed to Cloudflare Workers.

No framework CSS, no web fonts, no analytics, no requests to third parties. The design is
the original hand-written stylesheet (`src/lib/styles/global.css`), light and dark by OS
preference with a persisted switch in the header. The switch is driven by the one inline
script in `src/app.html`, not by Svelte, so the home page ships no JavaScript at all
(`csr = false` in `src/routes/+page.ts`); the docs pages hydrate for their copy buttons.

## Layout

```
content/docs/          committed markdown, synced from the truewire repo (see below)
content/docs/nav.json  the docs sidebar, in reading order
scripts/sync-docs.mjs  copies the toolchain's markdown into content/docs/
scripts/render-docs.mjs renders content/docs/** to src/lib/data/docs/** (gitignored)
src/routes/            /  /docs/[...path]  /roadmap  /changelog  /contributing  /legal/*  /sitemap.xml
src/lib/components/    home sections, docs shell, mode switch
static/                favicon, robots.txt, changelog/ (plus generated .md and llms.txt, gitignored)
_headers               security and cache headers for Cloudflare's static assets
wrangler.jsonc         Worker config: truewire.dev, and a `dev` env on dev.truewire.dev
```

## Develop

Node 22 and yarn 1.

```bash
yarn install
yarn run dev        # renders the docs first (predev), then vite dev
yarn run check      # svelte-kit sync + svelte-check
yarn run build      # renders the docs first (prebuild), then vite build
yarn run preview    # serves the built site locally
```

## Docs

The docs pages are the public toolchain repo's own markdown: its overview, guides for
spec authoring and each backend, conformance, architecture decisions, target shape,
roadmap and contributing guide. `scripts/sync-docs.mjs` lists the files explicitly;
`content/docs/nav.json` includes every synced page.

The current snapshot comes from public `truewire-dev/truewire` commit
`1a1193f8cc97e9bc517b7185b9f4db8f53133b4a`, the release fix following 0.11.0
(release commit `49e9beee`). Sync from that public repository only.

They are copied into `content/docs/` by `scripts/sync-docs.mjs` from a local checkout and
committed here, so a build never needs the other repo:

```bash
TRUEWIRE_REPO=../truewire yarn run sync-docs   # default path is ../truewire
git diff content/docs                          # review, then commit
```

Never hand-edit `content/docs/*.md`; fix the source in the truewire repo and re-sync.
`content/docs/nav.json` is hand-written and lists the pages in sidebar order.
`yarn run test` checks that every synced page appears exactly once and that source paths
and site routes agree. These tests also run as part of `yarn run check`.

At `predev`/`prebuild`, `scripts/render-docs.mjs` renders every page with marked (GFM
heading ids) and shiki (python, bash, toml, json, jsonc, yaml), rewrites relative markdown
links to site routes (or to GitHub for files that are not pages here), and writes:

- `src/lib/data/docs/pages/**.json`: title, description and HTML per page
- `src/lib/data/docs/_nav.json`: the sidebar, resolved from `nav.json`
- `src/lib/data/docs/shiki.css`: token colours as classes, so pages ship no inline styles
- `static/<route>.md`: each page's raw markdown (the "Copy page" button fetches it)
- `static/llms.txt`, `static/llms-full.txt`

Everything it writes is gitignored. The mapping between repo paths, slugs and routes lives
in `scripts/docs-map.mjs`.

## API changelog

`/changelog` lists the API changes Truewire's nightly drift monitor found and a person
confirmed, and `/changelog/feed.xml` is its RSS feed. Both come from `static/changelog/`:

- `changelog.json`, `changelog.md`, `feed.xml`: the monitor's public export, copied as they
  are. Never hand-edit them; the monitor's `changelog.py` writes them (typed
  `monitor/README.md`, Changelog).
- `apis.json`: the allow-list, `{api: display name}`. An API goes on it only once Truewire
  publishes its client on PyPI; today `bluesky` and `weather_gov` (the monitor's project
  names). Adding any other needs Marcel.

`scripts/changelog.mjs` refuses the build (at `prebuild`, and again when `/changelog`
prerenders) if an entry's `api` is not in `apis.json`, if an entry lacks its confirmation
date (`confirmed.date`), or if `feed.xml` or `changelog.md` lists other entries than
`changelog.json`. `yarn run test` covers it.

**Export path.** On the monitor host the nightly run writes
`~/work/monitor-state/changelog/public/`. To publish, copy its three files over
`static/changelog/`, run `yarn run build`, and open a PR to `dev`; merged, it deploys
dev.truewire.dev. The Lead promotes `dev` to `main` (truewire.dev).

## Security headers

`_headers` (copied into the build output by adapter-cloudflare) carries the headers that
must be real HTTP headers: `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
`X-Content-Type-Options`, COOP/CORP, and cache policy. The Content-Security-Policy is
generated per page by SvelteKit as a hashed `<meta>` tag (`svelte.config.js`), because the
small hydration script SvelteKit inlines has a hash only the build knows. The one inline
script of our own, the pre-paint colour-mode resolver in `src/app.html`, is hashed there
too. The policy allows nothing inline and nothing cross-origin.

## Deploy

`.github/workflows/deploy.yml` runs `yarn run check` and `yarn run build`, then
`wrangler deploy`, on every push:

- `main` deploys the production Worker (`truewire.dev`)
- `dev` deploys the `dev` environment (`dev.truewire.dev`)

Repository secrets needed:

- `CLOUDFLARE_API_TOKEN`: an API token with Workers Scripts edit permission (and Zone /
  DNS edit for the custom domains, the first time)
- `CLOUDFLARE_ACCOUNT_ID`

The custom domains are declared in `wrangler.jsonc` (`routes` with `custom_domain: true`),
so the zone for `truewire.dev` has to exist in the same Cloudflare account. Manual deploy:
`yarn run deploy` (production) or `yarn run build && wrangler deploy --env dev`.
