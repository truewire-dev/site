<script lang="ts">
  import '$lib/data/docs/shiki.css'
  import { page } from '$app/state'
  let { data, children } = $props()

  // The page the reader is on, for the phone disclosure's label. Falls back to "On this
  // site" for a route the sidebar does not list.
  const current = $derived.by(() => {
    for (const item of data.nav) {
      if ('href' in item) { if (item.href === page.url.pathname) return item.title }
      else for (const sub of item.children) if (sub.href === page.url.pathname) return sub.title
    }
    return 'On this site'
  })

  // The phone disclosure is a <details>, so it works before hydration; once hydrated the
  // layout persists across navigation, so it is closed whenever the route changes.
  let open = $state(false)
  $effect(() => {
    void page.url.pathname
    open = false
  })
</script>

{#snippet navList()}
  {#each data.nav as item (item.title)}
    {#if 'href' in item}
      <a href={item.href} class="docs-nav-link" aria-current={page.url.pathname === item.href ? 'page' : undefined}>{item.title}</a>
    {:else}
      <div class="docs-nav-group">{item.title}</div>
      {#each item.children as sub (sub.href)}
        <a href={sub.href} class="docs-nav-link docs-nav-sub" aria-current={page.url.pathname === sub.href ? 'page' : undefined}>{sub.title}</a>
      {/each}
    {/if}
  {/each}
{/snippet}

<div class="docs-shell">
  <div class="docs-wrap">
    <!-- Wide screens: the sidebar. Narrow screens: the same list behind one disclosure above
         the article, closed by default, so the article starts on the first screen. Only one
         of the two is displayed at a time. -->
    <aside class="docs-sidebar">
      <nav aria-label="Docs">
        {@render navList()}
      </nav>
    </aside>
    <details class="docs-menu" bind:open>
      <summary class="docs-menu-button" aria-controls="docs-menu-list" aria-expanded={open}>
        <span class="docs-menu-label">Docs</span>
        <span class="docs-menu-current">{current}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </summary>
      <nav id="docs-menu-list" class="docs-menu-list" aria-label="Docs">
        {@render navList()}
      </nav>
    </details>
    <div class="docs-content">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .docs-shell { padding: 2.5rem 0 5rem; }
  .docs-wrap {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }
  .docs-sidebar {
    position: sticky;
    top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .docs-menu { display: none; }
  .docs-nav-group {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--fg-muted);
    margin: 1rem 0 0.25rem;
  }
  .docs-nav-link {
    display: block;
    font-size: 0.9rem;
    color: var(--fg-muted);
    text-decoration: none;
    padding: 0.3rem 0 0.3rem 0.7rem;
    margin-left: -0.7rem;
    border-left: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .docs-nav-sub { padding-left: 1.2rem; }
  .docs-nav-link:hover { color: var(--fg); }
  .docs-nav-link[aria-current="page"] {
    color: var(--accent);
    border-left-color: var(--accent);
    font-weight: 600;
  }
  .docs-content { min-width: 0; }

  @media (max-width: 56rem) {
    .docs-shell { padding: 1.25rem 0 3.5rem; }
    .docs-wrap { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; padding: 0 var(--gutter); }
    .docs-sidebar { display: none; }
    .docs-menu { display: block; border: 1px solid var(--line); border-radius: var(--radius); background: var(--bg-alt); }
    .docs-menu-button {
      display: flex; align-items: center; gap: 0.6rem;
      min-height: 2.75rem; padding: 0.5rem 0.9rem;
      cursor: pointer; list-style: none; user-select: none;
      color: var(--fg); line-height: 1.2;
    }
    .docs-menu-button::-webkit-details-marker { display: none; }
    .docs-menu-label { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-muted); flex: none; }
    .docs-menu-current { font-weight: 600; font-size: 0.95rem; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .docs-menu-button svg { width: 1rem; height: 1rem; color: var(--fg-muted); flex: none; transition: transform 0.15s; }
    .docs-menu[open] .docs-menu-button svg { transform: rotate(180deg); }
    .docs-menu[open] .docs-menu-current { color: var(--accent); }
    .docs-menu-list { display: flex; flex-direction: column; border-top: 1px solid var(--line); padding: 0.5rem 0.9rem 0.75rem; }
    .docs-menu-list .docs-nav-link { margin-left: 0; padding: 0.55rem 0 0.55rem 0.7rem; font-size: 0.95rem; }
    .docs-menu-list .docs-nav-sub { padding-left: 1.4rem; }
    .docs-menu-list .docs-nav-group { margin-top: 0.85rem; }
  }
</style>
