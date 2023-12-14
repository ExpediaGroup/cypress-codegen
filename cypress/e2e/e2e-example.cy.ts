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

const expectedText = "Kitchen Sink";

describe("Example Test", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/");
  });

  it("should dynamically import custom commands from functions", () => {
    cy.functionExample(expectedText);
  });

  it("should dynamically import custom commands from arrow functions", () => {
    cy.arrowFunctionExample(expectedText);
  });

  it("should dynamically import nested custom commands", () => {
    cy.nestedExample(expectedText);
  });

  it("should chain custom commands", () => {
    cy.log(expectedText)
      .functionExample(expectedText)
      .arrowFunctionExample(expectedText)
      .nestedExample(expectedText);
  });
});
