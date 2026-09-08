<script lang="ts">
  import Mark from '$lib/components/Mark.svelte'
</script>

<!-- The hero's visual is a recorded example: the response Truewire keeps beside the endpoint,
     and the types it becomes. The values are the ones the quickstart's Python snippet reads
     back, so the two sections tell one story. The fold sits on a teal-tinted band; the stats
     strip that follows (Stats.svelte) shares the band, so the two read as one shape. -->
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <div class="hero-mark"><Mark size={64} /></div>
      <p class="eyebrow">Open source · Python now, TypeScript next</p>
      <h1>Typed clients, <em class="accent">true to the wire.</em></h1>
      <p class="lede">Truewire turns any API, documented or not, REST or WebSocket, into a typed, validated client you can trust. Record real wire examples. Declare what a schema can't say. Generate the client, the tests, the mock and the docs from the same source.</p>
      <div class="cta">
        <a class="btn btn-primary" href="#quickstart">Get started</a>
        <a class="btn btn-secondary" href="/docs/spec/authoring">Read the spec format</a>
      </div>
      <p class="fine"><code>pip install truewire</code> · Apache-2.0 toolchain, MIT runtime. No account.</p>
    </div>

    <figure class="specimen" aria-label="A recorded example: the response of GET /pets/42 and the typed record it becomes">
      <div class="spec-head">
        <span class="spec-k">recorded</span>
        <span class="spec-v">GET /pets/42 <span class="arrow">→</span> 200</span>
      </div>
<pre class="spec-body"><code>{'{'}
  <span class="key">"id"</span>: <span class="num">42</span>,
  <span class="key">"name"</span>: <span class="str">"Fido"</span>,
  <span class="key">"status"</span>: <span class="str">"sold"</span>,
  <span class="key">"created_at"</span>: <span class="str">"2025-12-24T08:30:00Z"</span>
{'}'}</code></pre>
      <div class="spec-head spec-head-check">
        <span class="spec-k"><Mark size={16} /> typed</span>
        <span class="spec-v">Pet, validated on every call</span>
      </div>
<pre class="spec-body spec-types"><code><span class="key">id</span>          <span class="kw">int</span>
<span class="key">name</span>        <span class="kw">str</span>
<span class="key">status</span>      <span class="kw">Literal</span>[<span class="str">'available'</span>, <span class="str">'pending'</span>, <span class="str">'sold'</span>]
<span class="key">created_at</span>  <span class="kw">datetime</span>  <span class="cm"># parsed, tz-aware</span></code></pre>
    </figure>
  </div>
</section>

<style>
  .hero { padding: clamp(2.5rem, 6vw, 5.5rem) 0 clamp(2.5rem, 5vw, 4.5rem); background: var(--hero-bg); }
  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    column-gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
  }
  .hero-mark { color: var(--accent); margin: 0 0 1.5rem -0.2rem; line-height: 0; }
  .eyebrow {
    font-family: var(--mono);
    color: var(--fg-muted);
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }
  h1 {
    font-size: clamp(3.1rem, 7vw, 5.6rem);
    line-height: 0.98;
    letter-spacing: -0.015em;
    max-width: 12ch;
    margin: 0 0 1.5rem -0.03em;
  }
  .accent { color: var(--accent); font-style: italic; font-weight: 400; }
  .lede { font-size: 1.2rem; line-height: 1.5; max-width: 34rem; color: var(--fg); margin-bottom: 2rem; }
  .cta { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .fine { color: var(--fg-muted); font-size: 1rem; margin: 0; }

  /* The specimen: a dark pane in the terminal's palette, ruled like a record card. */
  .specimen {
    margin: 0;
    background: var(--term-bg);
    color: var(--term-fg);
    border-radius: var(--radius);
    border: 1px solid var(--term-line);
    font-family: var(--mono);
    font-size: 0.84rem;
    line-height: 1.55;
    overflow: hidden;
  }
  .spec-head {
    display: flex; justify-content: space-between; align-items: baseline; gap: 1rem;
    padding: 0.7rem 1.1rem;
    border-bottom: 1px solid var(--term-line);
    font-size: 0.74rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--term-dim);
  }
  .spec-head-check { border-top: 1px solid var(--term-line); }
  .spec-k { display: inline-flex; align-items: center; gap: 0.45rem; }
  .spec-k :global(.mark) { color: var(--term-kw); }
  .spec-v { color: var(--term-fg); text-transform: none; letter-spacing: 0; }
  .arrow { color: var(--term-kw); }
  .spec-body { margin: 0; padding: 1rem 1.1rem 1.1rem; overflow-x: auto; color: var(--term-fg); tab-size: 2; }
  .spec-types { color: var(--term-dim); }
  .key { color: var(--term-fg); }
  .spec-types .key { color: var(--term-fg); }
  .str { color: var(--term-str); }
  .num { color: var(--term-num); }
  .kw { color: var(--term-kw); }
  .cm { color: var(--term-dim); }

  @media (max-width: 60rem) {
    .hero-grid { grid-template-columns: 1fr; row-gap: 3rem; align-items: start; }
    h1 { max-width: 14ch; }
  }
  @media (max-width: 40rem) {
    .hero-mark :global(.mark) { width: 48px; height: 48px; }
    .lede { font-size: 1.1rem; }
    .specimen { font-size: 0.78rem; }
  }
</style>
