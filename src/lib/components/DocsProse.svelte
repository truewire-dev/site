<script lang="ts">
  let { html }: { html: string } = $props()

  // Each code block's `.docs-code-copy` button is baked into `html` at build time
  // (scripts/render-docs.mjs), so wiring it up is one delegated click listener here.
  const resetTimeouts = new WeakMap<HTMLButtonElement, ReturnType<typeof setTimeout>>()
  async function copyCode(button: HTMLButtonElement) {
    const code = button.closest('.docs-code-wrap')?.querySelector('code')
    if (!code) return
    await navigator.clipboard.writeText(code.textContent ?? '')
    button.classList.add('copied')
    button.ariaLabel = 'Copied'
    button.title = 'Copied'
    clearTimeout(resetTimeouts.get(button))
    resetTimeouts.set(button, setTimeout(() => {
      button.classList.remove('copied')
      button.ariaLabel = 'Copy code'
      button.title = 'Copy code'
    }, 1500))
  }

  function handleClick(event: MouseEvent) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.docs-code-copy')
    if (button) void copyCode(button)
  }
</script>

<!-- The only interactive elements inside are real <button>s baked into `html`, keyboard
     operable on their own; this delegates their click handling, not the article's. -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article class="docs-prose" onclick={handleClick}>
  {@html html}
</article>

<style>
  :global(.docs-prose h1) { font-size: clamp(1.9rem, 3.5vw, 2.4rem); margin: 0 0 1rem; }
  :global(.docs-prose h2) { font-size: 1.45rem; margin: 2.5rem 0 0.75rem; padding-top: 0.5rem; }
  :global(.docs-prose h3) { font-size: 1.15rem; margin: 1.75rem 0 0.5rem; }
  :global(.docs-prose h4) { font-size: 1rem; margin: 1.5rem 0 0.5rem; }
  :global(.docs-prose p) { line-height: 1.65; margin: 0 0 1rem; }
  :global(.docs-prose h1 + p) { font-size: 1.1rem; }
  :global(.docs-prose blockquote) {
    margin: 0 0 1.5rem;
    padding: 0.75rem 1.1rem;
    border-left: 3px solid var(--accent);
    background: var(--bg-alt);
    border-radius: 0 8px 8px 0;
    color: var(--fg-muted);
  }
  :global(.docs-prose blockquote p) { margin: 0; }
  :global(.docs-prose ul), :global(.docs-prose ol) { line-height: 1.65; margin: 0 0 1rem; padding-left: 1.4rem; }
  :global(.docs-prose li) { margin: 0.35rem 0; }
  :global(.docs-prose li > p) { margin: 0 0 0.5rem; }
  :global(.docs-prose hr) { border: 0; border-top: 1px solid var(--line); margin: 2rem 0; }
  :global(.docs-prose table) {
    display: block;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
    font-size: 0.9em;
    margin: 0 0 1.5rem;
  }
  :global(.docs-prose th), :global(.docs-prose td) {
    padding: 0.5rem 0.85rem;
    text-align: left;
    vertical-align: top;
    border: 1px solid var(--line);
  }
  :global(.docs-prose th) { background: var(--bg-alt); font-weight: 600; white-space: nowrap; }
  :global(.docs-prose tbody tr:nth-child(even)) { background: var(--bg-alt); }
  :global(.docs-prose a) { color: var(--accent); }
  :global(.docs-prose code) { font-size: 0.875em; }
  :global(.docs-code-wrap) { position: relative; margin: 0 0 1.5rem; }
  :global(.docs-prose pre) {
    margin: 0;
    padding: 1rem 2.75rem 1rem 1.1rem;
    border-radius: var(--radius);
    border: 1px solid var(--line);
    background: var(--bg-alt);
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 0.85rem;
    line-height: 1.6;
    tab-size: 2;
  }
  :global(.docs-prose pre code) { font-size: inherit; }
  :global(.docs-code-copy) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: var(--bg);
    color: var(--fg-muted);
    cursor: pointer;
    padding: 0;
    transition: color 0.15s, border-color 0.15s;
  }
  :global(.docs-code-copy:hover) { color: var(--accent); border-color: var(--accent); }
  :global(.docs-code-copy-icon) { width: 0.85rem; height: 0.85rem; }
  :global(.docs-code-copy-icon-check) { display: none; }
  :global(.docs-code-copy.copied .docs-code-copy-icon-copy) { display: none; }
  :global(.docs-code-copy.copied .docs-code-copy-icon-check) { display: inline; }
  /* shiki dual-theme tokens: each span's class (shiki.css, generated at build time)
   * carries --shiki-light/--shiki-dark; only the active scheme's colour is read. */
  :global(html[data-mode="dark"] .docs-prose pre code span) { color: var(--shiki-dark, inherit); }
  :global(html[data-mode="light"] .docs-prose pre code span) { color: var(--shiki-light, inherit); }
  @media (prefers-color-scheme: dark) {
    :global(html:not([data-mode]) .docs-prose pre code span) { color: var(--shiki-dark, inherit); }
  }
  @media (prefers-color-scheme: light) {
    :global(html:not([data-mode]) .docs-prose pre code span) { color: var(--shiki-light, inherit); }
  }
</style>
