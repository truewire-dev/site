<script lang="ts">
  import type { PageProps } from './$types'
  import type { FieldErrors } from '$lib/server/inquiries'
  let { data, form }: PageProps = $props()
  const values = $derived({ name: '', email: '', company: '', api_url: '', details: '', timeline: '', consent: '', ...form?.values })
  const errors: FieldErrors = $derived(form?.errors ?? {})
  const cloud = $derived(data.intent === 'cloud')
  const service = $derived(data.intent === 'service')
</script>

<svelte:head><title>{cloud ? 'Cloud early access' : service ? 'Let’s scope your integration' : 'Talk to Truewire'} — Truewire</title><meta name="robots" content="noindex" /></svelte:head>

<section class="inquiry wrap">
  <div class="inquiry-copy">
    <a class="back" href="/#pricing">← Back to the possibilities</a>
    <span class="eyebrow">{cloud ? 'THE NEXT CHAPTER' : service ? 'YOUR API. OUR NEXT PROJECT.' : 'LET’S FIGURE IT OUT.'}</span>
    <h1>{#if cloud}Your APIs.<br />A little more<br /><span>on autopilot.</span>{:else if service}Less on<br />your backlog.<br /><span>More in production.</span>{:else}What are<br />you trying<br /><span>to build?</span>{/if}</h1>
    <p>{cloud ? 'Private specs, managed publishing, and hosted mocks. Tell us you’re interested and we’ll contact you about early access.' : service ? 'Tell us about the integration standing between you and your next release. We’ll work out the scope together.' : 'An awkward API? A question about the toolkit? Tell us where you are and where you want to go.'}</p>
    <div class="deliverables">
      <span class="eyebrow">{cloud ? 'ON THE ROADMAP' : service ? 'A REPOSITORY YOU OWN' : 'START WHERE YOU ARE'}</span>
      {#if service}<ul><li>Verified API spec</li><li>Typed Python client with tests</li><li>Local mock + checked documentation</li></ul><div class="scope-price">From $2,000 <span>/ API · no commitment to inquire</span></div>
      {:else if cloud}<p>Cloud isn’t available yet. Your email joins the early-access list—not a paid plan.</p><a href="/roadmap">Follow the roadmap ↗</a>
      {:else}<p>You can also explore the docs or open an issue on GitHub. The toolkit is free to use.</p><a href="/docs">Browse the docs ↗</a>{/if}
    </div>
  </div>

  <div class="form-card">
    <nav class="intent-nav" aria-label="How can we help?">
      <a href="/start?intent=service&source={data.source}" aria-current={service ? 'page' : undefined}>Build it for me</a>
      <a href="/start?intent=cloud&source={data.source}" aria-current={cloud ? 'page' : undefined}>Cloud early access</a>
      <a href="/start?intent=help&source={data.source}" aria-current={data.intent === 'help' ? 'page' : undefined}>Something else</a>
    </nav>
    <div class="form-content">
      <h2>{cloud ? 'Get in early.' : service ? 'What’s the integration?' : 'Tell us a little more.'}</h2>
      <p class="form-intro">{cloud ? 'A small list for people building with APIs.' : 'A few details now. A useful conversation next.'}</p>
      {#if form?.message}<div class="form-error" role="alert"><strong>{form.message}</strong>{#if Object.keys(errors).length}<ul>{#each Object.entries(errors) as [field, message]}<li><a href="#{field}">{message}</a></li>{/each}</ul>{/if}</div>{/if}
      <form method="POST">
        <input type="hidden" name="intent" value={data.intent} />
        <input type="hidden" name="source" value={data.source} />
        <input type="hidden" name="submission_id" value={data.submissionId} />
        <div class="honeypot" aria-hidden="true"><label for="website">Leave this empty</label><input id="website" name="website" tabindex="-1" autocomplete="off" /></div>
        <div class="field-pair">
          <div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required minlength="2" maxlength="100" placeholder="Alex Morgan" value={values.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />{#if errors.name}<small id="name-error" class="field-error">{errors.name}</small>{/if}</div>
          <div class="field"><label for="email">Work email</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="alex@company.com" value={values.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />{#if errors.email}<small id="email-error" class="field-error">{errors.email}</small>{/if}</div>
        </div>
        {#if !cloud}
          <div class="field"><label for="company">Company <span>optional</span></label><input id="company" name="company" autocomplete="organization" maxlength="150" placeholder="Your company or project" value={values.company} aria-invalid={!!errors.company} />{#if errors.company}<small class="field-error">{errors.company}</small>{/if}</div>
          <div class="field"><label for="api_url">API docs URL <span>optional</span></label><input id="api_url" name="api_url" type="url" maxlength="1000" placeholder="https://docs.the-api.com" value={values.api_url} aria-invalid={!!errors.api_url} aria-describedby="url-help" /><small id="url-help">No public docs? Describe the API below.</small>{#if errors.api_url}<small class="field-error">{errors.api_url}</small>{/if}</div>
        {/if}
        <div class="field"><label for="details">{cloud ? 'What would make Cloud useful to you?' : 'What do you need to build?'}{#if cloud}<span>optional</span>{/if}</label><textarea id="details" name="details" rows={cloud ? 3 : 4} required={!cloud} minlength={cloud ? undefined : 20} maxlength="2000" placeholder={cloud ? 'Private specs, publishing clients, hosted mocks…' : 'The API, endpoints you need, and what’s getting in your way…'} aria-invalid={!!errors.details} aria-describedby="details-help">{values.details}</textarea><small id="details-help">Please don’t include API keys, passwords, or confidential payloads.</small>{#if errors.details}<small class="field-error">{errors.details}</small>{/if}</div>
        {#if !cloud}<div class="field"><label for="timeline">When are you hoping to ship? <span>optional</span></label><select id="timeline" name="timeline" value={values.timeline}><option value="">Select a timeframe</option><option value="now">As soon as possible</option><option value="month">This month</option><option value="quarter">This quarter</option><option value="exploring">Just exploring</option></select></div>{/if}
        <label class="consent" for="consent"><input id="consent" name="consent" type="checkbox" value="yes" required checked={values.consent === 'yes'} aria-invalid={!!errors.consent} /><span>{cloud ? 'Contact me about Truewire Cloud early access.' : 'You can contact me about this request.'} Details are stored as described in our <a href="/legal/privacy">privacy notice</a>.</span></label>
        {#if errors.consent}<small class="field-error">{errors.consent}</small>{/if}
        <button class="btn btn-primary" type="submit">{cloud ? 'Join the early-access list' : service ? 'Request an integration scope' : 'Send your question'} <span aria-hidden="true">↗</span></button>
        <p class="form-footnote">{cloud ? 'No launch-date promises. No unrelated newsletters.' : 'No payment details. No commitment. Just a conversation.'}</p>
      </form>
    </div>
  </div>
</section>

<style>
  .inquiry { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; padding-block: 3rem 5rem; align-items: start; }.back { display: inline-block; font-size: .72rem; text-decoration: none; color: var(--fg-muted); margin-bottom: 3rem; }.eyebrow { display: block; font: .58rem var(--mono); letter-spacing: .09em; color: var(--accent); }h1 { font-size: clamp(2.6rem,4.2vw,3.9rem); letter-spacing: -.065em; margin: 1.5rem 0; }h1 span { color: var(--accent); }.inquiry-copy>p { font-size: .88rem; color: var(--fg-muted); line-height: 1.9; max-width: 25rem; }.deliverables { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }.deliverables ul { padding: 0; list-style: none; margin: 1.2rem 0; font-size: .8rem; }.deliverables li { padding: .4rem 0; }.deliverables li::before { content: '✓'; margin-right: .8rem; color: var(--accent); }.deliverables p { font-size: .85rem; color: var(--fg-muted); margin: 1rem 0; }.deliverables>a { font-size: .8rem; }.scope-price { font-family: var(--display); font-size: 1.2rem; margin-top: 1rem; }.scope-price>span { display: block; font: .7rem var(--font); color: var(--fg-muted); margin-top: .5rem; }
  .form-card { border: 1px solid var(--line); border-radius: 16px; background: var(--surface); box-shadow: 0 20px 70px #39265306; overflow: hidden; }.intent-nav { display: flex; gap: .3rem; padding: .6rem; background: var(--accent-tint); border-bottom: 1px solid var(--line); }.intent-nav a { flex: 1; text-align: center; padding: .65rem .25rem; font-size: .65rem; color: var(--fg-muted); border-radius: 7px; text-decoration: none; }.intent-nav a[aria-current] { background: var(--surface); color: var(--accent); box-shadow: 0 2px 6px #39265308; }.form-content { padding: 2rem; }h2 { font-size: 1.65rem; letter-spacing: -.045em; }.form-intro { color: var(--fg-muted); font-size: .79rem; margin-bottom: 1.8rem; }.field-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }.field { margin-bottom: 1.2rem; min-width: 0; }.field label { display: flex; align-items: center; justify-content: space-between; gap: .5rem; font-size: .74rem; margin-bottom: .45rem; font-weight: 500; }.field label>span { font-size: .6rem; color: var(--fg-muted); font-weight: 400; }.field input,.field textarea,.field select { width: 100%; border: 1px solid var(--line-strong); border-radius: 7px; background: var(--bg); color: var(--fg); padding: .75rem .85rem; font: .8rem/1.5 var(--font); }.field textarea { resize: vertical; min-height: 6rem; }.field input::placeholder,.field textarea::placeholder { color: var(--fg-muted); opacity: .8; }.field>small { display: block; margin-top: .4rem; font-size: .62rem; color: var(--fg-muted); line-height: 1.5; }.consent { display: flex; align-items: start; gap: .6rem; font-size: .67rem; color: var(--fg-muted); line-height: 1.8; margin-bottom: 1.5rem; }.consent input { accent-color: var(--accent); flex: none; width: 16px; height: 16px; margin: .15rem 0 0; }.btn { width: 100%; }.form-footnote { text-align: center; font-size: .59rem; color: var(--fg-muted); margin: .9rem 0 0; }.honeypot { position: absolute; width: 1px; height: 1px; clip-path: inset(50%); overflow: hidden; }.form-error { border: 1px solid #c16669; background: var(--accent-tint); padding: 1rem; border-radius: 7px; font-size: .75rem; margin: 1rem 0; }.form-error ul { padding-left: 1.2rem; margin-bottom: 0; }.form-error a { color: var(--fg); }.field .field-error,.field-error { color: var(--accent); font-size: .65rem; }[aria-invalid="true"] { border-color: #bc595e !important; }
  @media (max-width: 60rem) { .inquiry { gap: 2.5rem; grid-template-columns: 1fr 1.2fr; }.form-content { padding: 1.5rem; }.field-pair { grid-template-columns: 1fr; gap: 0; } }
  @media (max-width: 44rem) { .inquiry { grid-template-columns: minmax(0,1fr); padding-block: 1.5rem 3rem; gap: 1.5rem; }.back { margin-bottom: 1.4rem; }h1 { font-size: 2.5rem; margin-block: 1rem; }.inquiry-copy>p { max-width: 30rem; line-height: 1.7; }.deliverables { display: none; }.form-content { padding: 1.4rem; }.intent-nav a { font-size: .59rem; }.field input,.field textarea,.field select { font-size: 1rem; }.field label { font-size: .79rem; }.form-footnote { font-size: .57rem; } }
</style>
