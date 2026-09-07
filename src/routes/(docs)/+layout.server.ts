import { nav } from '$lib/docs.server'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = () => ({ nav })
