import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      vue,
      '@typescript-eslint': tsPlugin,
      prettier
    },
    rules: {
      'vue/multi-word-component-names': 'error',
      'vue/no-v-html': 'error',
      'vue/no-irregular-whitespace': 'error',
      'vue/no-parsing-error': 'error',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-unused-vars': 'error',
      'no-undef': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prettier/prettier': 'error'
    }
  }
]