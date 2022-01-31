# Assign milestone to Pull Requests Action

This action will assign a milestone to a Pull Request

## Inputs

| **Name**     | **Description**             | **Required** |
| ------------ | --------------------------- | ------------ |
| `token-repo` | GitHub repo token           | Yes          |
| `milestone`  | Name of milestone to assign | Yes          |

## Example usage

```yml
name: 'Auto Milestone Assign'

on:
  pull_request:
    types: [opened]

jobs:
  assign-milestone:
    runs-on: ubuntu-latest

    steps:
      - uses: zoispag/action-assign-milestone@v1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          milestone: 'roadmap'
```

## Dependabot

For pull requests created by dependabot, this action will fail with message: `(node:1488) UnhandledPromiseRejectionWarning: HttpError: Resource not accessible by integration`.

If you understand the consequences (provide write access) of this action, you can "bypass" this restriction, by triggering this action on the [`pull_request_target` event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_target). Eg:

```yml
on:
  pull_request_target:
    types: [opened]
```

Make sure to read "[Keeping your GitHub Actions and workflows secure: Preventing pwn requests](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/)" on the GitHub Security Lab website.