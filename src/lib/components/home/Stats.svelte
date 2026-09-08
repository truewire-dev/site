<!-- The base of the fold: three figures from the Status paragraph of the README, set in the
     wire's monospace, with that paragraph's closing sentence as the caption. Same band as the
     hero, ruled off from it by a hairline. Only numbers that already appear in the copy. -->
<section class="stats" aria-label="Production figures">
  <div class="wrap stats-grid">
    <ul class="figures">
      <li><strong class="stat-n">14</strong> <span class="stat-l">production clients</span></li>
      <li><strong class="stat-n">3,638</strong> <span class="stat-l">endpoints</span></li>
      <li><strong class="stat-n">2,404</strong> <span class="stat-l">recorded HTTP pairs</span></li>
    </ul>
    <p class="caption">Those 14 clients serve exchange and blockchain APIs in production, where the wire is the only reliable documentation.</p>
  </div>
</section>

<style>
  .stats { background: var(--hero-bg); padding-bottom: clamp(2rem, 4vw, 3rem); }
  .stats-grid {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    column-gap: clamp(2rem, 6vw, 6rem);
    row-gap: 1.25rem;
    align-items: end;
    border-top: 1px solid var(--line);
    padding-top: 1.5rem;
  }
  .figures {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-wrap: wrap; gap: 1rem clamp(2rem, 4vw, 3.5rem);
    font-family: var(--mono);
  }
  .figures li { display: flex; flex-direction: column; gap: 0.25rem; }
  .stat-n { font-weight: 500; font-size: clamp(1.6rem, 2.6vw, 2.1rem); line-height: 1; letter-spacing: -0.01em; color: var(--fg); font-variant-numeric: tabular-nums; }
  .stat-l { font-size: 0.74rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-muted); }
  .caption { color: var(--fg-muted); font-size: 1rem; margin: 0; max-width: 32rem; }
  @media (max-width: 60rem) {
    .stats-grid { grid-template-columns: 1fr; align-items: start; }
  }
  @media (max-width: 40rem) {
    .stats { padding-bottom: 1.75rem; }
    .stats-grid { padding-top: 1.25rem; row-gap: 1rem; }
    .figures { gap: 0.9rem 1.5rem; }
    .stat-n { font-size: 1.6rem; }
  }
</style>
