import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)
  // Static assets use _headers; server-rendered forms need these on the response.
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'same-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (event.url.hostname !== 'truewire.dev') response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  if (event.url.pathname.startsWith('/start')) response.headers.set('Cache-Control', 'no-store')
  return response
}
