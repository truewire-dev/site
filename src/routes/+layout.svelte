<script lang="ts">
  import '$lib/styles/global.css'
  import { page } from '$app/state'
  import Mark from '$lib/components/Mark.svelte'
  import ModeSwitch from '$lib/components/ModeSwitch.svelte'
  let { children } = $props()

  const GITHUB = 'https://github.com/truewire-dev/truewire'
  const links = [
    { href: '/docs', label: 'Docs', match: '/docs' },
    { href: '/roadmap', label: 'Roadmap', match: '/roadmap' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#faq', label: 'FAQ' }
  ]
  const isActive = (match?: string) => match !== undefined
    && (page.url.pathname === match || page.url.pathname.startsWith(`${match}/`))
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preload" href="/fonts/newsreader-display.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/newsreader-display-italic.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <meta property="og:site_name" content="Truewire" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="Truewire home">
      <Mark size={26} />
      <span class="brand-name">truewire</span>
    </a>
    <nav class="nav" aria-label="Primary">
      {#each links as link (link.href)}
        <a href={link.href} aria-current={isActive(link.match) ? 'page' : undefined}>{link.label}</a>
      {/each}
      <a href={GITHUB}>GitHub</a>
      <a class="nav-cta" href="/#quickstart">Get started</a>
      <ModeSwitch />
    </nav>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<!-- The footer is a colophon: who made it, under what terms, with what, and where else to look. -->
<footer class="site-footer">
  <div class="wrap foot">
    <div class="foot-brand">
      <a class="brand" href="/" aria-label="Truewire home">
        <Mark size={22} />
        <span class="brand-name">truewire</span>
      </a>
      <p class="colophon">Typed clients, true to the wire. Apache-2.0 toolchain, MIT runtime.</p>
      <p class="colophon dim">Set in Newsreader and your system's monospace. Built with SvelteKit, served as static pages, no third-party requests.</p>
    </div>
    <nav class="foot-links" aria-label="Footer">
      <div class="foot-col">
        <span class="foot-h">Project</span>
        <a href={GITHUB}>GitHub</a>
        <a href="/docs">Docs</a>
        <a href="/roadmap">Roadmap</a>
        <a href="/docs/adr">ADRs</a>
        <a href="https://github.com/truewire-dev/registry">Registry</a>
        <a href="/contributing">Contributing</a>
      </div>
      <div class="foot-col">
        <span class="foot-h">Legal</span>
        <a href="/legal/terms">Terms</a>
        <a href="/legal/privacy">Privacy</a>
      </div>
      <div class="foot-col">
        <span class="foot-h">Contact</span>
        <a href="mailto:hello@truewire.dev">hello@truewire.dev</a>
      </div>
    </nav>
  </div>
</footer>

<style>
  .site-header { border-bottom: 1px solid var(--line-strong); background: var(--bg); }
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; height: 3.75rem; }
  .brand { display: inline-flex; align-items: center; gap: 0.55rem; color: var(--fg); text-decoration: none; }
  .brand-name { font-family: var(--display); font-weight: 500; font-size: 1.35rem; letter-spacing: -0.01em; line-height: 1; }
  .nav { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
  .nav a { color: var(--fg); text-decoration: none; font-size: 0.9rem; }
  .nav a:hover { color: var(--accent); text-decoration: underline; }
  .nav a[aria-current="page"] { color: var(--accent); text-decoration: underline; text-underline-offset: 0.35em; }
  /* The one call to action in the header: drawn in ink, like .btn-secondary, at nav size. */
  .nav .nav-cta { border: 1px solid var(--line-strong); border-radius: 3px; padding: 0.45rem 0.85rem; font-weight: 600; line-height: 1.2; }
  .nav .nav-cta:hover, .nav .nav-cta:focus-visible { color: var(--accent); border-color: var(--accent); text-decoration: none; }

  .site-footer { border-top: 1px solid var(--line-strong); padding: 2.5rem 0 3rem; font-size: 1rem; background: var(--bg-alt); }
  .foot {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 2.5rem clamp(2rem, 6vw, 6rem);
    align-items: start;
  }
  .foot-brand .brand-name { font-size: 1.15rem; }
  .colophon { max-width: 30rem; margin: 1rem 0 0; }
  .dim { color: var(--fg-muted); }
  .foot-links { display: grid; grid-template-columns: repeat(3, auto); gap: 1.5rem 2.5rem; justify-content: start; }
  .foot-col { display: flex; flex-direction: column; gap: 0.35rem; }
  .foot-h { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-muted); margin-bottom: 0.35rem; }
  .foot-links a { color: var(--fg); text-decoration: none; }
  .foot-links a:hover { color: var(--accent); text-decoration: underline; }

  @media (max-width: 48rem) {
    .bar { height: auto; padding: 0.85rem 0; flex-wrap: wrap; }
    .nav { gap: 1rem; }
    /* Below the wrap point the bar is already two rows; the hero repeats this link. */
    .nav .nav-cta { display: none; }
    .foot { grid-template-columns: 1fr; }
    .foot-links { grid-template-columns: repeat(2, auto); }
  }
</style>
