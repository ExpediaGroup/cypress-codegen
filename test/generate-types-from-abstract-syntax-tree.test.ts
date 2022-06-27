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

import { generateTypesFromAbstractSyntaxTree } from '../src/generate-types-from-abstract-syntax-tree';

import { expect } from '@jest/globals';
import { readFileSync } from 'fs';

jest.mock('fs');

const filePath = 'filePath';

describe('generateTypesFromAbstractSyntaxTree', () => {
  it('should generate types when types do not exist', async () => {
    (readFileSync as jest.Mock).mockReturnValue(`// some comment

export function functionExampleOneInput(input1: string) {
  cy.log('Here is a custom command!');
}

export function functionExampleTwoInputs(input1: string, input2: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleOptionalInput(input1: string, input2?: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleWithInitializer(input1: string, input2: number = 0) {
  cy.log('Here is a custom command!');
}

export const arrowFunctionExample = (input1: string) => {
  cy.log('Here is a custom command from an arrow function!').log(input);
};
`);
    const result = generateTypesFromAbstractSyntaxTree(filePath);
    expect(result).toEqual(`// some comment

export function functionExampleOneInput(input1: string) {
  cy.log('Here is a custom command!');
}

export function functionExampleTwoInputs(input1: string, input2: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleOptionalInput(input1: string, input2?: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleWithInitializer(input1: string, input2: number = 0) {
  cy.log('Here is a custom command!');
}

export const arrowFunctionExample = (input1: string) => {
  cy.log('Here is a custom command from an arrow function!').log(input);
};

declare global {
  namespace Cypress {
    interface Chainable {
      functionExampleOneInput(input1: string): Chainable;
      functionExampleTwoInputs(input1: string, input2: number): Chainable;
      functionExampleOptionalInput(input1: string, input2?: number): Chainable;
      functionExampleWithInitializer(input1: string, input2?: number): Chainable;
      arrowFunctionExample(input1: string): Chainable;
    }
  }
}
`);
  });

  it('should generate types when types exist', async () => {
    (readFileSync as jest.Mock).mockReturnValue(`// some comment

export function functionExampleOneInput(input1: string) {
  cy.log('Here is a custom command!');
}

export function functionExampleTwoInputs(input1: string, input2: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleOptionalInput(input1: string, input2?: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleWithInitializer(input1: string, input2: number = 0) {
  cy.log('Here is a custom command!');
}

export const arrowFunctionExample = (input1: string) => {
  cy.log('Here is a custom command from an arrow function!').log(input);
};

declare global {
  namespace Cypress {
    interface Chainable {
      something(input1: string): Chainable;
      somethingElse(input1: string): Chainable;
    }
  }
}
`);
    const result = generateTypesFromAbstractSyntaxTree(filePath);
    expect(result).toEqual(`// some comment

export function functionExampleOneInput(input1: string) {
  cy.log('Here is a custom command!');
}

export function functionExampleTwoInputs(input1: string, input2: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleOptionalInput(input1: string, input2?: number) {
  cy.log('Here is a custom command!');
}

export function functionExampleWithInitializer(input1: string, input2: number = 0) {
  cy.log('Here is a custom command!');
}

export const arrowFunctionExample = (input1: string) => {
  cy.log('Here is a custom command from an arrow function!').log(input);
};

declare global {
  namespace Cypress {
    interface Chainable {
      functionExampleOneInput(input1: string): Chainable;
      functionExampleTwoInputs(input1: string, input2: number): Chainable;
      functionExampleOptionalInput(input1: string, input2?: number): Chainable;
      functionExampleWithInitializer(input1: string, input2?: number): Chainable;
      arrowFunctionExample(input1: string): Chainable;
    }
  }
}
`);
  });
});
