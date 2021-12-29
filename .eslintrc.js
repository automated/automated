const basePlugins = ['react-hooks', 'jest', 'simple-import-sort'];

module.exports = {
  env: {
    es2021: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  globals: {
    window: true,
  },
  overrides: [
    {
      env: {
        es2021: true,
        node: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'next/core-web-vitals',
      ],
      files: '*.ts,*.tsx',
      plugins: [...basePlugins, 'typescript-sort-keys', '@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        'typescript-sort-keys/interface': 'error',
        'typescript-sort-keys/string-enum': 'error',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: basePlugins,
  root: true,
  rules: {
    'arrow-parens': 'off',
    'func-names': 'error',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    indent: 'off',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      { controlComponents: ['Autosuggest'] },
    ],
    'no-alert': 'error',
    'no-console': 'error',
    'no-constant-condition': 'error',
    'no-lonely-if': 'error',
    'no-prototype-builtins': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'error',
    'react/jsx-wrap-multilines': 'off',
    'react/no-danger': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'error',
    'react/state-in-constructor': ['error', 'never'],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
    'sort-keys': 'error',
  },
};
