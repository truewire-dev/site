<script lang="ts">
  let { size = 28 }: { size?: number } = $props()
</script>

<svg class="mark" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
  <rect width="24" height="24" rx="6" fill="currentColor" />
  <path d="M4 15h3.5V7h4v8h4v-4H20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>

<style>
  .mark { color: var(--accent); flex: none; }
</style>
