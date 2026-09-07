# truewire.dev

The website for [Truewire](https://github.com/truewire-dev/truewire): landing page, docs,
roadmap, and an inquiry funnel. SvelteKit 2 + Svelte 5 on Cloudflare Workers. Marketing
and documentation are prerendered; `/start` uses server actions and D1.

No framework CSS or third-party browser analytics. Self-hosted Manrope, lavender and ink,
custom SVG wire graphics, and native radio/disclosure interactions. Light and dark themes
follow the OS or the persisted footer switch. The homepage and inquiry form need no
framework hydration; only the small theme script runs there. Docs hydrate for copy buttons.
The inquiry flow uses short-lived functional cookies and aggregate D1 form-request counts.

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
yarn db:local       # initialize the isolated development D1 simulation
yarn test           # input validation and bounded-request tests
yarn test:browser   # built Worker + isolated test D1 + Chromium (run build first)
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
Forms may submit only to this origin. Dynamic form responses are `no-store` and carry
SvelteKit's CSP as a response header.

## Deploy

`.github/workflows/deploy.yml` runs `yarn run check` and `yarn run build`, then
`wrangler deploy`, on every push:

- `main` deploys the production Worker (`truewire.dev`)
- `dev` deploys the `dev` environment (`dev.truewire.dev`)

Repository secrets needed:

- `CLOUDFLARE_API_TOKEN`: an API token with Workers Scripts edit permission (and Zone /
  DNS edit for the custom domains, the first time), plus D1 edit for migrations
- `CLOUDFLARE_ACCOUNT_ID`

The custom domains are declared in `wrangler.jsonc` (`routes` with `custom_domain: true`),
so the zone for `truewire.dev` has to exist in the same Cloudflare account. Manual deploy:
`yarn run deploy` (production) or `yarn run build && wrangler deploy --env dev`.

### Redesign preview

The `dev` branch contains the proposed “Their API. Your rules.” redesign. Its explicitly named
Worker is `truewire-site-dev`, served at **https://dev.truewire.dev**. The `main` branch
continues to deploy `truewire-site` at **https://truewire.dev**. Both use the same
branch-specific workflow pattern as `tribulnation/landing`. Development CI also runs the
local-Worker Playwright suite before migrating or publishing.

Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the GitHub `development`
environment (or as repository secrets), then push `dev` or run the deploy workflow on
that branch. The token needs Workers Scripts edit and the permissions needed to bind
the custom domain in the `truewire.dev` zone, plus D1 edit. No application secrets are required
for inquiry capture. Development migrations run before the Worker deploys.
For a manual preview deployment, run `yarn run deploy:dev` with Cloudflare credentials
available to Wrangler. To validate without publishing:

```bash
yarn run check
yarn run build
yarn wrangler deploy --env dev --dry-run
```

The homepage lives in `src/lib/components/home/Signal.svelte` and `signal.css`. Its wire
animation respects reduced motion, the conversion examples use native radio buttons,
and FAQs use native HTML disclosure controls. The homepage remains prerendered.

## Inquiry funnel and operations

Three paths lead to `/start`: scoped integration work (`service`), Cloud early access
(`cloud`), and questions (`help`). The selected CTA passes a bounded `source` label such
as `pricing`, `nav`, or `cloud`. Cloud has a shorter form and separate contact permission.
The service price is a starting price, not an automatic quote or checkout.

The Worker stores submitted fields, consent version, timestamps, source, and follow-up
status in `inquiries`. The confirmation page is reached only after D1 acknowledges the
write. Native POST works without JavaScript. Validation failures preserve entered values.
Short-lived HTTP-only cookies prevent duplicate retries and gate the confirmation page.
Same-origin checks, a honeypot, bounded request bodies, prepared statements, and a
Cloudflare rate-limit binding provide baseline abuse protection. The rate limiter is not
a substitute for Turnstile or WAF rules if distributed spam becomes a problem.

Development database: **truewire-site-leads-dev**. Local app data lives in `.wrangler/state`;
browser tests use `.wrangler/test-state` and never write to remote D1.

Operator commands (Cloudflare-authenticated CLI, never a public endpoint):

```bash
yarn leads list --remote          # latest 50 development inquiries, including personal data
yarn leads stats --remote         # form requests, inquiries, and stage counts by source/intent
yarn leads status <id> contacted --remote
yarn leads status <id> qualified --remote
yarn leads status <id> won --remote
```

Omit `--remote` for local data; add `--production` only after production provisioning.
Available stages: `new`, `contacted`, `qualified`, `won`, `lost`, `closed`. Review new leads,
reply through the agreed communication channel, and update the stage. Counts are form
page requests, **not unique visitors**; reloads, failed POST rerenders, and bots can count.
Use this report directionally, not as a precise user conversion rate. No ad pixels,
cross-site tracking, visitor IDs, or raw IP addresses are stored by the application.

Automatic email/Slack alerts are not configured. D1 is the durable inbox; choose a
notification destination before relying on unattended sales follow-up. Never export or
commit real inquiry data. The privacy notice describes actual processing but remains a
draft pending legal/retention review before production launch.

### Before promoting to production

Production remains on `main`. Its new D1 binding is intentionally not provisioned from
this development branch. Before merging, create **truewire-site-leads** with
`yarn wrangler d1 create truewire-site-leads --env="" --binding LEADS --update-config`,
commit that production database ID, add the production migration step to CI, and apply
`yarn wrangler d1 migrations apply LEADS --env="" --remote` before deploying. Do not reuse
the development database. Finalize notification delivery and privacy/retention policy.

### Browser verification

```bash
yarn playwright install chromium
yarn build
yarn test:browser
```

The suite starts the built Worker on port 8788 with local D1. It checks seven viewport
widths, clipped hero elements (not just document overflow), example controls, keyboard
navigation, theme persistence, reduced motion, internal anchors, and docs. It exercises
service and Cloud submissions, then queries local D1 to verify persistence. It also
checks validation, same-origin enforcement, honeypot rejection, rate limits, oversized
bodies, and retry deduplication. Screenshots are saved to `test-results/`.
