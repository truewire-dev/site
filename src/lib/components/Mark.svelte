<script lang="ts">
  let { size = 28 }: { size?: number } = $props()
</script>

<!-- The Truewire mark: a wire trace that comes in low, is checked, and leaves high.
     One stroke, five anchors on a 24 grid, so it stays crisp from 16px up. -->
<svg class="mark" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
  <path d="M2 14H6L10 19L17 7H22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

<style>
  .mark { color: var(--accent); flex: none; }
</style>
