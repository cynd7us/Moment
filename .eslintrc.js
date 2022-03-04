const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

// http://eslint.org/docs/user-guide/configuring
// https://github.com/prettier/prettier#eslint
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  env: {
    jest: true,
    node: true,
  },
  overrides: [
    {
      files: ['infra/**/*.js', 'services/**/index.js'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'jest/no-try-expect': 0,
    'jest/no-test-callback': 0,
    'jest/expect-expect': 0,
    'jest/no-deprecated-functions': 0,
    'jest/no-done-callback': 0,
  },
};