import { nextBuild } from 'next/dist/cli/next-build'

export default async function global_setup(): Promise<void> {
  process.env.PLAYWRIGHT = '1'

  if (process.env.SKIP_BUILD === '1') {
    console.log('skipping build')
  } else {
    await nextBuild(['.'])
  }
}
