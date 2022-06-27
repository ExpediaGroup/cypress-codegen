# cypress-codegen

A [Cypress](https://www.cypress.io/) plugin which automatically adds and enables IntelliSense for your [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands)!

## Table of Contents

-   [Why Do I Need This Plugin?](#why-do-i-need-this-plugin)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Example](#example)
-   [Configuration](#configuration)

## Why Do I Need This Plugin?

The process for adding Cypress custom commands to test suites is quite manual and involves bloating projects with too much boilerplate code.
Additionally, custom commands are hard to write because we don't get IntelliSense or the ease of navigating to the command's definition.
The `cypress-codegen` plugin will dynamically import all of your project's custom commands and will even enable IntelliSense and "go to definition" shortcuts!

## Installation

```shell
npm i --save-dev cypress-codegen
```

## Usage

1. Add to `cypress/plugins.ts`:

```ts
import { cypressCodegen } from 'cypress-codegen/dist/plugin';

const plugins: Cypress.PluginConfig = (on, config) => {
    cypressCodegen(on, config);

    return config;
};

export default plugins;
```

2. Add to `cypress/support.ts`:

```ts
import 'cypress-codegen';
```

3. Put all of your custom commands in `cypress/commands` as regular functions. It is recommended to separate each command into its own file of the same name.

4. Run any Cypress test, and `cypress-codegen` will:
    - load these functions as valid custom commands
    - generate a special Cypress type definition for each function which will enable IntelliSense and "go to definition" shortcuts in your Cypress test code

## Example

Check out this project's `cypress` directory for a generic example!

## Configuration

### Javascript

The IntelliSense codegen feature is enabled by default.
To disable the codegen feature (perhaps for a Javascript Cypress project), set the `CODEGEN` Cypress environment variable to `false`.
You will still get the benefit of the custom commands being loaded automatically without even having to invoke `Cypress.Commands.add()`!

```shell
CYPRESS_CODEGEN=false npx cypress run
```

or in `cypress.json`:

```json
{
    "env": {
        "CODEGEN": false
    }
}
```
