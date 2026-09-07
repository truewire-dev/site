<!-- Three claims, set as ruled rows: index in the margin, the claim, then the evidence. -->
<section class="props">
  <div class="wrap">
    <ol class="prop-list">
      <li class="prop">
        <span class="prop-n" aria-hidden="true">01</span>
        <h2>Built from the wire, not the document.</h2>
        <p>Every endpoint is backed by a recorded request and response, captured against the live API. The schema has to match the recording. When the API changes, the check goes red before your users do.</p>
      </li>
      <li class="prop">
        <span class="prop-n" aria-hidden="true">02</span>
        <h2>The things schemas can't say, declared and audited.</h2>
        <p>Pagination, response envelopes, redacted fields, stream subscriptions: declared as data beside the endpoint, checked against the schema, generated into code. A pagination block becomes a <code>_paged</code> walker with guards against silent truncation.</p>
      </li>
      <li class="prop">
        <span class="prop-n" aria-hidden="true">03</span>
        <h2>WebSocket is not an afterthought.</h2>
        <p>Streams, RPC-over-WS and JSON-RPC are first-class in the spec, the generator and the mock server. The mock replays recorded subscribe, push and unsubscribe sequences over a real socket. Your tests never touch the network.</p>
      </li>
    </ol>
  </div>
</section>

<style>
  .props { padding: 0 0 clamp(3rem, 6vw, 5rem); }
  .prop-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line-strong); }
  .prop {
    display: grid;
    grid-template-columns: var(--margin-col) minmax(0, 1fr) minmax(0, 1.25fr);
    column-gap: clamp(2rem, 5vw, 5rem);
    align-items: start;
    padding: 1.75rem 0 2rem;
    border-bottom: 1px solid var(--line);
  }
  .prop-n { font-family: var(--mono); font-size: 0.75rem; letter-spacing: 0.08em; color: var(--accent); padding-top: 0.5rem; }
  .prop h2 { font-size: clamp(1.5rem, 2.4vw, 1.9rem); line-height: 1.15; margin: 0; max-width: 16ch; }
  .prop p { color: var(--fg-muted); margin: 0.3rem 0 0; }
  @media (max-width: 56rem) {
    .prop { grid-template-columns: 1fr; row-gap: 0.5rem; padding: 1.5rem 0; }
    .prop h2 { max-width: none; }
    .prop-n { padding-top: 0; }
  }
</style>
