import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateInquiry, readForm, sourceOf } from '../src/lib/server/inquiries.ts'

const valid = () => new URLSearchParams({ intent: 'service', name: 'Test Builder', email: 'test@example.com', details: 'We need a client for our billing API.', consent: 'yes', source: 'pricing' })
test('accepts a scoped inquiry and normalizes email', () => {
  const body = valid(); body.set('email', ' TEST@example.com ')
  const { values, errors } = validateInquiry(body)
  assert.deepEqual(errors, {}); assert.equal(values.email, 'test@example.com')
})
test('rejects invalid fields, credential URLs and missing consent', () => {
  const body = valid()
  for (const [key, value] of Object.entries({ intent: 'fake', name: 'x', email: 'nope', api_url: 'https://user:secret@example.com', details: 'short', timeline: 'yesterday', consent: '' })) body.set(key, value)
  assert.equal(Object.keys(validateInquiry(body).errors).length, 7)
})
test('cloud signup needs no project details; source cannot hold arbitrary data', () => {
  const body = valid(); body.set('intent', 'cloud'); body.set('details', '')
  assert.deepEqual(validateInquiry(body).errors, {})
  assert.equal(sourceOf('someone@example.com'), 'direct')
  assert.equal(sourceOf('Pricing'), 'pricing')
})
test('bounds echoed values and rejects oversized messages', () => {
  const body = valid(); body.set('details', 'x'.repeat(2200))
  const result = validateInquiry(body)
  assert.ok(result.errors.details); assert.equal(result.values.details.length, 2000)
})
test('reads native form bodies and rejects other content types', async () => {
  const parsed = await readForm(new Request('https://example.com', { method: 'POST', body: valid() }))
  assert.equal(parsed.get('name'), 'Test Builder')
  await assert.rejects(readForm(new Request('https://example.com', { method: 'POST', body: '{}' })), error => error.status === 415)
})
test('caps streamed input even when Content-Length is absent', async () => {
  const request = new Request('https://example.com', { method: 'POST', body: 'x'.repeat(17000), headers: { 'content-type': 'application/x-www-form-urlencoded' } })
  await assert.rejects(readForm(request), error => error.status === 413)
})
