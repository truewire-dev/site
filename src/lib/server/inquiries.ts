import { error } from '@sveltejs/kit'

export const intents = ['service', 'cloud', 'help'] as const
export type Intent = typeof intents[number]
export function intentOf(value: unknown): Intent {
  return value === 'cloud' || value === 'help' ? value : 'service'
}
export function sourceOf(value: string | null) {
  const source = value?.toLowerCase() ?? 'direct'
  return ['pricing', 'nav', 'cloud', 'faq', 'footer', 'test', 'direct'].includes(source) ? source : 'direct'
}

export type Inquiry = {
  intent: Intent; name: string; email: string; company: string;
  api_url: string; details: string; timeline: string; source: string; consent: string
}
export type FieldErrors = Partial<Record<keyof Inquiry, string>>

// Do not trust Content-Length: cap bytes as they arrive, including chunked bodies.
export async function readForm(request: Request): Promise<URLSearchParams> {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/x-www-form-urlencoded') {
    error(415, 'Please submit using the inquiry form.')
  }
  const reader = request.body?.getReader()
  if (!reader) error(400, 'The form was empty.')
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 16_384) {
        await reader.cancel()
        error(413, 'This message is too long. Please keep it under 2,000 characters.')
      }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
  return new URLSearchParams(new TextDecoder().decode(bytes))
}

export function validateInquiry(body: URLSearchParams) {
  const value = (name: string) => (body.get(name) ?? '').trim()
  const values: Inquiry = {
    intent: intentOf(value('intent')), name: value('name'), email: value('email').toLowerCase(),
    company: value('company'), api_url: value('api_url'), details: value('details'),
    timeline: value('timeline'), source: sourceOf(value('source')), consent: value('consent')
  }
  const errors: FieldErrors = {}
  if (!intents.some(intent => intent === value('intent'))) errors.intent = 'Choose how we can help.'
  if (values.name.length < 2 || values.name.length > 100) errors.name = 'Enter your name (2–100 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) errors.email = 'Enter a valid email address.'
  if (values.company.length > 150) errors.company = 'Keep the company name under 150 characters.'
  if (values.api_url) {
    try {
      const url = new URL(values.api_url)
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || values.api_url.length > 1000) throw new Error()
    } catch { errors.api_url = 'Use an http or https URL without embedded credentials.' }
  }
  if (values.intent !== 'cloud' && values.details.length < 20) errors.details = 'Tell us a little more (at least 20 characters).'
  if (values.details.length > 2000) errors.details = 'Keep your message under 2,000 characters.'
  if (!['', 'now', 'month', 'quarter', 'exploring'].includes(values.timeline)) errors.timeline = 'Choose one of the timing options.'
  if (values.consent !== 'yes') errors.consent = 'Please confirm we can contact you about this request.'
  // Bound echoed values even for deliberately invalid requests.
  values.name = values.name.slice(0, 100)
  values.email = values.email.slice(0, 254)
  values.company = values.company.slice(0, 150)
  values.api_url = values.api_url.slice(0, 1000)
  values.details = values.details.slice(0, 2000)
  return { values, errors }
}
