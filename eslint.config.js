import github from 'eslint-plugin-github'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

const githubFlat = github.getFlatConfigs()

export default tseslint.config(
  {
    ignores: ['dist/', 'lib/', 'node_modules/'],
  },
  githubFlat.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'eslint-comments/no-use': 'off',
      'import/no-namespace': 'off',
      // tsc handles resolution; import resolver can't map NodeNext .js -> .ts
      'import/no-unresolved': 'off',
      camelcase: 'off',
      'i18n-text/no-en': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
    },
  },
  {
    // The flat config file itself: skip import resolution checks.
    files: ['eslint.config.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  prettier,
)
