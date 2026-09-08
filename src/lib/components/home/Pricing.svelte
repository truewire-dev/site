<!-- A rate card, not three boxes: each plan is a ruled row with the name and price in the
     first column, the terms in the middle and the action on the right. -->
<section id="pricing" class="pricing">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">05</span>
      <h2 class="section-title">Pricing</h2>
      <a class="btn btn-secondary margin-cta" href="mailto:hello@truewire.dev?subject=Truewire%3A%20spec%20service">Talk to us</a>
    </div>
    <div class="plans">
      <article class="plan">
        <div class="plan-head">
          <h3>Free. Self-hosted. Forever.</h3>
          <p class="price">$0</p>
        </div>
        <p class="terms">The toolchain, the runtime, the mock server, the checks. Apache-2.0 and MIT. Everything one developer needs, with no account.</p>
        <a class="btn btn-secondary" href="#quickstart">Get started</a>
      </article>
      <article class="plan plan-featured">
        <div class="plan-head">
          <h3>Spec service.</h3>
          <p class="price">From $2,000 <span>per API</span></p>
        </div>
        <p class="terms">Send us a docs URL. Get back a verified spec, a mock server, a generated client with tests, and checked docs, delivered as a repository you own. We price by surface size and by how much of it we can verify against a real account. For teams migrating off a hosted generator, or anyone integrating a WebSocket API they didn't write.</p>
        <a class="btn btn-primary" href="mailto:hello@truewire.dev?subject=Spec%20service%20quote">Request a quote</a>
      </article>
      <article class="plan">
        <div class="plan-head">
          <h3>Cloud.</h3>
          <p class="price">Coming soon</p>
        </div>
        <p class="terms">A hosted registry with private specs, managed regeneration and publishing (spec change, pull request, package release), and hosted mock endpoints for CI. Free for public specs.</p>
        <a class="btn btn-secondary" href="mailto:hello@truewire.dev?subject=Cloud%20waitlist">Join the waitlist</a>
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
