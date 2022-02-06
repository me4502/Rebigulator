module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: [],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended', // uses typescript-specific linting rules
    'plugin:react/recommended', // uses react-specific linting rules
    'prettier', // enables eslint-plugin-prettier and eslint-config-prettier
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/no-deprecated': 'off',
    'react/no-direct-mutation-state': 'off',
    'react/no-string-refs': 'off',
    'react/require-render-return': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
