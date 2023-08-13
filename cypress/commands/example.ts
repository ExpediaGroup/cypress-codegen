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

export function functionExample(input: string) {
  cy.log('Here is a custom command!')
    .log('And it preserves my code styling')
    .log('When I chain commands on new lines!');
  cy.contains(input);
}

export const arrowFunctionExample = (input: string) => {
  cy.log('Here is a custom command from an arrow function!');
  cy.contains(input);
};

declare global {
  namespace Cypress {
    interface Chainable {
      functionExample(input: string): Chainable;
      arrowFunctionExample(input: string): Chainable;
    }
  }
}
