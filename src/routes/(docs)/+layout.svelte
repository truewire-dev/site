<script lang="ts">
  import '$lib/data/docs/shiki.css'
  import { page } from '$app/state'
  let { data, children } = $props()
</script>

<div class="docs-shell">
  <div class="docs-wrap">
    <aside class="docs-sidebar">
      <nav aria-label="Docs">
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
      </nav>
    </aside>
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
    .docs-wrap { grid-template-columns: 1fr; gap: 1.5rem; }
    .docs-sidebar {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
    }
    .docs-nav-group { display: none; }
    .docs-nav-link { margin-left: 0; padding-left: 0; border-left: 0; }
    .docs-nav-sub { padding-left: 0; }
  }
</style>
