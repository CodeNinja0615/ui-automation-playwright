import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: [
      'node_modules',
      'playwright-report',
      'test-results',
      'allure-results',
      'dist',
      'experiments.js',
      'tests/hooks',
      'playwright.config.js'
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      playwright,
    },
    rules: {
      // General JS rules
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'error',

      // Async safety
      'no-return-await': 'error',

      // Style / consistency
      'prefer-const': 'error',

      // Playwright-specific
      'playwright/no-focused-test': 'error', // blocks test.only
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-force-option': 'warn',

      // Prevent flaky tests
      'playwright/expect-expect': 'error',
    },
  },
];
