import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { intentOf, sourceOf, readForm, validateInquiry } from '$lib/server/inquiries'

export const load: PageServerLoad = async ({ url, platform, cookies, setHeaders }) => {
  setHeaders({ 'cache-control': 'no-store', 'referrer-policy': 'same-origin' })
  const intent = intentOf(url.searchParams.get('intent'))
  const source = sourceOf(url.searchParams.get('source'))
  // One short-lived, same-site token makes refresh/retry idempotent. No visitor tracking.
  let submissionId = cookies.get('tw_inquiry')
  if (!submissionId || !/^[0-9a-f-]{36}$/.test(submissionId)) {
    submissionId = crypto.randomUUID()
    cookies.set('tw_inquiry', submissionId, { path: '/start', httpOnly: true, sameSite: 'strict', secure: url.protocol === 'https:', maxAge: 3600 })
  }
  if (platform?.env.LEADS) {
    try {
      await platform.env.LEADS.prepare(`INSERT INTO funnel_daily (day, intent, source, views) VALUES (?, ?, ?, 1)
        ON CONFLICT(day, intent, source) DO UPDATE SET views = views + 1`)
        .bind(new Date().toISOString().slice(0, 10), intent, source).run()
    } catch { console.error(JSON.stringify({ event: 'funnel_count_failed' })) }
  }
  return { intent, source, submissionId }
}

export const actions = {
  default: async ({ request, platform, url, cookies }) => {
    // SvelteKit also checks this. Keep the endpoint's requirement explicit.
    if (request.headers.get('origin') !== url.origin) return fail(403, { values: undefined, errors: {}, message: 'Open the form on this site and try again.' })
    const body = await readForm(request)
    const { values, errors } = validateInquiry(body)
    const rejected = (status: number, message: string) => fail(status, { values, errors, message })
    const submissionId = body.get('submission_id')
    if (!submissionId || submissionId !== cookies.get('tw_inquiry')) return rejected(400, 'Your form expired. Reload this page before trying again.')
    if (body.get('website')) return rejected(400, 'We couldn’t accept this request. Please leave the website field empty.')
    if (Object.keys(errors).length) return rejected(400, 'A few details need your attention.')
    const env = platform?.env
    if (!env?.LEADS || !env.INQUIRY_LIMITER) return rejected(503, 'The form is temporarily unavailable. Your request has not been saved. Please try again shortly.')
    try {
      const limit = await env.INQUIRY_LIMITER.limit({ key: request.headers.get('cf-connecting-ip') ?? 'local' })
      if (!limit.success) return rejected(429, 'Too many attempts. Wait a minute, then try again.')
      const now = Date.now()
      // Unique submission ID prevents duplicate leads when the browser retries a POST.
      const result = await env.LEADS.prepare(`INSERT INTO inquiries
        (id, created_at, intent, name, email, company, api_url, details, timeline, source, consent_version, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`)
        .bind(submissionId, now, values.intent, values.name, values.email, values.company, values.api_url,
          values.details, values.timeline, values.source, '2026-09-07', now).run()
      if (!result.success) throw new Error('write_failed')
      console.log(JSON.stringify({ event: 'inquiry_saved', intent: values.intent, inserted: result.meta.changes > 0 }))
    } catch {
      // Never log form contents, email addresses, or database exceptions containing bindings.
      console.error(JSON.stringify({ event: 'inquiry_save_failed' }))
      return rejected(503, 'We couldn’t save your request. Your details are still here; please try again shortly.')
    }
    cookies.set('tw_received', values.intent, { path: '/start', httpOnly: true, sameSite: 'strict', secure: url.protocol === 'https:', maxAge: 600 })
    redirect(303, '/start/thanks')
  }
} satisfies Actions
