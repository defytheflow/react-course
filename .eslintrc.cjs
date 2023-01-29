/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  plugins: ["simple-import-sort", "unused-imports"],
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    eqeqeq: "error",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "unused-imports/no-unused-imports": "warn",
    "@typescript-eslint/consistent-type-imports": "warn",
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
      rules: {
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/no-misused-promises": "off",
      },
    },
  ],
};
