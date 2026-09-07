<script lang="ts">
  import Signal from '$lib/components/home/Signal.svelte'

  const title = 'Truewire — Their API. Your rules.'
  const description = 'Turn unpredictable APIs into typed Python clients backed by real responses. Open-source generation, runtime validation, HTTP and WebSocket mocks, and MCP tools. Build it yourself or let us scope your integration.'
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

<Signal />
