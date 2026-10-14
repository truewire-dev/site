// The public API changelog, prerendered from static/changelog/ (see scripts/changelog.mjs).
// The check runs here too, so a build that skipped the prebuild step still refuses.
import data from '../../../static/changelog/changelog.json'
import apis from '../../../static/changelog/apis.json'
import markdown from '../../../static/changelog/changelog.md?raw'
import feed from '../../../static/changelog/feed.xml?raw'
import { checkChangelog } from '../../../scripts/changelog.mjs'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  const entries = checkChangelog({ data, apis, markdown, feed })
  return { entries, apis: apis as Record<string, string> }
}
