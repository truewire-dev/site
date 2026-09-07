<!-- Three-way light / system / dark switch. Markup only: the pre-paint script in
     src/app.html owns the behaviour (persisting the choice under `truewire:mode`, applying
     html[data-mode], and keeping aria-checked in step), so the switch works on pages that
     ship no JavaScript, like the home page. -->
<script lang="ts">
  const options = [
    { value: 'light', label: 'Light' },
    { value: 'system', label: 'System' },
    { value: 'dark', label: 'Dark' }
  ]
</script>

<div class="mode-switch" role="radiogroup" aria-label="Colour scheme">
  {#each options as option (option.value)}
    <button
      type="button"
      role="radio"
      aria-checked={option.value === 'system'}
      aria-label={option.label}
      title={option.label}
      data-mode-choice={option.value}
    >
      {#if option.value === 'light'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      {:else if option.value === 'system'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      {/if}
    </button>
  {/each}
</div>

<style>
  .mode-switch {
    display: inline-flex;
    padding: 2px;
    border: 1px solid var(--line);
    border-radius: 4px;
    background: transparent;
  }
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.6rem;
    border: 0;
    border-radius: 3px;
    background: transparent;
    color: var(--fg-muted);
    cursor: pointer;
    padding: 0;
  }
  button:hover { color: var(--fg); }
  button[aria-checked="true"] { background: var(--bg-alt); color: var(--accent); }
  svg { width: 0.9rem; height: 0.9rem; }
</style>
