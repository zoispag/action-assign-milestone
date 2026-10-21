import {
  assignMilestoneOnPullRequest,
  findMilestoneByName,
} from './milestone-actions.js'
import { getInput, info, setFailed } from '@actions/core'
import { context } from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = getInput('repo-token', { required: true })
    const searchName = getInput('milestone', { required: true })

    const { title, id } = await findMilestoneByName(token, searchName)
    await assignMilestoneOnPullRequest(token, id)

    info(
      /* eslint-disable-next-line i18n-text/no-en */
      `Milestone ${title} has been assigned to PR #${context.payload.pull_request?.number}`,
    )
  } catch (error) {
    setFailed(error instanceof Error ? error.message : String(error))
  }
}

run()
