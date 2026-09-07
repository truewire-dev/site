<section id="faq" class="faq">
  <div class="wrap narrow">
    <h2 class="section-title">FAQ</h2>
    <details>
      <summary>Is this OpenAPI?</summary>
      <p>No. The spec is JSON Schema 2020-12 per endpoint, one directory each, with recorded examples and declared blocks for pagination, envelopes, streams and redaction. OpenAPI has no place for most of that. It is a strict superset in what it can express and a strict subset in ceremony.</p>
    </details>
    <details>
      <summary>Can I import my OpenAPI document?</summary>
      <p>Yes. <code>truewire import openapi spec.yaml</code> reads 3.0 and 3.1, writes one endpoint directory per operation, and turns any <code>examples</code> in the document into recorded example pairs. Then <code>truewire check</code> tells you what the document left out.</p>
    </details>
    <details>
      <summary>Does it do WebSocket?</summary>
      <p>Yes, and it is the reason the tool exists. Streams (subscribe, push, unsubscribe), request/reply over WS, and JSON-RPC over either transport are first-class in the spec, the generator and the mock server. The mock replays recorded message sequences over a real socket.</p>
    </details>
    <details>
      <summary>When is TypeScript coming?</summary>
      <p>It is the next language on the roadmap; the OpenAPI importer and the MCP server it was queued behind have shipped. The spec format is language-neutral, so a TypeScript client generated from a spec will pass the same mock-backed tests as the Python one. No date yet; the <a href="/roadmap">roadmap</a> says "done when," not "done by."</p>
    </details>
    <details>
      <summary>How is this different from Speakeasy?</summary>
      <p>Speakeasy generates SDKs from an OpenAPI document you own, on a closed generator, for a monthly fee per language. Truewire is open source and self-hosted, starts from recorded wire examples rather than a document, covers WebSocket and JSON-RPC, and gates every endpoint on real evidence. If you own a clean OpenAPI document and want six languages this quarter, Speakeasy is a reasonable choice. If you are integrating an API you don't control, it is not, and Truewire is.</p>
    </details>
    <details>
      <summary>Who's behind it?</summary>
      <p>Truewire is a spinoff of the internal tooling behind <a href="https://github.com/tribulnation">Tribulnation</a>'s typed exchange clients, founded by <a href="https://claramunt.eu">Marcel Claramunt</a> (<a href="https://x.com/marcelclaramunt">@marcelclaramunt</a>), who spent years hand-maintaining clients for 14 exchange and blockchain APIs and is the project's public face. The day-to-day engineering, docs and roadmap are run by an AI operator; Marcel reviews and decides on anything public, financial or legal. Every claim in the docs is checked against the code, and every endpoint against the wire.</p>
    </details>
  </div>
</section>

<style>
  details { border-bottom: 1px solid var(--line); padding: 1rem 0; }
  details:first-of-type { border-top: 1px solid var(--line); }
  summary { cursor: pointer; font-weight: 600; font-size: 1.1rem; list-style: none; display: flex; justify-content: space-between; gap: 1rem; }
  summary::-webkit-details-marker { display: none; }
  summary::after { content: "+"; color: var(--accent); font-weight: 400; flex: none; }
  details[open] summary::after { content: "\2212"; }
  details p { color: var(--fg-muted); margin: 0.75rem 0 0; }
</style>
