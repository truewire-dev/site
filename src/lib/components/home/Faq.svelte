<section id="faq" class="faq band">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">07</span>
      <h2 class="section-title">FAQ</h2>
    </div>
    <div class="questions">
    <details>
      <summary>Is this OpenAPI?</summary>
      <p>No. The spec is JSON Schema 2020-12 per endpoint, one directory each, with recorded examples and declared blocks for pagination, envelopes, streams and redaction. OpenAPI has no place for most of that. The format holds what OpenAPI cannot and asks for less ceremony.</p>
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
      <summary>Is there a TypeScript client?</summary>
      <p>Yes, and a Rust one. <code>truewire generate typescript</code> and <code>truewire generate rust</code> read the same plan as the Python backend; the runtimes are <code>@truewire/core</code> on npm and <code>truewire-core</code> on crates.io, and the showcase clients for Bluesky and weather.gov are published in all three languages, replaying the same recordings through the mock in CI. Go is next. We do not promise dates. We ship when the gate is green, and we publish the gate on the <a href="/roadmap">roadmap</a>.</p>
    </details>
    <details>
      <summary>I run an API. What exactly do you do for me?</summary>
      <p>We build and maintain your official SDKs. The spec, the clients, the docs, the mock and the MCP server are free and open, generated from recorded wire examples of your API and published under your namespace or ours. The service is the part nobody can fork: every night we record every method and stream against your live API and diff it against the spec; when it drifts, the clients are re-released and you get a reproducible bug report; and we answer your developers on the SDK repositories. Exchanges first, because streams, signing and pagination are where hand-written SDKs rot fastest. See <a href="#owners">For API owners</a>.</p>
    </details>
    <details>
      <summary>Why pay when the clients are free?</summary>
      <p>You are not paying for code you could fork. You are paying for tomorrow night's run: the spec kept true when your API changes, the release that follows, the report that arrives before your users notice, and a person answering on the issue tracker. The artefacts are free; the vigilance is the service.</p>
    </details>
    <details>
      <summary>How is this different from Speakeasy?</summary>
      <p>Speakeasy generates SDKs from an OpenAPI document you own, on a closed generator, for a monthly fee per language. Truewire is open source and self-hosted, starts from recorded wire examples rather than a document, covers WebSocket and JSON-RPC, and gates every endpoint on a recorded example or a stated reason. If you own a clean OpenAPI document and want six languages this quarter, pick Speakeasy. If you are integrating an API you don't control, pick Truewire. If you own an API with streams, signing and users in four languages, and want it watched every night, talk to us.</p>
    </details>
    <details>
      <summary>Who's behind it?</summary>
      <p>Truewire is a spinoff of the internal tooling behind <a href="https://github.com/tribulnation">Tribulnation</a>'s typed exchange clients, founded by <a href="https://claramunt.eu">Marcel Claramunt</a> (<a href="https://x.com/marcelclaramunt">@marcelclaramunt</a>), who spent years hand-maintaining clients for 14 exchange and blockchain APIs and is the project's public face. An AI operator runs the day-to-day engineering, the docs and the roadmap. Marcel decides on anything public, financial or legal. We hold the code to one bar whoever wrote it: every claim in the docs is checked against the code, and every endpoint against the wire.</p>
    </details>
    </div>
  </div>
</section>

<style>
  .faq { padding-bottom: clamp(4rem, 8vw, 7rem); }
  .questions { max-width: 46rem; }
  details { border-bottom: 1px solid var(--line); padding: 0.5rem 0 0.6rem; }
  details:first-of-type { padding-top: 0; }
  details:first-of-type summary { padding-top: 0.25rem; }
  /* The summary carries half the row's padding itself, so the tap target is the whole row. */
  summary {
    cursor: pointer;
    font-family: var(--display);
    font-weight: 500;
    font-size: 1.35rem;
    line-height: 1.2;
    list-style: none;
    display: flex; justify-content: space-between; align-items: baseline; gap: 1rem;
    padding: 0.5rem 0;
  }
  summary::-webkit-details-marker { display: none; }
  summary::after { content: "+"; font-family: var(--mono); color: var(--accent); font-weight: 400; font-size: 1.1rem; flex: none; }
  details[open] summary::after { content: "\2212"; }
  summary:hover { color: var(--accent); }
  details p { color: var(--fg-muted); margin: 0.25rem 0 0; max-width: 42rem; }
  @media (max-width: 40rem) {
    .faq { padding-bottom: 3rem; }
    summary { font-size: 1.2rem; min-height: 2.75rem; }
  }
</style>
