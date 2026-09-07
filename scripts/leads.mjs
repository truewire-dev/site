#!/usr/bin/env node
// Operator-only CLI. Cloudflare credentials stay in Wrangler; no public inbox endpoint.
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const command = args[0] ?? 'list'
const environment = args.includes('--production') ? '' : 'dev'
const location = args.includes('--remote') ? '--remote' : '--local'
const wrangler = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url))
let sql
if (command === 'list') {
  sql = `SELECT id, datetime(created_at / 1000, 'unixepoch') AS received_utc,
    intent, status, name, email, company, api_url, details, timeline, source
    FROM inquiries ORDER BY created_at DESC LIMIT 50`
} else if (command === 'stats') {
  sql = `SELECT intent, source, SUM(views) AS form_page_requests FROM funnel_daily GROUP BY intent, source;
    SELECT intent, source, status, COUNT(*) AS inquiries FROM inquiries GROUP BY intent, source, status`
} else if (command === 'status') {
  const [, id, status] = args
  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)
    || !['new', 'contacted', 'qualified', 'won', 'lost', 'closed'].includes(status)) {
    throw new Error('Usage: yarn leads status <UUID> <new|contacted|qualified|won|lost|closed> [--remote] [--production]')
  }
  // Both interpolated values are restricted to the exact UUID/status alphabets above.
  sql = `UPDATE inquiries SET status = '${status}', updated_at = ${Date.now()} WHERE id = '${id}';
    SELECT id, status FROM inquiries WHERE id = '${id}'`
} else {
  throw new Error('Usage: yarn leads <list|stats|status> [--remote] [--production]. Defaults to local development.')
}
execFileSync(process.execPath, [wrangler, 'd1', 'execute', 'LEADS', '--env', environment, location, '--command', sql, '--json'], { stdio: 'inherit' })
