# cypress-codegen

[![GitHub Actions CI](https://github.com/ExpediaGroup/cypress-codegen/workflows/Release/badge.svg)](https://github.com/ExpediaGroup/cypress-codegen/actions?query=workflow%3ARelease)
[![npm version](https://badge.fury.io/js/cypress-codegen.svg)](https://www.npmjs.com/package/cypress-codegen)
[![Downloads](https://img.shields.io/npm/dm/cypress-codegen.svg)](https://www.npmjs.com/package/cypress-codegen)

A [Cypress](https://www.cypress.io/) plugin and CLI tool which automatically adds and enables IntelliSense for your [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands)!

## Table of Contents

-   [Why Do I Need This Plugin?](#why-do-i-need-this-plugin)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Example](#example)
-   [Configuration](#configuration)

## Why Do I Need This Plugin?

The process for adding Cypress custom commands to test suites is quite manual and involves bloating projects with too much boilerplate code.
Additionally, custom commands are hard to write because we don't get IntelliSense or the ease of navigating to the command's definition.
The `cypress-codegen` plugin will enable IntelliSense and "go to definition" shortcuts, and will also generate boilerplate for adding custom commands to Cypress!

## Installation

```shell
npm i --save-dev cypress-codegen
```

## Plugin Usage

1. Add the required plugin code to `cypress.config.ts` like so:

```ts
import { cypressCodegen } from "cypress-codegen";
import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            cypressCodegen(on, config);
            return config;
        },
    },

    component: {
        setupNodeEvents(on, config) {
            cypressCodegen(on, config);
            return config;
        },
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
```

2. Put all of your custom commands in `cypress/commands` as regular functions.
3. Run the `cypress-codegen` CLI command, or just open Cypress!
4. You will notice that the Cypress support file(s) are updated to automatically import all your custom commands!

## Example

Check out this project's `cypress` directory for a generic example!

## Custom Command Chaining

If you want to create custom commands that are meant to be scoped to a previous command's result, just add those
separately. See the [Cypress docs](https://docs.cypress.io/api/cypress-api/custom-commands#Arguments)
for more details.

## Code Styling

`cypress-codegen` will attempt to read your `prettierrc` config by default, but will use the prettier defaults otherwise.

## Command Line Usage

You can run `cypress-codegen` in your terminal to generate types for your Cypress project!
Pass the `--testingType` option to run it for a particular testing type, `component` or `e2e` (defaults to `e2e`).

Currently, only the default `supportFile` config options are supported. See the [docs](https://docs.cypress.io/guides/references/configuration#Testing-Type-Specific-Options) for more details.
Also, JavaScript usage is not supported. Use TypeScript, it's better!
