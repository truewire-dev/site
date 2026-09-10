<!-- The offer for companies whose API is the product: what is free, what is the service.
     Set as the ledger the other sections use; two ruled lists side by side. -->
<section id="owners" class="owners band">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">05</span>
      <h2 class="section-title">For API owners</h2>
      <a class="btn btn-secondary margin-cta" href="mailto:hello@truewire.dev?subject=Official%20SDKs">Talk to us</a>
    </div>
    <div class="body">
      <p class="lede">Your API is the product and the SDKs are an afterthought: streams, signing, pagination, changes nobody announced, users in four languages. We run the official SDKs for you, generated from a verified spec and tested against your live API every night. Exchanges first.</p>
      <p class="rule">The artefacts are free and open. The vigilance is the service.</p>
      <div class="cols">
        <div class="col">
          <h3>Free and open</h3>
          <ul>
            <li><strong>The spec</strong>, CC0: every endpoint, public and private, every WebSocket channel, with recorded wire examples. You can leave any day with everything.</li>
            <li><strong>The clients</strong>, generated from it and validated at runtime, under your namespace or ours. Python, TypeScript and Rust today; Go next.</li>
            <li><strong>Docs and guides</strong>: a reference with the recorded example beside every method, guides for auth, pagination, streams and errors, and one skill file per API so a coding agent integrates without reading the docs. At <code>&lt;name&gt;.truewire.dev</code>, or exported into your docs site.</li>
            <li><strong>A mock server</strong> for your developers' CI, replaying the same recordings. Their test suites stop hitting your API.</li>
            <li><strong>An MCP server</strong> you host, for request/reply endpoints.</li>
          </ul>
        </div>
        <div class="col">
          <h3>The service</h3>
          <ul>
            <li><strong>Conformance, every night</strong>, every method and stream, public and private, against your live API: schema drift, new fields, changed enums, changed error shapes, undocumented parameters.</li>
            <li><strong>Releases on drift</strong>, and on changes you announce: the clients ship the day the change goes live, with a public wire changelog per API. Breaking changes are major bumps, said plainly.</li>
            <li><strong>Bug reports</strong> reproducible by construction: the exact request, the exact response, what the spec expected, first seen when. Email, GitHub, Slack or a webhook.</li>
            <li><strong>Issue triage</strong> on the official SDK repositories: your developers' client questions answered within a day, real bugs turned into fixes.</li>
          </ul>
        </div>
      </div>
      <p class="ask">What we ask for first is not money: link to the SDKs from your API docs, let us call them official, and name one person who receives bug reports. Founding-partner terms are in the <a href="#pricing">pricing</a> below.</p>
    </div>
  </div>
</section>

<style>
  .owners { padding: clamp(3rem, 6vw, 5.5rem) 0; }
  .margin-cta { margin-top: 1.25rem; }
  .body .lede { font-size: 1.15rem; line-height: 1.5; max-width: 40rem; margin: 0 0 1rem; }
  .rule { font-family: var(--display); font-size: 1.4rem; line-height: 1.2; margin: 0 0 1.75rem; letter-spacing: -0.01em; }
  .cols { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: clamp(1.5rem, 4vw, 3.5rem); row-gap: 1.5rem; }
  .col h3 { font-size: 0.78rem; font-family: var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); margin: 0 0 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--line-strong); }
  .col ul { list-style: none; margin: 0; padding: 0; }
  .col li { padding: 0.65rem 0; border-bottom: 1px solid var(--line); color: var(--fg-muted); }
  .col li strong { color: var(--fg); font-weight: 600; }
  .ask { color: var(--fg-muted); margin: 1.75rem 0 0; max-width: 40rem; }
  @media (max-width: 48rem) {
    .cols { grid-template-columns: 1fr; }
  }
  @media (max-width: 40rem) {
    .owners { padding: 2.5rem 0; }
    .margin-cta { margin-top: 0.75rem; }
    .body .lede { font-size: 1.05rem; }
    .rule { font-size: 1.2rem; }
  }
</style>
