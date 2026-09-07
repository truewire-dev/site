# truewire.dev

The website for [Truewire](https://github.com/truewire-dev/truewire): landing page, docs,
roadmap. SvelteKit 2 + Svelte 5, fully prerendered, deployed to Cloudflare Workers.

No framework CSS, no analytics, no requests to third parties. The design uses system sans,
self-hosted Newsreader accents, and monospace, with an ivory / charcoal / signal-orange
palette. The hand-written stylesheet (`src/lib/styles/global.css`) supports light and dark by OS
preference with a persisted switch in the header. The switch is driven by the one inline
script in `src/app.html`, not by Svelte, so the home page ships no JavaScript at all
(`csr = false` in `src/routes/+page.ts`); the docs pages hydrate for their copy buttons.

## Layout

```
content/docs/          committed markdown, synced from the truewire repo (see below)
content/docs/nav.json  the docs sidebar, in reading order
scripts/sync-docs.mjs  copies the toolchain's markdown into content/docs/
scripts/render-docs.mjs renders content/docs/** to src/lib/data/docs/** (gitignored)
src/routes/            /  /docs/[...path]  /roadmap  /contributing  /legal/*  /sitemap.xml
src/lib/components/    home sections, docs shell, mode switch
static/                favicon, robots.txt (plus generated .md and llms.txt, gitignored)
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

The docs pages are the toolchain repo's own markdown: `README.md` (as `/docs`),
`docs/concepts.md`, `docs/spec/authoring.md`, `docs/standards.md`, `docs/truewire-toml.md`,
`docs/adr/*.md`, `ROADMAP.md` (as `/roadmap`) and `CONTRIBUTING.md` (as `/contributing`).

They are copied into `content/docs/` by `scripts/sync-docs.mjs` from a local checkout and
committed here, so a build never needs the other repo:

```bash
TRUEWIRE_REPO=../truewire yarn run sync-docs   # default path is ../truewire
git diff content/docs                          # review, then commit
```

Never hand-edit `content/docs/*.md`; fix the source in the truewire repo and re-sync.
`content/docs/nav.json` is hand-written and lists the pages in sidebar order (a page not
listed is still rendered and routable, just not in the sidebar).

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

## Security headers

`_headers` (copied into the build output by adapter-cloudflare) carries the headers that
must be real HTTP headers: `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
`X-Content-Type-Options`, COOP/CORP, and cache policy. The Content-Security-Policy is
generated per page by SvelteKit as a hashed `<meta>` tag (`svelte.config.js`), because the
small hydration script SvelteKit inlines has a hash only the build knows. The one inline
script of our own, the pre-paint colour-mode resolver in `src/app.html`, is hashed there
too. The only allowed inline style is the exact hashed style used by SvelteKit's
screen-reader route announcer. Arbitrary inline styles and cross-origin requests are blocked.

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

### Redesign preview

The `dev` branch contains the proposed “wire inspector” redesign. Its explicitly named
Worker is `truewire-site-dev`, served at **https://dev.truewire.dev**. The `main` branch
continues to deploy `truewire-site` at **https://truewire.dev**. Both use the same
branch-specific workflow pattern as `tribulnation/landing`.

Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the GitHub `development`
environment (or as repository secrets), then push `dev` or run the deploy workflow on
that branch. The token needs Workers Scripts edit and the permissions needed to bind
the custom domain in the `truewire.dev` zone. No application secrets are required.
For a manual preview deployment, run `yarn run deploy:dev` with Cloudflare credentials
available to Wrangler. To validate without publishing:

```bash
yarn run check
yarn run build
yarn wrangler deploy --env dev --dry-run
```

The homepage lives in `src/lib/components/home/Signal.svelte`. Its wire animation is
CSS/SVG, respects reduced motion, and the FAQs use native HTML disclosure controls.
The homepage remains prerendered without framework hydration.
