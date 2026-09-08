<script lang="ts">
  import Terminal from './Terminal.svelte'

  // The transcript is the real CLI output as of 2026-09-07. Regenerate it from the real
  // `truewire` CLI after CLI changes; do not ship invented output.
  const shell = `<b class="cmd">$ pip install truewire</b>
Successfully installed truewire-0.3.0 truewire-core-0.1.1

<b class="cmd">$ truewire init petstore</b>
Created petstore

<b class="cmd">$ cd petstore &amp;&amp; truewire import openapi ../petstore.yaml</b>
operations      8
written         8
skipped         0
shared schemas  4 (Category, Order, OrderBase, Pet)
examples        5
warnings        1
  - GET /pets: dropped header parameter \`X-Request-Id\`

validation: 0 errors, 0 warnings

<b class="cmd">$ truewire check</b>
Project: petstore
Endpoints: 8 (rpc=8, stream=0)

Example validation:
  endpoints  5/8
  files      5
  errors     0

Spec authoring:
  pagination  0
  violations 0
  warnings   0

Result: OK

<b class="cmd">$ truewire examples --require-verified</b>
Project: petstore
Endpoints: 8 (rpc=8, stream=0)
Coverage (paired examples): 5/8 (62%)

Public     3/6    with examples
Authed     2/2    with examples

Unverified: 3 endpoint(s) declared \`unverified\` (see ADR 0001)

Example files:
  requests    5
  responses   5

Response codes:
  200         4
  201         1

<b class="cmd">$ truewire generate python</b>
Initialized .truewire/python-files.json; preserved existing unowned files.
Generated petstore (python) into src/petstore

<b class="cmd">$ truewire mock</b>
HTTP  http://127.0.0.1:8321
WS    (no websocket examples in this project)
Serving recorded examples; Ctrl-C to stop.`

  const python = `<span class="kw">from</span> petstore <span class="kw">import</span> Petstore

<span class="kw">async with</span> Petstore.new(base_url=<span class="str">'http://127.0.0.1:8321'</span>) <span class="kw">as</span> client:
  pet = <span class="kw">await</span> client.pets.get_pet(pet_id=<span class="num">42</span>)
  pet[<span class="str">'name'</span>]        <span class="cm"># 'Fido', typed str</span>
  pet[<span class="str">'status'</span>]      <span class="cm"># 'sold', typed Literal['available', 'pending', 'sold']</span>
  pet[<span class="str">'created_at'</span>]  <span class="cm"># datetime(2025, 12, 24, 8, 30, tzinfo=UTC), parsed from the wire</span>`
</script>

<section id="quickstart" class="demo band">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">02</span>
      <h2 class="section-title">From docs URL to verified client</h2>
    </div>
    <div class="matter">
      <p class="section-sub">Six commands. One source of truth. Nothing you have to remember to keep in sync.</p>
      <Terminal label="shell" caption="Terminal session showing the Truewire workflow" html={shell} capped />
      <Terminal label="python" caption="Python example using the generated client" html={python} code />
    </div>
  </div>
</section>

<style>
  .demo { padding-bottom: clamp(3rem, 6vw, 5.5rem); }
</style>
