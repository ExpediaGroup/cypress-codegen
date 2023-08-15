/*
Copyright 2022 Expedia, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { readFileSync } from 'fs';
import { appendCommandImports } from '../src/append-command-imports';

jest.mock('fs');

const filePath = 'filePath';
const prettierConfig = {
  singleQuote: true,
  printWidth: 90
};

describe('appendCommandImports', () => {
  it('should generate types when types do not exist', async () => {
    (readFileSync as jest.Mock).mockReturnValue(`// some comment

import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
`);
    const result = await appendCommandImports(filePath, prettierConfig);
    expect(result).toEqual(`// some comment

import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

/** Generated by cypress-codegen **/
import('../commands').then(Cypress.Commands.addAll);
`);
  });

  it('should do nothing when types exist', async () => {
    (readFileSync as jest.Mock).mockReturnValue(`// some comment

import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

/** Generated by cypress-codegen **/
import('../commands').then(Cypress.Commands.addAll);
`);
    const result = await appendCommandImports(filePath, prettierConfig);
    expect(result).toEqual(`// some comment

import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

/** Generated by cypress-codegen **/
import('../commands').then(Cypress.Commands.addAll);
`);
  });
});
