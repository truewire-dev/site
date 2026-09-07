<section class="props">
  <div class="wrap grid-3">
    <article class="prop">
      <h2>Built from the wire, not the document.</h2>
      <p>Every endpoint is backed by a recorded request and response, captured against the live API. The schema has to match the recording. When the API changes, the check goes red before your users do.</p>
    </article>
    <article class="prop">
      <h2>The things schemas can't say, declared and audited.</h2>
      <p>Pagination, response envelopes, redacted fields, stream subscriptions: declared as data beside the endpoint, checked against the schema, generated into code. A pagination block becomes a <code>_paged</code> walker with guards against silent truncation.</p>
    </article>
    <article class="prop">
      <h2>WebSocket is not an afterthought.</h2>
      <p>Streams, RPC-over-WS and JSON-RPC are first-class in the spec, the generator and the mock server. The mock replays recorded subscribe, push and unsubscribe sequences over a real socket. Your tests never touch the network.</p>
    </article>
  </div>
</section>

<style>
  .props { border-top: 1px solid var(--line); background: var(--bg-alt); }
  .prop h2 { font-size: 1.25rem; }
  .prop p { color: var(--fg-muted); margin: 0; }
</style>
