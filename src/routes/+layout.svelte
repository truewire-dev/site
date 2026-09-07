<script lang="ts">
  import '$lib/styles/global.css'
  import { page } from '$app/state'
  import Mark from '$lib/components/Mark.svelte'
  import ModeSwitch from '$lib/components/ModeSwitch.svelte'
  let { children } = $props()

  const GITHUB = 'https://github.com/truewire-dev/truewire'
  const links = [
    { href: '/docs', label: 'Docs', match: '/docs' },
    { href: '/#how-it-works', label: 'How it works' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/roadmap', label: 'Roadmap', match: '/roadmap' }
  ]
  const isActive = (match?: string) => match !== undefined
    && (page.url.pathname === match || page.url.pathname.startsWith(`${match}/`))
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preload" href="/fonts/manrope-variable.ttf" as="font" type="font/ttf" crossorigin="anonymous" />
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
      <a href={GITHUB}>GitHub ↗</a>
      <a class="nav-cta" href="/start?intent=service&source=nav">Talk to us <span aria-hidden="true">↗</span></a>
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
      <p class="colophon dim">Built from real examples. Made to be yours.<br />Open source, from the first request to the last mile.</p>
      <div class="footer-mode"><ModeSwitch /></div>
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
        <a href="/start?intent=service&source=footer">Build my integration ↗</a>
        <a href="/start?intent=cloud&source=footer">Cloud early access</a>
        <a href="mailto:hello@truewire.dev">hello@truewire.dev</a>
      </div>
    </nav>
  </div>
</footer>

<style>
  .site-header { border-bottom: 1px solid var(--line); background: var(--hero-bg); }
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; height: 5rem; }
  .brand { display: inline-flex; align-items: center; gap: 0.55rem; color: var(--fg); text-decoration: none; }
  .brand-name { font-family: var(--display); font-weight: 700; font-size: 1.5rem; letter-spacing: -0.065em; line-height: 1; }
  .nav { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
  .nav a { color: var(--fg); text-decoration: none; font-size: 0.78rem; }
  .nav a:hover { color: var(--accent); text-decoration: underline; }
  .nav a[aria-current="page"] { color: var(--accent); text-decoration: underline; text-underline-offset: 0.35em; }
  .nav .nav-cta { border: 1px solid var(--line-strong); padding: .55rem .9rem; border-radius: 6px; display: flex; gap: 1.2rem; }
  .footer-mode { margin-top: 1rem; }

  .site-footer { border-top: 1px solid var(--line); padding: 2.5rem 0 3rem; font-size: 0.8rem; background: var(--bg-alt); }
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
    .bar { height: auto; padding-block: 0.85rem; flex-wrap: wrap; }
    .nav { gap: 1rem; }
    .foot { grid-template-columns: 1fr; }
    .foot-links { grid-template-columns: repeat(2, auto); }
  }
  @media (max-width: 38rem) {
    .bar { flex-wrap: nowrap; min-height: 4.5rem; }
    .nav { gap: .9rem; }
    .nav a { font-size: .7rem; }
    .nav a[href="/#how-it-works"], .nav a[href="/roadmap"], .nav a[href^="https://github"] { display: none; }
    .nav .nav-cta { gap: .4rem; padding: .5rem .65rem; }
    .brand-name { font-size: 1.25rem; }
  }
  @media (max-width: 23rem) { .nav a[href="/#pricing"] { display: none; } }
</style>
