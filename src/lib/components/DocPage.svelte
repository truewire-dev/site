<script lang="ts">
  import { page } from '$app/state'
  import DocsProse from '$lib/components/DocsProse.svelte'
  import type { DocPage } from '$lib/docs.server'
  let { doc }: { doc: DocPage } = $props()

  // Fetches the sibling static .md file scripts/render-docs.mjs writes for every page,
  // rather than threading raw markdown through the page payload.
  let copied = $state(false)
  let resetTimeout: ReturnType<typeof setTimeout> | undefined
  async function copyPage() {
    const response = await fetch(`${doc.route}.md`)
    if (!response.ok) return
    await navigator.clipboard.writeText(await response.text())
    copied = true
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(() => { copied = false }, 1500)
  }
  $effect(() => {
    void page.url.pathname
    copied = false
  })
</script>

<svelte:head>
  <title>{doc.slug === 'index' ? 'Docs' : doc.title} | Truewire</title>
  <meta name="description" content={doc.description} />
  <link rel="canonical" href="https://truewire.dev{doc.route}" />
  <meta property="og:url" content="https://truewire.dev{doc.route}" />
  <meta property="og:title" content="{doc.slug === 'index' ? 'Docs' : doc.title} | Truewire" />
  <meta property="og:description" content={doc.description} />
  <link rel="alternate" type="text/markdown" href="{doc.route}.md" />
</svelte:head>

<div class="toolbar">
  <button type="button" class="copy-page" class:copied onclick={copyPage} title={copied ? 'Copied' : 'Copy page as Markdown'}>
    {#if copied}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
      Copied
    {:else}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></svg>
      Copy page
    {/if}
  </button>
  <a class="source" href="https://github.com/truewire-dev/truewire" rel="noopener">Source on GitHub</a>
</div>

<DocsProse html={doc.html} />

<style>
  .toolbar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin: 0 0 1.25rem; }
  .copy-page {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font: inherit;
    font-size: 0.85rem;
    color: var(--fg-muted);
    padding: 0.3rem 0.65rem;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: var(--bg-alt);
    cursor: pointer;
  }
  .copy-page:hover, .copy-page.copied { color: var(--accent); border-color: var(--accent); }
  .copy-page svg { width: 0.95rem; height: 0.95rem; }
  .source { font-size: 0.85rem; color: var(--fg-muted); text-decoration: none; }
  .source:hover { color: var(--accent); text-decoration: underline; }
</style>
