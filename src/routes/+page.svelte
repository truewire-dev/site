<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte'
  import Props from '$lib/components/home/Props.svelte'
  import Demo from '$lib/components/home/Demo.svelte'
  import HowItWorks from '$lib/components/home/HowItWorks.svelte'
  import Compare from '$lib/components/home/Compare.svelte'
  import Pricing from '$lib/components/home/Pricing.svelte'
  import Faq from '$lib/components/home/Faq.svelte'

  const title = 'Truewire: typed clients, true to the wire'
  const description = 'Truewire turns any API, documented or not, REST or WebSocket, into a typed, validated client you can trust. Record real wire examples, declare what a schema can\'t say, generate the client, the tests, the mock and the docs from the same source.'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://truewire.dev/" />
  <meta property="og:url" content="https://truewire.dev/" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
</svelte:head>

<Hero />
<Props />
<Demo />
<HowItWorks />
<Compare />
<Pricing />
<Faq />
