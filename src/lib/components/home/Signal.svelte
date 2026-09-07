<script lang="ts">
  import Mark from '$lib/components/Mark.svelte'
  import './signal.css'

  const examples = [
    { id: 'money', label: 'Prices', raw: '"79746.95000"', wireType: 'string', format: 'decimal-string', result: "Decimal('79746.95000')", type: 'Decimal', note: 'Keep every decimal. A price should never become a rounding error.' },
    { id: 'time', label: 'Timestamps', raw: '1700000000000', wireType: 'integer', format: 'epoch-millis', result: '2023-11-14 22:13:20 UTC', type: 'datetime', note: 'Milliseconds on the wire. A timezone-aware datetime in your code.' },
    { id: 'bool', label: 'Booleans', raw: '"true"', wireType: 'string', format: 'boolean-string', result: 'True', type: 'bool', note: 'A string that means true becomes a boolean that actually is.' }
  ]
  const questions = [
    { q: 'Do I need an OpenAPI document?', a: 'No. Author a spec from real requests and responses, or import OpenAPI 3.0 / 3.1 to get a head start. Truewire is built for APIs you don’t own, including the ones with incomplete docs.' },
    { q: 'Is Truewire ready for my project?', a: 'The open-source release is alpha. Python generation, runtime validation, HTTP and WebSocket mocks, OpenAPI import, and MCP are available. The spec may change before 1.0. Start with one integration and review the generated code before adopting it.' },
    { q: 'Does it support TypeScript?', a: 'Not yet. Python is available today; TypeScript is next on the language roadmap. The spec format is language-neutral, so recorded examples are reusable across generators.' },
    { q: 'What leaves my machine?', a: 'The toolchain runs locally. Capture calls the upstream API you configure; the mock replays saved examples locally. There is no required Truewire account or hosted service. Review recordings for sensitive data before committing them.' },
    { q: 'What do I get with the spec service?', a: 'A repository you own: the spec, a generated Python client with tests, a mock server, and checked documentation. Pricing starts at $2,000 per API; scope depends on endpoint count, protocols, and access. Share the docs URL and we’ll scope it with you.' }
  ]
</script>

