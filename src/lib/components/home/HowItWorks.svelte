<section id="how" class="how">
  <div class="wrap">
    <h2 class="section-title">How it works</h2>
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
        <p><code>truewire examples --require-verified</code>, <code>truewire surface</code>, <code>truewire standards</code> and <code>truewire docs check</code> run in CI. A client is done when they are green, not when someone says so.</p>
      </li>
    </ol>
  </div>
</section>

<style>
  .how { background: var(--bg-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .steps { list-style: none; margin: 2rem 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  @media (max-width: 64rem) { .steps { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 40rem) { .steps { grid-template-columns: 1fr; } }
  .steps h3 { font-size: 1.15rem; display: flex; align-items: center; gap: 0.6rem; }
  .steps p { color: var(--fg-muted); margin: 0; }
  .step-n {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.9rem; height: 1.9rem; border-radius: 50%;
    background: var(--accent-soft); color: var(--accent);
    font-size: 0.95rem; font-weight: 700; flex: none;
  }
</style>
