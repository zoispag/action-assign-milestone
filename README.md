# S3 Upload Artifact Action

This action uploads a build artifact to an S3 bucket.

## Inputs

| **Name**            | **Description**                     | **Required** |
| ------------------- | ----------------------------------- | ------------ |
| `access_key_id`     | Your AWS Access Key ID              | Yes          |
| `secret_access_key` | Your AWS Secret Access Key          | Yes          |
| `bucket`            | Your AWS bucket name                | Yes          |
| `bucket_root`       | Root location to store the artifact | No           |
| `key`               | Artifact destination in bucket      | Yes          |
| `path`              | The file to upload                  | Yes          |

## Outputs

| **Name**      | **Description**      |
| ------------- | -------------------- |
| `object_path` | Uploaded object path |

## Example usage

```yml
name: Upload artifact to S3

on: [push]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Upload artifact
        uses: zoispag/action-s3-upload-artifact@v1
        id: s3
        with:
          access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          bucket: ${{ secrets.AWS_BUCKET }}
          bucket_root: Artifacts
          key: my-artifact
          path: path/to/artifact/

      - name: Output path
        run: echo ${{ steps.s3.outputs.object_path }}
```
