<script lang="ts">
  // A dark terminal pane, in both colour schemes. `html` is pre-formatted markup (the
  // caller's own transcript, with `.cmd`/`.kw`/`.str`/`.num`/`.cm` spans), rendered
  // verbatim so its whitespace survives, which a snippet's would not.
  let { label, caption, html, code = false }: {
    label: string, caption: string, html: string, code?: boolean
  } = $props()
</script>

<div class="terminal" class:code-pane={code} role="figure" aria-label={caption}>
  <div class="terminal-bar"><span></span><span></span><span></span><em>{label}</em></div>
  <pre><code>{@html html}</code></pre>
</div>

<style>
  .terminal {
    background: var(--term-bg);
    color: var(--term-fg);
    border-radius: var(--radius);
    border: 1px solid var(--line);
    overflow: hidden;
    margin-bottom: 1.25rem;
  }
  .terminal-bar {
    display: flex; align-items: center; gap: 0.45rem;
    padding: 0.6rem 0.9rem;
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
  .terminal-bar span { width: 0.7rem; height: 0.7rem; border-radius: 50%; background: rgba(255, 255, 255, 0.18); }
  .terminal-bar em { margin-left: auto; font-style: normal; font-family: var(--mono); font-size: 0.78rem; color: var(--term-dim); }
  pre {
    margin: 0;
    padding: 1.1rem 1.25rem;
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 0.875rem;
    line-height: 1.55;
    color: var(--term-dim);
    tab-size: 2;
  }
  .terminal :global(.cmd) { color: var(--term-cmd); font-weight: 600; }
  .code-pane pre { color: var(--term-fg); }
  .code-pane :global(.kw) { color: var(--term-kw); }
  .code-pane :global(.str) { color: var(--term-str); }
  .code-pane :global(.num) { color: var(--term-num); }
  .code-pane :global(.cm) { color: var(--term-dim); }
</style>
