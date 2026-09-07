<script lang="ts">
  // A dark pane, in both colour schemes. `html` is pre-formatted markup (the caller's own
  // transcript, with `.cmd`/`.kw`/`.str`/`.num`/`.cm` spans), rendered verbatim so its
  // whitespace survives, which a snippet's would not.
  let { label, caption, html, code = false }: {
    label: string, caption: string, html: string, code?: boolean
  } = $props()
</script>

<div class="terminal" class:code-pane={code} role="figure" aria-label={caption}>
  <div class="terminal-bar"><span>{label}</span></div>
  <pre><code>{@html html}</code></pre>
</div>

<style>
  .terminal {
    background: var(--term-bg);
    color: var(--term-fg);
    border-radius: var(--radius);
    border: 1px solid var(--term-line);
    overflow: hidden;
    margin-bottom: 1rem;
  }
  .terminal-bar {
    padding: 0.6rem 1.1rem;
    border-bottom: 1px solid var(--term-line);
    font-family: var(--mono);
    font-size: 0.74rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--term-dim);
  }
  pre {
    margin: 0;
    padding: 1.1rem 1.2rem 1.25rem;
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 0.84rem;
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
