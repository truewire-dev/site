<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte'
  import Stats from '$lib/components/home/Stats.svelte'
  import Props from '$lib/components/home/Props.svelte'
  import Demo from '$lib/components/home/Demo.svelte'
  import HowItWorks from '$lib/components/home/HowItWorks.svelte'
  import Compare from '$lib/components/home/Compare.svelte'
  import ForOwners from '$lib/components/home/ForOwners.svelte'
  import Pricing from '$lib/components/home/Pricing.svelte'
  import Faq from '$lib/components/home/Faq.svelte'

  const title = 'Truewire: typed clients, true to the wire'
  const description = 'Truewire turns any API, documented or not, REST or WebSocket, into a typed, validated client you can trust. Open-source toolchain in Python, TypeScript and Rust. For API owners: official SDKs generated from a verified spec and tested against the live API every night.'
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
<Stats />
<Props />
<Demo />
<HowItWorks />
<Compare />
<ForOwners />
<Pricing />
<Faq />
