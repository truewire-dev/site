<script lang="ts">
  let { data } = $props()
  const names = $derived(Object.values(data.apis))
  // `change` and `note` mark field names, types and media types with backticks: odd parts are code.
  const parts = (text: string) => text.split('`')
</script>

<svelte:head>
  <title>API changelog | Truewire</title>
  <meta name="description" content="Changes to the {names.join(' and ')} APIs, found by Truewire's nightly drift monitor and confirmed by a person." />
  <link rel="alternate" type="application/rss+xml" title="Truewire API changelog" href="/changelog/feed.xml" />
</svelte:head>

{#snippet code(text: string)}{#each parts(text) as part, i}{#if i % 2}<code>{part}</code>{:else}{part}{/if}{/each}{/snippet}

<div class="wrap narrow page">
  <h1>API changelog</h1>
  <p class="lede">Every night Truewire calls the public reads of {names.join(' and ')} and compares each answer with the API's spec. A difference is only a candidate: a person checks each one, and only those confirmed as real API changes appear here.</p>
  <p>Each entry shows the shape of the change, such as a field added or a type changed, never a value from a response. The date is the night the monitor first saw it. Follow it with the <a href="/changelog/feed.xml">RSS feed</a>.</p>

  {#if data.entries.length}
    <ol class="log">
      {#each data.entries as entry (entry.id)}
        <li>
          <time datetime={entry.date}>{entry.date}</time>
          <span class="api">{data.apis[entry.api]}</span>
          <span class="change">
            <code>{entry.endpoint.function}</code>{#if entry.endpoint.path}{' '}<span class="route">{entry.endpoint.method} {entry.endpoint.path}</span>{/if}
            {@render code(entry.change)}.{#if entry.note}{' '}{@render code(entry.note)}{/if}
          </span>
        </li>
      {/each}
    </ol>
  {:else}
    <p class="empty">No changes recorded yet.</p>
  {/if}
</div>

<style>
  .log { list-style: none; padding: 0; margin: 2rem 0 0; border-top: 1px solid var(--line); }
  .log li {
    display: grid;
    grid-template-columns: 6.5rem 7rem 1fr;
    gap: 0.5rem 1rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--line);
  }
  .log time { font-variant-numeric: tabular-nums; }
  .api { color: var(--fg); font-weight: 600; }
  .change { color: var(--fg); }
  .route { color: var(--fg-muted); font-family: var(--mono); font-size: 0.85em; }
  .empty { margin-top: 2rem; font-style: italic; }
  @media (max-width: 40rem) {
    .log li { grid-template-columns: 6.5rem 1fr; }
    .change { grid-column: 1 / -1; }
  }
</style>