<div class="signal">
  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <a class="release" href="/roadmap"><span class="live-dot"></span> Open source. Out in the wild. <span aria-hidden="true">↗</span></a>
        <h1 id="hero-title">Their API.<br /><span>Your rules.</span><svg class="title-stroke" viewBox="0 0 440 22" fill="none" aria-hidden="true"><path d="M4 17C103 3 271 0 435 9M80 20C186 9 300 8 372 12" /></svg></h1>
        <p class="hero-description">Turn unpredictable APIs into typed Python clients, backed by real responses.<br class="desktop-break" /> Less integration glue. More product.</p>
        <div class="actions"><a class="btn btn-primary" href="#quickstart">Build your first client <span aria-hidden="true">↗</span></a><a class="quiet-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
        <div class="hero-fine"><span>✓ Free & open source</span><span>✓ No account needed</span></div>
      </div>
      <div class="wire-art" role="img" aria-label="REST, WebSocket and JSON-RPC connect through Truewire to a typed client, replay tests and MCP tools.">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div>
        <span class="art-coordinate">THE OUTSIDE WORLD</span>
        <svg class="connections" viewBox="0 0 560 500" fill="none" aria-hidden="true">
          <path class="loose-wire" d="M-20 130C110 30 40 260 149 200S90 70 177 109S182 250 268 250" />
          <path class="loose-wire faint" d="M-10 250C30 190 162 360 148 244S69 361 174 342S157 240 268 250" />
          <path class="loose-wire" d="M-10 392C118 421 9 264 101 301S165 416 196 345S188 250 268 250" />
          <path class="clean-wire" d="M288 250H345Q365 250 365 230V151Q365 131 385 131H550M288 250H550M288 250H345Q365 250 365 270V349Q365 369 385 369H550" />
          <path class="moving-wire" d="M288 250H345Q365 250 365 230V151Q365 131 385 131H550" />
        </svg>
        <div class="protocol protocol-rest"><span class="protocol-icon">{ '{}' }</span><div>REST<small>Pages & payloads</small></div></div>
        <div class="protocol protocol-ws"><span class="protocol-icon">↔</span><div>WebSocket<small>Streams & events</small></div></div>
        <div class="protocol protocol-rpc"><span class="protocol-icon">⌁</span><div>JSON-RPC<small>Requests & replies</small></div></div>
        <div class="wire-core"><Mark size={57} /><span>truewire</span><i class="core-pin pin-top"></i><i class="core-pin pin-bottom"></i></div>
        <div class="output output-client"><span class="output-symbol">⌘</span><div>Typed client<small>Actually means <code>Decimal</code></small></div><span class="output-check">✓</span></div>
        <div class="output output-tests"><span class="output-symbol">✓</span><div>Replay tests<small>Real data. Zero API calls.</small></div><span class="output-check">✓</span></div>
        <div class="output output-mcp"><span class="output-symbol">✳</span><div>MCP tools<small>Your API, agent-ready.</small></div><span class="output-check">✓</span></div>
        <div class="art-caption"><span class="live-dot"></span> A little order in the API universe.</div>
      </div>
    </div>
    <div class="wrap origin-strip"><div><span class="small-label">BUILT FROM PRODUCTION</span><p>Not a hypothetical pet store.</p></div><p>Extracted from a private system powering <strong>14 API clients</strong><br class="desktop-break" /> across <strong>3,638 endpoints.</strong> Now building in the open.</p><a href="/docs#status">Read the origin story <span aria-hidden="true">↗</span></a></div>
  </section>

  <section id="how-it-works" class="demo-section wrap" aria-labelledby="demo-title">
    <div class="section-heading"><div><span class="small-label">MEET YOUR NEW TRANSLATOR</span><h2 id="demo-title">The wire is messy.<br />Your code doesn’t have to be.</h2></div><p>Strings that are prices. Numbers that are dates.<br class="desktop-break" /> Declare what the data means. Truewire handles<br class="desktop-break" /> the translation, with runtime validation on by default.</p></div>
    <fieldset class="translation-demo">
      <legend class="sr-only">Choose a wire format example</legend>
      <div class="demo-toolbar"><span class="demo-title"><span class="live-dot"></span> A small example. A big difference.</span><div class="example-options">{#each examples as example, i}<label><input type="radio" name="wire-example" value={example.id} checked={i === 0} /><span>{example.label}</span></label>{/each}</div></div>
      {#each examples as example}
        <div class="example-panel example-{example.id}">
          <div class="data-side"><span class="code-label">01 / WHAT THE API SENDS</span><div class="raw-value">{example.raw}</div><div class="type-chip">{example.wireType} <span>on the wire</span></div></div>
          <div class="translation-step"><span class="translation-line"></span><span class="translation-mark"><Mark size={26} /></span><code>{example.format}</code><span class="translation-line"></span></div>
          <div class="data-side result-side"><span class="code-label">02 / WHAT YOUR CODE GETS</span><div class="result-value">{example.result}</div><div class="type-chip result-chip">✓ {example.type}<span>in Python</span></div></div>
          <div class="demo-note"><span aria-hidden="true">↳</span> {example.note}<span class="demo-disclaimer">Illustrative conversion · declared in your spec</span></div>
        </div>
      {/each}
    </fieldset>
    <div class="under-demo"><p>No silent guessing. Wire types stay honest; your spec declares the meaning.</p><a href="/docs/concepts#4-wire-fidelity-why-a-price-is-a-decimal">Get into the details <span aria-hidden="true">↗</span></a></div>
  </section>

  <section class="benefits wrap" aria-labelledby="benefits-title">
    <div class="section-heading"><div><span class="small-label">ONE SPEC. FEWER MOVING PARTS.</span><h2 id="benefits-title">Keep the quirks.<br />Lose the workarounds.</h2></div><p>The client, the mock, and the agent tools all start<br class="desktop-break" /> from the same source. So you can spend your<br class="desktop-break" /> time on what makes your product yours.</p></div>
    <div class="benefit-grid">
      <article class="benefit-card"><div class="card-art replay-art" aria-hidden="true"><div class="mini-terminal"><div class="mini-terminal-title"><span>● ● ●</span> test_integration.py</div><div><span>✓</span> response matches recording</div><div><span>✓</span> stream replays in order</div><div><span>✓</span> no live credentials needed</div><div class="test-result">Your API, on your terms. <span>↵</span></div></div><span class="floating-tag">OFFLINE IS A FEATURE.</span></div><div class="card-copy"><span class="card-index">01 / REPLAY, DON’T PRETEND</span><h3>Real responses.<br />Repeatable tests.</h3><p>Replay recorded HTTP and WebSocket traffic locally. No rate limits. No live credentials. No made-up fixtures.</p><a href="/docs/concepts#5-the-mock-server-and-the-409-rule">Meet the mock server ↗</a></div></article>
      <article class="benefit-card"><div class="card-art pagination-art" aria-hidden="true"><div class="page-sheet sheet-back">page_03 <span>•••</span></div><div class="page-sheet sheet-middle">page_02 <span>•••</span></div><div class="page-sheet sheet-front">page_01 <span>•••</span><i></i><i></i><i></i></div><div class="paging-code">async for page in <b>client.list_paged()</b></div></div><div class="card-copy"><span class="card-index">02 / DECLARE IT ONCE</span><h3>Pagination without<br />the plumbing.</h3><p>Declare pages, tokens, offsets, windows, or cursors in your spec. Generate the walker. Stop rewriting the same loop.</p><a href="/docs/concepts#3-declared-pagination-envelopes-redaction-and-push">Explore the spec ↗</a></div></article>
      <article class="benefit-card"><div class="card-art agent-art" aria-hidden="true"><div class="agent-node">{ '{ }' }<small>YOUR SPEC</small></div><span class="agent-connector"></span><div class="agent-hub"><Mark size={34} /></div><span class="agent-connector"></span><div class="agent-node agent-spark">✳<small>MCP TOOLS</small></div><div class="agent-command">$ truewire mcp</div></div><div class="card-copy"><span class="card-index">03 / FOR YOUR AGENTS, TOO</span><h3>Your next integration.<br />Your agent’s next tool.</h3><p>Expose request/reply endpoints as MCP tools, backed by your generated client. Same schemas. Same validation.</p><a href="/docs#quickstart">Connect the pieces ↗</a></div></article>
    </div>
  </section>

  <section id="quickstart" class="start-section" aria-labelledby="start-title"><div class="wrap start-grid"><div class="start-copy"><span class="small-label">LESS READING. MORE RUNNING.</span><h2 id="start-title">Start with one API.<br /><span>Make it yours.</span></h2><p>Try the GitHub spec from the registry.<br />Generate a client, then replay its recorded examples<br class="desktop-break" /> with a local mock.</p><a class="btn lime-button" href="/docs#quickstart">Open the quickstart <span aria-hidden="true">↗</span></a><span class="start-fine">Python today · Alpha release · Apache-2.0 / MIT</span></div><div class="terminal"><div class="terminal-bar"><div class="terminal-dots"><i></i><i></i><i></i></div><span>your next integration</span><span>~/terminal</span></div><pre><code><span class="comment"># A familiar API. A better starting point.</span>
<span class="prompt">$</span> pip install truewire
<span class="prompt">$</span> truewire init github_client
<span class="prompt">$</span> cd github_client
<span class="prompt">$</span> truewire import registry github

<span class="comment"># Check. Generate. Replay.</span>
<span class="prompt">$</span> truewire check
<span class="prompt">$</span> truewire generate python
<span class="prompt">$</span> pip install -e .
<span class="prompt">$</span> truewire mock</code></pre><div class="terminal-bottom"><span>↳ Your machine. Your code. Your call.</span><Mark size={20} /></div></div></div></section>

  <section id="pricing" class="pricing wrap" aria-labelledby="pricing-title"><div class="section-heading"><div><span class="small-label">TWO WAYS TO GET THERE</span><h2 id="pricing-title">Take the wheel.<br />Or hand us the keys.</h2></div><p>Build with the open-source toolkit.<br />Or let us do the integration work while<br class="desktop-break" /> your team ships the product.</p></div><div class="pricing-grid"><article class="open-plan"><div class="plan-top"><span class="plan-icon">{ '{ }' }</span><span class="small-label">FOR THE BUILDERS</span></div><h3>The whole toolkit.<br />No toll booth.</h3><p>Generate clients, validate responses, and run local mocks. Free to use, including commercially.</p><div class="price">$0<span>No seat limits. No subscription.</span></div><a class="btn btn-secondary" href="#quickstart">Start building <span aria-hidden="true">↗</span></a><div class="plan-bottom"><span>✓ Local-first</span><span>✓ Open source</span><span>✓ Your repository</span></div></article><article class="service-plan"><div class="plan-top"><span class="plan-icon">↗</span><span class="small-label">FOR THE ALREADY-TOO-BUSY</span><span class="service-badge">SPEC SERVICE</span></div><h3>You bring the API.<br />We bring the working client.</h3><p>A verified spec, generated Python client with tests, local mock, and checked docs. Delivered as a repo you own.</p><div class="price">$2,000<span>Starting at / API · scoped with you</span></div><a class="btn btn-primary" href="/start?intent=service&source=pricing">Let’s scope your integration <span aria-hidden="true">↗</span></a><div class="plan-bottom"><span>Tell us what you’re building. No commitment.</span></div></article></div><div class="cloud-line"><span class="coming-label">COMING LATER</span><p>Private specs. Managed publishing. Hosted mocks. <strong>Truewire Cloud.</strong></p><a href="/start?intent=cloud&source=cloud">Join the early-access list ↗</a></div></section>

  <section id="faq" class="faq wrap" aria-labelledby="faq-title"><div><span class="small-label">BEFORE YOU PLUG IN</span><h2 id="faq-title">Good questions.<br />Straight answers.</h2><p>Still curious about something?</p><a href="/start?intent=help&source=faq">Tell us what you need ↗</a></div><div class="questions">{#each questions as question}<details><summary>{question.q}<span aria-hidden="true">+</span></summary><p>{question.a}</p></details>{/each}<a class="roadmap-link" href="/roadmap">See exactly what’s shipped and what’s next ↗</a></div></section>
  <section class="closing wrap" aria-labelledby="closing-title"><div class="closing-inner"><div><span class="small-label">BUILD THE PRODUCT. NOT THE GLUE.</span><h2 id="closing-title">Make the next call<br />a better one.</h2><a class="btn btn-primary" href="#quickstart">Build with Truewire <span aria-hidden="true">↗</span></a></div><svg class="closing-wires" viewBox="0 0 440 380" fill="none" aria-hidden="true"><path d="M460 60H240Q190 60 190 110V150Q190 200 140 200H-20M460 120H280Q230 120 230 170V190Q230 240 180 240H-20M460 180H320Q270 180 270 230Q270 280 220 280H-20M460 240H360Q310 240 310 280Q310 320 270 320H-20" /><circle cx="191" cy="126" r="10" /><circle cx="270" cy="219" r="10" /></svg></div></section>
</div>
