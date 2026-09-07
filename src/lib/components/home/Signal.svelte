<script lang="ts">
  import Mark from '$lib/components/Mark.svelte'
  const steps = [
    { n: '01', title: 'Start with the evidence.', text: 'Import an OpenAPI document or author a spec. Keep real requests and responses beside every endpoint.', code: 'truewire import openapi spec.yaml', tag: 'CAPTURE' },
    { n: '02', title: 'Make the implicit explicit.', text: 'Pagination. Envelopes. Streaming. Declare the behavior a schema alone can’t describe, then check it against your examples.', code: 'truewire check', tag: 'VERIFY' },
    { n: '03', title: 'Build on something solid.', text: 'Generate a typed Python client. Replay recorded responses with a local mock. Keep your integration grounded in the same source.', code: 'truewire generate python', tag: 'GENERATE' }
  ]
  const questions = [
    { q: 'Do I need an OpenAPI document?', a: 'No. You can author a Truewire spec directly from recorded requests and responses. If you already have OpenAPI 3.0 or 3.1, the importer gives you a head start.' },
    { q: 'What about WebSocket APIs?', a: 'Streams, request/reply over WebSocket, and JSON-RPC are first-class in the spec, generator, and mock server. The mock replays recorded message sequences over a real socket.' },
    { q: 'Which languages can I generate?', a: 'Python is available now. TypeScript is next. The spec is language-neutral, so your recorded examples can carry forward to future generators. Follow the roadmap for progress.' },
    { q: 'Can I use this commercially?', a: 'Yes. The toolchain is Apache-2.0 and the runtime is MIT. Run it locally, use it in CI, and keep the repository you build. No account is required.' }
  ]
</script>

<section class="hero wrap" aria-labelledby="hero-title">
  <div class="eyebrow"><span class="status-dot"></span> OPEN SOURCE API TOOLCHAIN <span class="edition">PYTHON NOW / TYPESCRIPT NEXT</span></div>
  <div class="hero-grid">
    <div class="hero-copy">
      <h1 id="hero-title">Reality.<br />Meet <span>your types.</span></h1>
      <p class="intro">APIs have a version of the truth.<br />The wire has the real one.</p>
      <p class="description">Turn real API behavior into typed, validated clients. From the first recorded response to the code you ship.</p>
      <div class="actions"><a class="btn btn-primary" href="#quickstart">Start building <span>↗</span></a><a class="text-link" href="/docs">Explore the docs <span>→</span></a></div>
      <div class="install"><span aria-hidden="true">$</span> <code>pip install truewire</code><span class="install-note">No account. Your machine.</span></div>
    </div>
    <div class="instrument" aria-label="Illustration: recorded API responses pass through Truewire to become validated types">
      <div class="instrument-top"><span><i></i> WIRE INSPECTOR</span><span>FIG. 001</span></div>
      <div class="wire-input"><span class="tiny">IN / RECORDED RESPONSE</span><div class="endpoint"><b>GET</b> /pets/42 <span>200 OK</span></div><pre><code>{'{'}
  "id": <span class="orange">42</span>,
  "name": <span class="green">"Fido"</span>,
  "created_at": <span class="green">"2025-12-24T08:30:00Z"</span>
{'}'}</code></pre></div>
      <div class="wires" aria-hidden="true">
        <svg viewBox="0 0 480 144" fill="none"><path class="trace" d="M64 0V28Q64 44 80 44H214Q240 44 240 70V144M416 0V28Q416 44 400 44H266Q240 44 240 70M240 0V144" /><path class="pulse" d="M64 0V28Q64 44 80 44H214Q240 44 240 70V144" /><path class="pulse second" d="M416 0V28Q416 44 400 44H266Q240 44 240 70V144" /></svg>
        <div class="processor"><Mark size={30} /><span>truewire</span></div><span class="verify-label">SCHEMA + EXAMPLES</span>
      </div>
      <div class="wire-output"><div class="tiny">OUT / TYPED & VALIDATED <span>✓</span></div><div class="type-row"><span>id</span><b>int</b><em>✓</em></div><div class="type-row"><span>name</span><b>str</b><em>✓</em></div><div class="type-row"><span>created_at</span><b>datetime</b><em>✓</em></div></div>
      <div class="instrument-bottom"><span>REAL EXAMPLES. EXPLICIT CONTRACTS.</span><span class="cross">+</span></div>
    </div>
  </div>
  <div class="protocol-strip"><span>BUILT FOR THE API YOU ACTUALLY HAVE</span><div>REST <i>/</i> WebSocket <i>/</i> JSON-RPC</div><a href="/docs/spec/authoring">One spec format ↗</a></div>
