/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'curly': ['error', 'all'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'no-constant-binary-expression': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    'prefer-const': 'error',
    'quotes': ['error', 'single', {allowTemplateLiterals: true}],
    'semi': ['error', 'always'],
    'semi-spacing': 'error',
    'semi-style': ['error', 'last'],
    'space-before-blocks': 'error',
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
  },
};
