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

  // The phone menu is a <details>, so it opens and closes without any script (the home page
  // ships none). On hydrated pages the layout persists across client-side navigation, so
  // the menu is closed here whenever the URL changes; src/app.html's script adds Escape.
  let menu: HTMLDetailsElement | undefined = $state()
  $effect(() => {
    void page.url.pathname
    void page.url.hash
    if (menu) menu.open = false
  })
</script>

{#snippet navLinks()}
  {#each links as link (link.href)}
    <a href={link.href} aria-current={isActive(link.match) ? 'page' : undefined}>{link.label}</a>
  {/each}
  <a href={GITHUB}>GitHub</a>
  <a class="nav-cta" href="/#quickstart">Get started</a>
{/snippet}

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
    <!-- Wide screens: the links in a row. Phones: the same links behind one disclosure,
         so the bar stays a single calm row. Only one of the two is displayed at a time. -->
    <nav class="nav nav-wide" aria-label="Primary">
      {@render navLinks()}
      <ModeSwitch />
    </nav>
    <details class="menu" data-menu bind:this={menu}>
      <summary class="menu-button" aria-controls="site-menu" aria-expanded="false">
        <span>Menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </summary>
      <nav class="nav menu-panel" id="site-menu" aria-label="Primary">
        {@render navLinks()}
        <div class="menu-mode"><ModeSwitch /></div>
      </nav>
    </details>
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
  .menu { display: none; }

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
    .nav-wide { display: none; }
    /* One row: brand and a disclosure. The open menu is a ruled column hung from the
       bar's rule, full width, so nothing can overflow the page sideways. */
    .site-header { position: relative; }
    .bar { height: 3.5rem; }
    .menu { display: block; }
    .menu-button {
      display: inline-flex; align-items: center; gap: 0.35rem;
      min-height: 2.75rem; padding: 0 0.25rem 0 0.75rem; margin-right: -0.25rem;
      font-size: 0.9rem; font-weight: 600; line-height: 1; color: var(--fg);
      cursor: pointer; list-style: none; user-select: none;
    }
    .menu-button::-webkit-details-marker { display: none; }
    .menu-button svg { width: 1rem; height: 1rem; color: var(--fg-muted); transition: transform 0.15s; }
    .menu[open] .menu-button { color: var(--accent); }
    .menu[open] .menu-button svg { transform: rotate(180deg); }
    .menu-panel {
      position: absolute; left: 0; right: 0; top: 100%; z-index: 5;
      flex-direction: column; align-items: stretch; gap: 0;
      padding: 0.25rem var(--gutter) 1rem;
      background: var(--bg);
      border-bottom: 1px solid var(--line-strong);
    }
    .menu-panel a { display: flex; align-items: center; min-height: 2.75rem; font-size: 1rem; border-bottom: 1px solid var(--line); }
    .menu-panel a:hover { text-decoration: none; }
    .menu-panel a[aria-current="page"] { text-decoration: none; }
    .menu-panel .nav-cta { border: 0; border-bottom: 1px solid var(--line); border-radius: 0; padding: 0; font-weight: 400; }
    .menu-panel .nav-cta:hover, .menu-panel .nav-cta:focus-visible { border-color: var(--line); }
    .menu-mode { display: flex; justify-content: flex-end; padding-top: 0.75rem; }
    .foot { grid-template-columns: 1fr; gap: 2rem; }
    .foot-links { grid-template-columns: 1fr; gap: 1.5rem; }
    .site-footer { padding: 2rem 0 2.5rem; }
  }
</style>