</section>

<section class="manifesto wrap" aria-labelledby="manifesto-title">
  <div class="section-label"><span>01 / THE IDEA</span><span class="cross">+</span></div>
  <div class="statement"><h2 id="manifesto-title">The docs say one thing.<br />Production says <em>another.</em></h2><p>A missing field. A timestamp disguised as a string. A stream that doesn’t fit a request–response model. Truewire starts with what an API actually sends, and makes the contract explicit.</p></div>
  <div class="steps">{#each steps as step}<article><div class="step-top"><span>{step.n}</span><span>{step.tag}</span></div><h3>{step.title}</h3><p>{step.text}</p><code>{step.code}</code></article>{/each}</div>
</section>

<section id="quickstart" class="workbench" aria-labelledby="quickstart-title">
  <div class="wrap"><div class="section-label"><span>02 / FROM WIRE TO WORKING</span><span>LOCAL-FIRST. REPRODUCIBLE.</span></div>
    <div class="bench-grid"><div><h2 id="quickstart-title">Less guesswork.<br /><em>More working code.</em></h2><p>Bring an OpenAPI file. Generate your client. Start a mock server from the examples in your spec.</p><a class="text-link" href="/docs">Read the full quickstart ↗</a><div class="bench-note"><span>↳</span><p>One source for your client, mock, tests, and docs. Fewer things to drift apart.</p></div></div>
      <div class="code-window"><div class="code-heading"><span>petstore / quickstart</span><span>bash</span></div><pre><code><span class="comment"># Create a project</span>
<span class="prompt">$</span> pip install truewire
<span class="prompt">$</span> truewire init petstore
<span class="prompt">$</span> cd petstore

<span class="comment"># Import your API document and check it</span>
<span class="prompt">$</span> truewire import openapi ../petstore.yaml
<span class="prompt">$</span> truewire check

<span class="comment"># Generate a client, then serve recorded examples</span>
<span class="prompt">$</span> truewire generate python
<span class="prompt">$</span> truewire mock</code></pre><div class="code-footer"><span class="status-dot"></span> Python available today <a href="/roadmap">What’s next ↗</a></div></div>
    </div>
  </div>
</section>

<section id="pricing" class="pricing wrap" aria-labelledby="pricing-title"><div class="section-label"><span>03 / YOUR CODE. YOUR CALL.</span><span class="cross">+</span></div><div class="pricing-heading"><h2 id="pricing-title">Build it yourself.<br />Or give us the API.</h2><p>Open tools for the hands-on.<br />A spec service for the already-too-busy.</p></div><div class="plans"><article class="free-plan"><span class="tiny">THE TOOLCHAIN</span><h3>Yours to run.</h3><div class="price">$0<span> / forever</span></div><p>The generator, runtime, checks, and mock server. Run them on your machine or in your CI.</p><ul><li>Apache-2.0 toolchain + MIT runtime</li><li>No account or hosted dependency</li><li>REST, WebSocket, and JSON-RPC</li></ul><a class="btn btn-secondary" href="#quickstart">Get started <span>↗</span></a></article><article class="service-plan"><span class="tiny">THE SPEC SERVICE</span><h3>We’ll take it from here.</h3><div class="price">$2,000<span> / API, starting at</span></div><p>Send us the docs URL. Get a verified spec, generated client with tests, mock server, and checked docs.</p><ul><li>Delivered as a repository you own</li><li>Scoped to your API’s size and access</li><li>Built for integrations you don’t control</li></ul><a class="btn btn-primary" href="mailto:hello@truewire.dev?subject=Spec%20service%20quote">Let’s talk about your API <span>↗</span></a></article></div><div class="cloud-note"><span class="tiny">ON THE HORIZON</span><p>Private specs, managed publishing, hosted mocks. Truewire Cloud is coming.</p><a href="mailto:hello@truewire.dev?subject=Cloud%20waitlist">Join the waitlist ↗</a></div></section>

<section id="faq" class="faq wrap" aria-labelledby="faq-title"><div><span class="section-label">04 / GOOD QUESTIONS</span><h2 id="faq-title">A few loose ends.</h2><a class="text-link" href="/docs">Go deeper in the docs ↗</a></div><div class="questions">{#each questions as question}<details><summary>{question.q}<span aria-hidden="true">+</span></summary><p>{question.a}</p></details>{/each}<a class="roadmap-link" href="/roadmap">See what’s shipped and what’s next →</a></div></section>

<section class="closing wrap"><div class="section-label"><span>END THE GUESSWORK</span><Mark size={32} /></div><h2>Stay true<br />to <em>the wire.</em></h2><div><p>Your next integration starts with the truth.</p><a class="btn btn-primary" href="/docs">Build with Truewire <span>↗</span></a></div></section>

<style>
  .hero { padding-top: 2.5rem; }
  .eyebrow,.section-label,.tiny,.step-top,.protocol-strip,.install,.instrument,.code-window,.cloud-note>a { font-family: var(--mono); }
  .eyebrow,.section-label,.tiny { font-size: .68rem; letter-spacing: .09em; }
  .eyebrow { display: flex; align-items: center; gap: .65rem; }
  .status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex: none; }
  .edition { margin-left: auto; color: var(--fg-muted); }
  .hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; padding: 3.5rem 0 4rem; align-items: center; }
  h1 { font-size: clamp(3.5rem,6.7vw,6.3rem); line-height: .99; letter-spacing: -.075em; font-weight: 600; margin-bottom: 1.8rem; }
  h1 span { color: var(--accent); }
  .intro { font-size: 1.3rem; line-height: 1.4; letter-spacing: -.025em; margin-bottom: .8rem; }
  .description { max-width: 26rem; color: var(--fg-muted); font-size: 1rem; }
  .actions { display: flex; align-items: center; gap: 1.8rem; margin: 1.8rem 0; }
  .text-link { font-size: .86rem; color: var(--fg); text-decoration: none; }
  .text-link:hover { color: var(--accent); }
  .install { font-size: .75rem; display: flex; flex-wrap: wrap; gap: .65rem; align-items: center; }
  .install>span:first-child { color: var(--accent); }
  .install code { background: none; padding: 0; font-size: inherit; }
  .install-note { color: var(--fg-muted); font-family: var(--font); font-size: .7rem; }
  .instrument { background: #20221f; color: #eae9df; border: 1px solid #3d4039; box-shadow: 12px 12px 0 var(--bg-alt); font-size: .7rem; position: relative; }
  .instrument-top,.instrument-bottom { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.4rem; font-size: .6rem; letter-spacing: .06em; color: #acb0a3; }
  .instrument-top { border-bottom: 1px solid #3d4039; }
  .instrument-top i { display: inline-block; width: 6px; height: 6px; background: #d7edb8; margin-right: .5rem; border-radius: 50%; }
  .wire-input { margin: 1.4rem 1.4rem 0; }
  .tiny { color: var(--fg-muted); }
  .instrument .tiny { color: #a8ada0; font-size: .6rem; }
  .endpoint { margin: .8rem 0; display: flex; align-items: center; gap: .8rem; }
  .endpoint b { color: #e9a47c; font-weight: 400; }
  .endpoint>span { margin-left: auto; font-size: .6rem; color: #cee3ac; }
  .wire-input pre { border: 1px solid #41443b; background: #272a24; padding: 1rem; margin: 0; font-size: .7rem; line-height: 1.85; overflow: auto; }
  .orange { color: #ed9d72; }.green { color: #d3e4b9; }
  .wires { height: 144px; position: relative; background-image: radial-gradient(#45483e 1px,transparent 1px); background-size: 14px 14px; }
  .wires svg { position: absolute; height: 100%; width: 100%; }
  .trace { stroke: #6e7561; stroke-width: 1; }
  .pulse { stroke: #ef935d; stroke-width: 2; stroke-dasharray: 14 360; animation: transmit 5s linear infinite; }
  .second { animation-delay: -2.5s; }
  @keyframes transmit { to { stroke-dashoffset: -374; } }
  .processor { position: absolute; top: 57px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: .55rem; padding: .55rem 1rem; border: 1px solid #ec925b; background: #292c24; font-family: var(--font); font-size: 1.2rem; font-weight: 600; letter-spacing: -.05em; }
  .processor :global(.mark) { color: #f19a66; }
  .verify-label { position: absolute; bottom: 4px; right: 1.4rem; font-size: .5rem; color: #adb4a0; }
  .wire-output { margin: 0 1.4rem; border: 1px solid #626e4b; padding: 1rem; background: #2c3225; }
  .wire-output .tiny { display: flex; justify-content: space-between; margin-bottom: .7rem; color: #d3e4b9; }
  .type-row { display: grid; grid-template-columns: 1.2fr 1fr auto; padding: .35rem 0; border-top: 1px solid #414938; }
  .type-row b { font-weight: 400; color: #d3e4b9; }.type-row em { color: #c9dea8; font-style: normal; }
  .cross { font-size: 1.5rem; line-height: 1; font-weight: 300; }
  .protocol-strip { border-block: 1px solid var(--line); padding: 1.4rem 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .protocol-strip>span { font-size: .6rem; max-width: 11rem; color: var(--fg-muted); letter-spacing: .06em; }
  .protocol-strip>div { font-size: .85rem; }.protocol-strip i { font-style: normal; color: var(--accent); margin: 0 1.2rem; }
  .protocol-strip a { font-size: .65rem; color: var(--fg); text-decoration: none; }
  .manifesto,.pricing { padding-top: 5rem; padding-bottom: 5rem; }
  .section-label { display: flex; align-items: center; justify-content: space-between; color: var(--fg-muted); margin-bottom: 2rem; }
  h2 { font-size: clamp(2.2rem,3.7vw,3.5rem); letter-spacing: -.055em; line-height: 1.07; }
  h2 em { font-family: 'Newsreader',Georgia,serif; font-weight: 400; letter-spacing: -.025em; }
  .statement { display: grid; grid-template-columns: 1.4fr 1fr; gap: 5rem; align-items: center; margin-bottom: 2.5rem; }.statement p { color: var(--fg-muted); font-size: .95rem; }
  .steps { display: grid; grid-template-columns: repeat(3,1fr); border: 1px solid var(--line); }
  .steps article { padding: 1.7rem; min-width: 0; }.steps article+article { border-left: 1px solid var(--line); }
  .step-top { display: flex; justify-content: space-between; font-size: .6rem; color: var(--fg-muted); margin-bottom: 3rem; }.step-top span:first-child { color: var(--accent); }
  h3 { font-size: 1.35rem; letter-spacing: -.035em; line-height: 1.2; }.steps p { color: var(--fg-muted); font-size: .88rem; min-height: 6.5rem; }.steps code { background: none; font-size: .63rem; padding: 0; overflow-wrap: anywhere; }
  .workbench { background: #20221f; color: #eeeede; padding: 4rem 0; }.workbench .section-label { color: #a8ada0; }.bench-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; }.bench-grid h2 em { color: #d5e3b8; }.bench-grid p { color: #b6bbad; font-size: .95rem; max-width: 24rem; }.bench-grid .text-link { color: #e5b090; }.bench-note { display: flex; gap: 1rem; margin-top: 3rem; color: #d5e3b8; }.bench-note p { font-size: .8rem; max-width: 17rem; }
  .code-window { border: 1px solid #4a4e42; min-width: 0; }.code-heading { display: flex; justify-content: space-between; font-size: .65rem; color: #bdc2b4; padding: 1rem 1.3rem; border-bottom: 1px solid #4a4e42; }.code-window pre { font-size: .73rem; line-height: 1.9; padding: 1.3rem; margin: 0; overflow: auto; }.comment { color: #a5ad99; }.prompt { color: #f09e6d; }.code-footer { border-top: 1px solid #4a4e42; padding: 1rem 1.3rem; font-size: .6rem; display: flex; align-items: center; gap: .6rem; color: #bdc2b4; }.code-footer a { margin-left: auto; color: #d5e3b8; }
  .pricing-heading { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }.pricing-heading p { color: var(--fg-muted); font-size: .95rem; }.plans { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); }.plans article { padding: 2.5rem; }.plans h3 { margin-top: 1.5rem; font-size: 1.75rem; }.service-plan { background: var(--bg-alt); border-left: 1px solid var(--line); }.price { font-size: 3rem; letter-spacing: -.06em; margin: 1.5rem 0; }.price span { font-size: .8rem; letter-spacing: 0; color: var(--fg-muted); }.plans p { font-size: .95rem; color: var(--fg-muted); max-width: 25rem; }.plans ul { list-style: none; padding: 0; margin: 1.5rem 0 2rem; font-size: .85rem; }.plans li { padding: .35rem 0; }.plans li::before { content: '↗'; color: var(--accent); margin-right: .8rem; }.cloud-note { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem 0; border-bottom: 1px solid var(--line); }.cloud-note p { margin: 0; font-size: .8rem; color: var(--fg-muted); }.cloud-note>a { font-size: .65rem; margin-left: auto; white-space: nowrap; }
  .faq { display: grid; grid-template-columns: 1fr 1.3fr; gap: 5rem; padding-bottom: 5rem; }.faq .section-label { margin-bottom: 1.5rem; }.faq h2 { font-size: 2.5rem; }.questions details { border-bottom: 1px solid var(--line); padding: 1.1rem 0; }.questions details:first-child { border-top: 1px solid var(--line); }.questions summary { cursor: pointer; display: flex; justify-content: space-between; gap: 1rem; font-size: .95rem; list-style: none; }.questions summary::-webkit-details-marker { display: none; }.questions summary span { color: var(--accent); }.questions details[open] summary span { transform: rotate(45deg); }.questions p { margin: 1rem 0 0; color: var(--fg-muted); font-size: .88rem; }.roadmap-link { display: inline-block; margin-top: 1.5rem; font-size: .8rem; }
  .closing { padding-top: 2rem; padding-bottom: 4rem; border-top: 1px solid var(--line); }.closing h2 { font-size: clamp(4rem,10vw,9rem); letter-spacing: -.07em; margin: 1rem 0 2rem; }.closing h2 em { color: var(--accent); }.closing>div:last-child { display: flex; align-items: center; justify-content: space-between; }.closing p { color: var(--fg-muted); margin: 0; }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none; } }
  @media (max-width: 65rem) { .hero-grid { gap: 2rem; }.bench-grid,.statement,.faq { gap: 2rem; }.steps article { padding: 1.3rem; }.steps p { min-height: 8rem; }.install-note { width: 100%; }.instrument pre { font-size: .6rem; } }
  @media (max-width: 48rem) { .edition { display: none; }.hero-grid { grid-template-columns: 1fr; padding-top: 2.5rem; gap: 2.5rem; }h1 { font-size: clamp(3.5rem,12vw,5.5rem); }.hero-copy { max-width: 32rem; }.instrument { max-width: 34rem; width: 100%; }.instrument pre { font-size: .7rem; }.protocol-strip { flex-wrap: wrap; }.protocol-strip>span { max-width: none; width: 100%; }.protocol-strip i { margin: 0 .5rem; }.statement,.bench-grid,.faq { grid-template-columns: 1fr; }.steps { grid-template-columns: 1fr; }.steps article+article { border-left: 0; border-top: 1px solid var(--line); }.step-top { margin-bottom: 1.5rem; }.steps p { min-height: 0; }.steps code { font-size: .7rem; }.manifesto,.pricing { padding-block: 3.5rem; }.workbench { padding-block: 3rem; }.workbench .section-label>span:last-child { display: none; }.bench-note { margin-top: 1.5rem; }.plans { grid-template-columns: 1fr; }.service-plan { border-left: 0; border-top: 1px solid var(--line); }.plans article { padding: 1.5rem; }.pricing-heading { display: block; }.cloud-note { flex-wrap: wrap; gap: .75rem; }.cloud-note>a { margin-left: 0; }.faq { padding-bottom: 3.5rem; }.closing>div:last-child { align-items: start; flex-direction: column; gap: 1rem; }.install-note { width: auto; } }
  @media (max-width: 25rem) { .actions { gap: 1rem; }.code-window pre { font-size: .65rem; }.wire-input pre { font-size: .6rem; }.install-note { width: 100%; }.protocol-strip a { margin-top: .5rem; } }
</style>
