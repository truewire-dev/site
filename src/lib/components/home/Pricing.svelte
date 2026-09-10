<!-- A rate card, not three boxes: each plan is a ruled row with the name and price in the
     first column, the terms in the middle and the action on the right. -->
<section id="pricing" class="pricing">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">06</span>
      <h2 class="section-title">Pricing</h2>
      <a class="btn btn-secondary margin-cta" href="mailto:hello@truewire.dev?subject=Truewire%3A%20official%20SDKs">Talk to us</a>
    </div>
    <div class="plans">
      <article class="plan">
        <div class="plan-head">
          <h3>Free. Self-hosted. Forever.</h3>
          <p class="price">$0</p>
        </div>
        <p class="terms">The toolchain, the runtimes, the mock server, the checks, the registry of specs. Apache-2.0 and MIT. Everything one developer needs, with no account.</p>
        <a class="btn btn-secondary" href="#quickstart">Get started</a>
      </article>
      <article class="plan plan-featured">
        <div class="plan-head">
          <h3>Official SDKs, run for you.</h3>
          <p class="price">€2,000 <span>per API, per month</span></p>
        </div>
        <p class="terms">Everything above, for your API: the spec and the clients in every language we ship, the docs, the mock and the MCP server, all free and open. The retainer is for what cannot be forked: nightly conformance over every method and stream, releases when your API moves, reproducible bug reports to your contact, and issue triage on the SDK repositories. One price per API, not per language. Annual at ten months.</p>
        <a class="btn btn-primary" href="mailto:hello@truewire.dev?subject=Official%20SDKs">Talk to us</a>
      </article>
      <article class="plan">
        <div class="plan-head">
          <h3>Founding partners.</h3>
          <p class="price">Six months free <span class="then">then €1,000 a month, locked</span></p>
        </div>
        <p class="terms">The first three exchanges. In return: link to the SDKs from your API docs, let us call them official, name one person who receives bug reports, and give us a test account if you have one. The price is stated on day one so the end of the trial is a date, not a surprise.</p>
        <a class="btn btn-secondary" href="mailto:hello@truewire.dev?subject=Founding%20partner">Apply</a>
      </article>
    </div>
  </div>
</section>
<style>
  .pricing { padding-bottom: clamp(3rem, 6vw, 5.5rem); }
  .margin-cta { margin-top: 1.25rem; }
  .plans { display: flex; flex-direction: column; }
  .plan {
    display: grid;
    grid-template-columns: minmax(0, 17rem) minmax(0, 1fr) auto;
    column-gap: clamp(1.5rem, 4vw, 3.5rem);
    align-items: start;
    padding: 1.5rem 0 1.75rem;
    border-top: 1px solid var(--line);
  }
  .plans .plan:first-child { border-top: 0; padding-top: 0.25rem; }
  .plan h3 { font-size: 1.3rem; margin: 0 0 0.35rem; line-height: 1.15; }
  .price { font-family: var(--display); font-size: 1.9rem; line-height: 1.1; margin: 0; letter-spacing: -0.01em; }
  .price span { font-family: var(--font); font-size: 0.9rem; color: var(--fg-muted); margin-left: 0.15rem; }
  .plan-featured .price { color: var(--accent); }
  .price .then { display: block; margin: 0.35rem 0 0; }
  .terms { color: var(--fg-muted); margin: 0.2rem 0 0; max-width: 40rem; }
  .plan .btn { white-space: nowrap; margin-top: 0.15rem; }
  @media (max-width: 48rem) {
    .plan { grid-template-columns: 1fr; row-gap: 0.75rem; }
    .plan .btn { justify-self: start; }
  }
  @media (max-width: 40rem) {
    .pricing { padding-bottom: 2.5rem; }
    .margin-cta { margin-top: 0.75rem; }
    .plan { padding: 1.25rem 0 1.5rem; row-gap: 0.6rem; }
    .plans .plan:first-child { padding-top: 0.5rem; }
    .plan .btn { justify-self: stretch; text-align: center; margin-top: 0.35rem; }
    .price { font-size: 1.7rem; }
  }
</style>
