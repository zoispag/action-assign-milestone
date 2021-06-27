import { setFailed, getInput, setOutput } from '@actions/core'
import { graphql } from '@octokit/graphql'
import { context } from '@actions/github'

const findMilestoneByName = async (milestoneName: String): Promise<Number> => {
  const repoToken = getInput('repo-token', { required: true })

  const { repository } = await graphql(
    `{
      repository(owner: "${context.repo.owner}", name: "${context.repo.repo}") {
        milestones(query: "${milestoneName}", last: 1) {
          nodes {
            number
          }
        }
      }
    }`,
    {
      headers: {
        authorization: `token ${repoToken}`,
      },
    },
  )

  return repository.milestones.nodes[0]?.number || 0
}

async function run(): Promise<void> {
  try {
    const milestoneName = getInput('milestone')
    const milestoneId = await findMilestoneByName(milestoneName)
    setOutput('milestoneId', milestoneId)

    if (milestoneId === 0) {
      throw new Error(`Milestone with name '${milestoneName}'`)
    }
  } catch ({ message }) {
    setFailed(message)
  }
}

run()
