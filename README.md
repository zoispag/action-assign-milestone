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
