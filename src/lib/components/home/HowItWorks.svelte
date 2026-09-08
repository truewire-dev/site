<section id="how" class="how">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">03</span>
      <h2 class="section-title">How it works</h2>
    </div>
    <ol class="steps">
      <li>
        <h3><span class="step-n">1</span> Record.</h3>
        <p>Point the spec at the API's docs and call each endpoint once: <code>truewire capture</code> makes the call through your own generated client and keeps the pair. <code>truewire import openapi</code> seeds the spec if a document exists. An endpoint that can't be called declares why.</p>
      </li>
      <li>
        <h3><span class="step-n">2</span> Declare.</h3>
        <p>Add the blocks a schema can't hold: <code>pagination</code>, <code>envelope</code>, <code>redacted</code>, <code>push</code>. Give every price a <code>decimal-string</code> and every timestamp its real epoch unit. <code>truewire check</code> audits all of it.</p>
      </li>
      <li>
        <h3><span class="step-n">3</span> Generate.</h3>
        <p><code>truewire generate python</code> writes an async client with typed responses, runtime validation on by default, <code>_paged</code> walkers, and docstrings pulled from the spec.</p>
      </li>
      <li>
        <h3><span class="step-n">4</span> Gate.</h3>
        <p><code>truewire examples --require-verified</code>, <code>truewire surface</code>, <code>truewire standards</code> and <code>truewire docs check</code> run in CI. We call a client done when they are green, not before.</p>
      </li>
    </ol>
  </div>
</section>

<style>
  .how { padding-bottom: clamp(3rem, 6vw, 5.5rem); }
  .steps {
    list-style: none; margin: 0; padding: 0;
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(2rem, 4vw, 4rem); row-gap: 0;
  }
  .steps li { border-top: 1px solid var(--line); padding: 1.25rem 0 1.75rem; }
  .steps h3 { font-size: 1.45rem; display: flex; align-items: baseline; gap: 0.6rem; margin: 0 0 0.5rem; }
  .steps p { color: var(--fg-muted); margin: 0; font-size: 1rem; }
  .step-n { font-style: italic; font-weight: 400; color: var(--accent); }
  @media (max-width: 40rem) {
    .how { padding-bottom: 2.5rem; }
    .steps { grid-template-columns: 1fr; }
    .steps li { padding: 1rem 0 1.25rem; }
    .steps h3 { font-size: 1.3rem; }
  }
</style>
