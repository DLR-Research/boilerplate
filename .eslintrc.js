module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    node: true
  },
  overrides: [{
    files: ['pages/**/*'],
    env: {
      node: false,
      browser: true
    }
  }],
  rules: {
    'no-empty-pattern': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
