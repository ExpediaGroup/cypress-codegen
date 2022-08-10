# cypress-codegen

[![GitHub Actions CI](https://github.com/ExpediaGroup/cypress-codegen/workflows/Release/badge.svg)](https://github.com/ExpediaGroup/cypress-codegen/actions?query=workflow%3ARelease)
[![npm version](https://badge.fury.io/js/cypress-codegen.svg)](https://www.npmjs.com/package/cypress-codegen)
[![Downloads](https://img.shields.io/npm/dm/cypress-codegen.svg)](https://www.npmjs.com/package/cypress-codegen)

A [Cypress](https://www.cypress.io/) plugin which automatically adds and enables IntelliSense for your [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands)!

## Table of Contents

- [Why Do I Need This Plugin?](#why-do-i-need-this-plugin)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Configuration](#configuration)

## Why Do I Need This Plugin?

The process for adding Cypress custom commands to test suites is quite manual and involves bloating projects with too much boilerplate code.
Additionally, custom commands are hard to write because we don't get IntelliSense or the ease of navigating to the command's definition.
The `cypress-codegen` plugin will dynamically import all of your project's custom commands and will even enable IntelliSense and "go to definition" shortcuts!

## Installation

```shell
npm i --save-dev cypress-codegen
```

## Usage

Model your Cypress project exactly like [the one in this repository](https://github.com/ExpediaGroup/cypress-codegen/blob/main/cypress.config.ts)!

1. Add the required plugin code to `cypress.config.ts` like so:

```ts
import { cypressCodegen } from 'cypress-codegen/dist/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressCodegen(on, config);
      return config;
    }
  },

  component: {
    setupNodeEvents(on, config) {
      cypressCodegen(on, config);
      return config;
    },
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  }
});
```

2. Add to `cypress/support/component.ts` and/or `cypress/support/e2e.ts`:

```ts
import 'cypress-codegen';
```

3. Put all of your custom commands in `cypress/commands` as regular functions. It is recommended to separate each command into its own file of the same name.

4. Run any Cypress test, and `cypress-codegen` will:
   - load these functions as valid custom commands
   - generate a special Cypress type definition for each function which will enable IntelliSense and "go to definition" shortcuts in your Cypress test code

## Example

Check out this project's `cypress` directory for a generic example!

## Custom Command Chaining

If you want to create custom commands that are meant to be scoped to a previous command's result, put `Scoped` at the
end of your custom command function name (e.g. `myCustomCommandScoped`). This will set the `prevSubject` option when
adding the custom command. See the [Cypress docs](https://docs.cypress.io/api/cypress-api/custom-commands#Arguments)
for more details.

## Code Styling

`cypress-codegen` will attempt to read your `prettierrc` config by default.
However, you may pass a config override in the cypress.config.ts invocation:

```ts
setupNodeEvents(on, config) {
    cypressCodegen(on, config, prettierConfigOverride);
    return config;
}
```

## Configuration

### Project Flag

If you are using the `--project` flag when starting Cypress, you will need to set the Cypress environment variable `PROJECT` to your project name.

In cypress.config.ts:

```ts
env: {
  PROJECT: 'my-project';
}
```

### Javascript

The IntelliSense codegen feature is enabled by default.
To disable the codegen feature (perhaps for a Javascript Cypress project), set the `CODEGEN` Cypress environment variable to `false`.
You will still get the benefit of the custom commands being loaded automatically without even having to invoke `Cypress.Commands.add()`!

```shell
CYPRESS_CODEGEN=false npx cypress run
```

or in `cypress.config.js`:

```ts
env: {
  CODEGEN: false;
}
```
