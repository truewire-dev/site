<script lang="ts">
  // Mirrors the README's comparison matrix. `?` marks a claim nobody has verified.
  type Cell = string | { text: string, unverified?: boolean }
  const columns = ['Truewire', 'OpenAPI Generator', 'Speakeasy', 'Fern', 'hey-api']
  const rows: { name: string, cells: Cell[] }[] = [
    { name: 'Open source', cells: ['Yes (Apache-2.0, MIT runtime)', 'Yes (Apache-2.0)', 'No (closed generator)', { text: 'Partial', unverified: true }, 'Yes (MIT)'] },
    { name: 'Self-hosted', cells: ['Yes', 'Yes', { text: 'CLI runs locally, generator is hosted', unverified: true }, { text: '', unverified: true }, 'Yes'] },
    { name: 'Runtime validation of responses', cells: ['Yes, default on, per-call override', 'Varies by generator', 'Yes', { text: '', unverified: true }, 'Yes (via Zod/Valibot plugins)'] },
    { name: 'WebSocket streams', cells: ['Yes (subscribe, push, RPC over WS)', 'No', { text: '', unverified: true }, { text: 'Partial', unverified: true }, 'No'] },
    { name: 'JSON-RPC', cells: ['Yes (over HTTP and WS)', 'No', { text: '', unverified: true }, { text: '', unverified: true }, 'No'] },
    { name: 'Declared pagination with generated walkers', cells: ['Yes, 5 strategies', 'No', 'Yes', 'Yes', { text: '', unverified: true }] },
    { name: 'Mock server from recorded examples', cells: ['Yes, HTTP and WS', 'No', { text: 'HTTP only', unverified: true }, { text: '', unverified: true }, 'No'] },
    { name: 'Verified-coverage gate', cells: ['Yes', 'No', 'No', 'No', 'No'] },
    { name: 'Docs type-checking', cells: ['Yes', 'No', 'No', 'No', 'No'] },
    { name: 'MCP server', cells: ['Yes (truewire mcp)', 'No', 'Yes (Gram)', { text: '', unverified: true }, { text: '', unverified: true }] },
    { name: 'TypeScript', cells: ['Yes (generator in the repo, npm pending)', 'Yes', 'Yes', 'Yes', 'Yes'] },
    { name: 'Python', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Experimental'] }
  ]
  const text = (cell: Cell) => typeof cell === 'string' ? cell : cell.text
  const unverified = (cell: Cell) => typeof cell !== 'string' && cell.unverified === true
</script>

<section id="compare" class="compare band">
  <div class="wrap ledger">
    <div class="margin">
      <span class="sec-n">04</span>
      <h2 class="section-title">How it compares</h2>
    </div>
    <p class="section-sub">A cell reads <abbr title="Not verified">?</abbr> where we have not verified the claim ourselves. We publish what we checked, not what we guessed. <a href="mailto:hello@truewire.dev?subject=Comparison%20correction">Tell us</a> what we got wrong and we will fix it.</p>
  </div>
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col"><span class="sr-only">Capability</span></th>
            {#each columns as column (column)}
              <th scope="col">{column}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each rows as row (row.name)}
            <tr>
              <th scope="row">{row.name}</th>
              {#each row.cells as cell, i (i)}
                <td class:yes={i === 0 && text(cell).startsWith('Yes')}>
                  {#if unverified(cell)}
                    {#if text(cell)}{text(cell)} ({/if}<abbr title="Not verified">?</abbr>{#if text(cell)}){/if}
                  {:else}
                    {text(cell)}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="note">We build Truewire for API consumers first: people integrating an API they do not control. If you own your API and have a clean OpenAPI document, any tool above will serve you, and <code>truewire import openapi</code> reads your document too.</p>
  </div>
</section>

<style>
  .compare { padding-bottom: clamp(3rem, 6vw, 5.5rem); }
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-bottom: 1px solid var(--line-strong); }
  table { border-collapse: collapse; width: 100%; min-width: 60rem; font-size: 1rem; }
  th, td { text-align: left; padding: 0.7rem 1rem 0.7rem 0; border-top: 1px solid var(--line); vertical-align: top; }
  thead th {
    border-top: 1px solid var(--line-strong);
    font-family: var(--mono);
    font-weight: 500;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--fg-muted);
    white-space: nowrap;
    padding-top: 0.85rem;
    padding-bottom: 0.85rem;
  }
  thead th:nth-child(2) { color: var(--accent); }
  tbody th { font-weight: 500; color: var(--fg); background: var(--surface); position: sticky; left: 0; min-width: 15rem; padding-right: 1.5rem; }
  td { color: var(--fg-muted); }
  td:nth-child(2) { color: var(--fg); }
  td.yes { color: var(--yes); font-weight: 600; }
  abbr { font-family: var(--mono); text-decoration: none; border-bottom: 1px dotted currentColor; }
  @media (max-width: 40rem) {
    table { min-width: 50rem; }
    tbody th { min-width: 9rem; max-width: 10rem; padding-right: 1rem; }
  }
</style>
