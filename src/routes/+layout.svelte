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
  <meta property="og:site_name" content="Truewire" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="Truewire home">
      <Mark size={28} />
      <span class="brand-name">truewire</span>
    </a>
    <nav class="nav" aria-label="Primary">
      {#each links as link (link.href)}
        <a href={link.href} aria-current={isActive(link.match) ? 'page' : undefined}>{link.label}</a>
      {/each}
      <a href={GITHUB}>GitHub</a>
      <ModeSwitch />
    </nav>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="site-footer">
  <div class="wrap foot">
    <div class="foot-brand">
      <Mark size={22} />
      <span>Truewire</span>
      <span class="dim">Apache-2.0 / MIT</span>
    </div>
    <nav class="foot-links" aria-label="Footer">
      <a href={GITHUB}>GitHub</a>
      <a href="/docs">Docs</a>
      <a href="/roadmap">Roadmap</a>
      <a href="/docs/adr">ADRs</a>
      <a href="/contributing">Contributing</a>
      <a href="/legal/terms">Terms</a>
      <a href="/legal/privacy">Privacy</a>
      <a href="mailto:hello@truewire.dev">hello@truewire.dev</a>
    </nav>
  </div>
</footer>

<style>
  .site-header { border-bottom: 1px solid var(--line); background: var(--bg); }
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; height: 4rem; }
  .brand { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--fg); text-decoration: none; font-weight: 600; }
  .brand-name { font-size: 1.15rem; letter-spacing: -0.01em; }
  .nav { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .nav a { color: var(--fg-muted); text-decoration: none; font-size: 0.95rem; }
  .nav a:hover, .nav a[aria-current="page"] { color: var(--accent); }
  .nav a:hover { text-decoration: underline; }

  .site-footer { border-top: 1px solid var(--line); padding: 2.5rem 0; font-size: 0.95rem; }
  .foot { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .foot-brand { display: inline-flex; align-items: center; gap: 0.6rem; font-weight: 600; }
  .dim { color: var(--fg-muted); font-weight: 400; }
  .foot-links { display: flex; gap: 1.25rem; flex-wrap: wrap; }
  .foot-links a { color: var(--fg-muted); text-decoration: none; }
  .foot-links a:hover { color: var(--accent); text-decoration: underline; }

  @media (max-width: 40rem) {
    .bar { height: auto; padding: 0.9rem 0; flex-wrap: wrap; }
    .nav { gap: 1rem; }
  }
</style>
