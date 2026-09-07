import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { intentOf } from '$lib/server/inquiries'

export const load: PageServerLoad = ({ cookies, setHeaders }) => {
  setHeaders({ 'cache-control': 'no-store' })
  const received = cookies.get('tw_received')
  if (!received) redirect(303, '/start')
  cookies.delete('tw_inquiry', { path: '/start' })
  return { intent: intentOf(received) }
}
