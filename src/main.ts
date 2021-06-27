import { info, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'
import {
  findMilestoneByName,
  assignMilestoneOnPullRequest,
} from './milestone-actions'

async function run(): Promise<void> {
  try {
    const token = getInput('repo-token', { required: true })
    const searchName = getInput('milestone', { required: true })

    const { title, id } = await findMilestoneByName(token, searchName)
    assignMilestoneOnPullRequest(token, id)

    info(
      `Milestone ${title} has been assigned to PR #${context.payload.pull_request?.number}`,
    )
  } catch ({ message }) {
    setFailed(message)
  }
}

run()
