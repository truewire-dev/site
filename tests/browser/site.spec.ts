import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'

function rows(sql: string) {
  const output = execFileSync(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'd1', 'execute', 'LEADS', '--env', 'dev', '--local', '--persist-to', '.wrangler/test-state', '--command', sql, '--json'], { encoding: 'utf8' })
  return JSON.parse(output)[0].results
}

test('desktop and mobile: layout, examples, keyboard, FAQ, themes, and links', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page).toHaveTitle('Truewire — Their API. Your rules.')
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true })
  await expect(page.locator('.example-money')).toBeVisible()
  await page.getByRole('radio', { name: 'Timestamps', exact: true }).check()
  await expect(page.locator('.example-time')).toBeVisible()
  await expect(page.locator('.example-money')).toBeHidden()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('.example-bool')).toBeVisible()
  await page.getByRole('radio', { name: 'Prices', exact: true }).check()
  await page.locator('summary').first().click()
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  await page.locator('summary').first().click()
  for (const width of [320, 390, 600, 768, 834, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`).toBe(true)
    // Clipping inside an overflow-hidden hero is invisible to a scrollWidth-only check.
    for (const selector of ['h1', '.hero .actions', '.output-client', '.protocol-ws']) {
      const box = await page.locator(selector).boundingBox()
      expect(box!.x, `${selector} left at ${width}`).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width, `${selector} right at ${width}`).toBeLessThanOrEqual(width)
    }
    if (width === 390) { await page.screenshot({ path: 'test-results/mobile.png', fullPage: true }); await page.screenshot({ path: 'test-results/mobile-hero.png' }) }
  }
  await page.getByRole('radio', { name: 'Dark', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark')
  await page.screenshot({ path: 'test-results/dark.png', fullPage: true })
  await page.getByRole('radio', { name: 'Light', exact: true }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await page.locator('.moving-wire').evaluate(el => getComputedStyle(el).animationName)).toBe('none')
  const links = await page.locator('a[href^="/"]').evaluateAll(els => [...new Set(els.map(el => el.getAttribute('href')!))])
  for (const href of links) {
    const response = await page.request.get(href)
    expect(response.ok(), `${href} returned ${response.status()}`).toBe(true)
    const hash = new URL(href, 'http://localhost').hash
    if (hash) expect(await response.text(), `Missing anchor: ${href}`).toContain(`id="${hash.slice(1)}"`)
  }
  await page.goto('/docs')
  await page.screenshot({ path: 'test-results/docs.png' })
  expect(errors).toEqual([])
})

test('service form submits without JavaScript and persists the actual lead', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: 'http://127.0.0.1:8788', javaScriptEnabled: false, viewport: { width: 1440, height: 1100 }, extraHTTPHeaders: { 'cf-connecting-ip': '192.0.2.11' } })
  const page = await context.newPage()
  await page.goto('/start?intent=service&source=pricing')
  await page.screenshot({ path: 'test-results/inquiry-desktop.png', fullPage: true })
  const id = await page.locator('[name="submission_id"]').inputValue()
  await page.getByLabel('Your name', { exact: true }).fill('Browser Test')
  await page.getByLabel('Work email').fill('browser-test@example.com')
  await page.getByLabel('API docs URL', { exact: false }).fill('https://example.com/api')
  await page.getByLabel('What do you need to build?').fill('A typed client for an example billing API.')
  await page.getByLabel('When are you hoping to ship?', { exact: false }).selectOption('month')
  await page.locator('#consent').check()
  await page.getByRole('button', { name: 'Request an integration scope' }).click()
  await expect(page).toHaveURL('/start/thanks')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Let’s make something work.')
  const result = rows(`SELECT email, intent, source, timeline, status FROM inquiries WHERE id = '${id}'`)
  expect(result).toEqual([{ email: 'browser-test@example.com', intent: 'service', source: 'pricing', timeline: 'month', status: 'new' }])
  await page.screenshot({ path: 'test-results/thanks.png' })
  await context.close()
})

test('cloud flow is short, responsive, and keeps consent separate from an engagement', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'cf-connecting-ip': '192.0.2.12' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/start?intent=cloud&source=cloud')
  await expect(page.locator('#api_url')).toHaveCount(0)
  await expect(page.locator('#details')).not.toHaveAttribute('required')
  await page.screenshot({ path: 'test-results/inquiry-mobile.png', fullPage: true })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const id = await page.locator('[name="submission_id"]').inputValue()
  await page.locator('#name').fill('Cloud Test')
  await page.locator('#email').fill('cloud-test@example.com')
  await page.locator('#consent').check()
  await page.getByRole('button', { name: 'Join the early-access list' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('You’re on the list.')
  expect(rows(`SELECT intent FROM inquiries WHERE id = '${id}'`)).toEqual([{ intent: 'cloud' }])
})

test('server validates, blocks CSRF and bots, limits requests, and deduplicates retries', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'cf-connecting-ip': '192.0.2.13' })
  await page.goto('/start?intent=service&source=test')
  const id = await page.locator('[name="submission_id"]').inputValue()
  const form = { submission_id: id, name: 'Test User', email: 'retry-test@example.com', intent: 'service', details: 'A valid project description with enough detail.', consent: 'yes', source: 'test' }
  const post = (fields: Record<string, string>, origin = 'http://127.0.0.1:8788') => page.request.post('/start', { form: fields, headers: { origin, accept: 'text/html' }, maxRedirects: 0 })
  expect((await post(form, 'https://attacker.example')).status()).toBe(403)
  expect((await post({ ...form, submission_id: 'invalid' })).status()).toBe(400)
  expect((await post({ ...form, website: 'spam' })).status()).toBe(400)
  const invalid = await post({ ...form, email: 'invalid', details: 'short' })
  expect(invalid.status()).toBe(400)
  expect(await invalid.text()).toContain('Enter a valid email address.')
  expect(rows(`SELECT id FROM inquiries WHERE id = '${id}'`)).toHaveLength(0)
  expect((await post(form)).status()).toBe(303)
  expect((await post(form)).status()).toBe(303)
  expect(rows(`SELECT id FROM inquiries WHERE id = '${id}'`)).toHaveLength(1)
  for (let n = 0; n < 3; n++) expect((await post(form)).status()).toBe(303)
  expect((await post(form)).status()).toBe(429)
  const huge = await page.request.post('/start', { data: 'x'.repeat(17000), headers: { origin: 'http://127.0.0.1:8788', 'content-type': 'application/x-www-form-urlencoded' } })
  expect(huge.status()).toBe(413)
})
