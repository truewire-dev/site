<script lang="ts">
  import { page } from '$app/state'
</script>

<svelte:head>
  <title>{page.status} | Truewire</title>
</svelte:head>

<div class="wrap narrow page">
  <p class="code">{page.status}</p>
  <h1>{page.status === 404 ? 'Nothing here.' : 'Something went wrong.'}</h1>
  <p>{page.status === 404 ? 'This page does not exist, or it moved.' : (page.error?.message ?? 'An unexpected error occurred.')}</p>
  <a href="/">Back to home</a>
</div>

<style>
  .code { font-family: var(--mono); color: var(--accent); font-weight: 700; font-size: 1.1rem; margin: 0 0 0.5rem; }
</style>
