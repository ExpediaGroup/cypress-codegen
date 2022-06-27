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

describe('Example Test', () => {
  it('should dynamically import custom commands from functions', () => {
    cy.functionExample('Functions work!');
  });

  it('should dynamically import custom commands from arrow functions', () => {
    cy.arrowFunctionExample('Arrow functions work!');
  });

  it('should dynamically import nested custom commands', () => {
    cy.nestedExample('Nested custom commands work!');
  });

  it('should chain custom commands', () => {
    cy.log('Custom commands can chain, too!').functionExample('1').arrowFunctionExample('2').nestedExample('3');
  });
});
