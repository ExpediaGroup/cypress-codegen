/* eslint-disable @typescript-eslint/no-require-imports */

const typescriptEslint = require("typescript-eslint");
const cypressEslintPlugin = require("eslint-plugin-cypress");

module.exports = [
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
      "sort-annotation": cypressEslintPlugin,
    },
    rules: {
      "no-console": "error",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-call": "error",
    },
  },
  {
    ignores: ["dist", "node_modules"],
  },
];
