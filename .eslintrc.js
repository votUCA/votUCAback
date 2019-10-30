module.exports = {
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Required to have rules that rely on Types.
    project: './tsconfig.json',
    tsconfigRootDir: './'
  },
  extends: [
    'standard',
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'no-useless-constructor': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        // Prevents us from using any delimiter for interface properties.
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        }
      }
    ],
    // This is the job of StandardJS, they are competing rules so we turn off the Typescript one.
    '@typescript-eslint/indent': 'off',
    // On the fence about using this one, sometimes we import a package that is never used directly.
    'no-unused-vars': 'off',
    // Allows us to use Import and Export keywords.
    'node/no-unsupported-features/es-syntax': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ]
  }
}
