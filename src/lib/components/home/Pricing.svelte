<section id="pricing" class="pricing">
  <div class="wrap">
    <h2 class="section-title">Pricing</h2>
    <div class="grid-3">
      <article class="plan">
        <h3>Free. Self-hosted. Forever.</h3>
        <p class="price">$0</p>
        <p>The toolchain, the runtime, the mock server, the checks. Apache-2.0 and MIT. Everything one developer needs, with no account.</p>
        <a class="btn btn-secondary" href="#quickstart">Get started</a>
      </article>
      <article class="plan plan-featured">
        <h3>Spec service.</h3>
        <p class="price">From $2,000 <span>per API</span></p>
        <p>Send us a docs URL. Get back a verified spec, a mock server, a generated client with tests, and checked docs, delivered as a repository you own. We price by surface size and by how much of it we can verify against a real account. For teams migrating off a hosted generator, or anyone integrating a WebSocket API they didn't write.</p>
        <a class="btn btn-primary" href="mailto:hello@truewire.dev?subject=Spec%20service%20quote">Request a quote</a>
      </article>
      <article class="plan">
        <h3>Cloud.</h3>
        <p class="price">Coming soon</p>
        <p>A hosted registry with private specs, managed regeneration and publishing (spec change, pull request, package release), and hosted mock endpoints for CI. Free for public specs.</p>
        <a class="btn btn-secondary" href="mailto:hello@truewire.dev?subject=Cloud%20waitlist">Join the waitlist</a>
      </article>
    </div>
  </div>
</section>

<style>
  .pricing { background: var(--bg-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .plan {
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 1.75rem;
    display: flex; flex-direction: column; gap: 0.5rem;
  }
  .plan-featured { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent) inset; }
  .plan h3 { font-size: 1.2rem; margin: 0; }
  .plan .price { font-size: 1.6rem; font-weight: 700; margin: 0.25rem 0 0.5rem; letter-spacing: -0.01em; }
  .plan .price span { font-size: 0.95rem; font-weight: 500; color: var(--fg-muted); }
  .plan p:not(.price) { color: var(--fg-muted); flex: 1; margin-bottom: 1rem; }
  .plan .btn { align-self: flex-start; }
</style>
