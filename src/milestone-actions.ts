import { graphql } from '@octokit/graphql'
import { context, getOctokit } from '@actions/github'

const findMilestoneByName = async (
  repoToken: string,
  milestoneName: String,
): Promise<{ title: String; id: Number }> => {
  const { repository } = await graphql({
    query: `query fetchMilestone($owner: String!, $repo: String!, $milestoneQuery: String!) {
      repository(owner:$owner, name:$repo) {
        milestones(query:$milestoneQuery, last: 1) {
          nodes {
            number
            title
          }
        }
      }
    }`,
    owner: context.repo.owner,
    repo: context.repo.repo,
    milestoneQuery: milestoneName,
    headers: {
      authorization: `token ${repoToken}`,
    },
  })

  if ((repository.milestones.nodes[0]?.number || 0) === 0) {
    throw new Error(`Milestone with name '${milestoneName}' not found`)
  }

  return {
    title: repository.milestones.nodes[0]?.title || '',
    id: repository.milestones.nodes[0]?.number || 0,
  }
}

const assignMilestoneOnPullRequest = async (
  token: string,
  milestoneId: Number,
): Promise<void> => {
  if (context.payload.pull_request === undefined) {
    throw new Error(
      'Cannot get pull_request payload. Ensure a pull_request event has been triggered',
    )
  }

  const octokit = getOctokit(token)
  await octokit.rest.issues.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.payload.pull_request.number,
    milestone: milestoneId,
  })
}

export { findMilestoneByName, assignMilestoneOnPullRequest }
