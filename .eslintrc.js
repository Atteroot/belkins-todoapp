module.exports = {
  env: {
    node: true,
  },
  parser: [
    "vue-eslint-parser"
  ],
  parserOptions: [
    "@typescript-eslint/parser"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error'
  }
}
