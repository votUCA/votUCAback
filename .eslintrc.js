module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './'
  },
  env: {
    node: true,
    jest: true,
    es6: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['import', 'prettier', '@typescript-eslint', 'promise'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.json']
      },
      typescript: {
        alwaysTryTypes: true,
        directory: './tsconfig.json'
      }
    },
    'import/extensions': ['.ts', '.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    }
  },
  rules: {
    // eslint
    'max-classes-per-file': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    // prettier
    'prettier/prettier': ['error'],
    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    // import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never'
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off'
  }
}
