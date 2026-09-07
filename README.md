# truewire.dev

The landing site for [Truewire](https://github.com/truewire-dev/truewire). Plain static files:
no build step, no framework, no npm, no external requests (no CDN, no web fonts, no analytics).

```
index.html    the page
style.css     hand-written styles, light and dark via prefers-color-scheme
favicon.svg   the mark
robots.txt
_headers      Cloudflare Pages headers: security headers + cache policy
```

## Deploy (Cloudflare Pages)

1. Push this directory to a Git repository (its own repo, or a subdirectory of one).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pick the repository and branch.
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/` (or the subdirectory holding `index.html`, if the site lives inside a larger repo)
5. Save and deploy. Every push to the branch redeploys.
6. **Custom domains** → add `truewire.dev` (and `www.truewire.dev`, redirected to the apex).

`_headers` is picked up automatically by Pages. If you ever add a `_redirects` file, it goes
in the same directory.

## Editing

- Copy lives in `index.html` directly. The terminal block's output lines are illustrative
  (see the HTML comment above it); regenerate them from the real CLI before shipping changes
  to that section.
- The stylesheet is linked as `style.css?v=1`. Bump the `v` query when you change the CSS so
  browsers past the 24h cache window pick it up immediately.
- Keep the page free of scripts and third-party requests; `_headers` ships a CSP that blocks
  them (`default-src 'none'; style-src 'self'; img-src 'self' data:`). If you need something
  new, widen the CSP deliberately rather than removing it.

## Checks before publishing

```bash
python3 -c "import html.parser,sys; p=html.parser.HTMLParser(); p.feed(open('index.html').read()); print('ok')"
grep -nE 'https?://' index.html style.css | grep -vE 'truewire\.dev|github\.com/truewire-dev|w3\.org/2000/svg|127\.0\.0\.1'   # should print nothing
du -b index.html style.css favicon.svg
```
