module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['/*.*'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true
  },
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.scss']
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    },
    react: {
      version: '^17.0.2'
    }
  },
  globals: {
    moment: true,
    document: true,
    window: true,
    localStorage: true,
    Audio: true,
    Event: true,
    Blob: true
  },
  rules: {
    semi: ['error', 'never'],
    'no-unused-vars': 'off',
    'func-names': 'off',
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: true
      },
      { usePrettierrc: true }
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ],
    'max-len': ['off', { code: 120, ignoreComments: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-nested-ternary': 'error',
    'no-else-return': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
    'comma-dangle': 'off',
    radix: 'off',
    eqeqeq: ['error', 'smart'],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/prefer-stateless-function': 'error',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { groups: ['external', 'internal'] }],
    'import/no-cycle': ['warn', { ignoreExternal: true }],
    'no-shadow': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'after-used', argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['enumMember', 'enum'],
        format: ['PascalCase']
      }
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': {
            message: 'Prefer explicit types for clarity'
          }
        }
      }
    ],
    "import/no-extraneous-dependencies": 'off',
  }
}
