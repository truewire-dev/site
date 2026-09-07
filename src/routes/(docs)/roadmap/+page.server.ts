import { error } from '@sveltejs/kit'
import { pageByRoute } from '$lib/docs.server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  const doc = pageByRoute('/roadmap')
  if (!doc) error(404, 'Page not found')
  return { doc }
}
