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

import { isScopedMethod } from './common';

interface TaskResult {
  filePaths: string[];
  commandsDirectory: string;
}

before('Import Custom Commands', () => {
  cy.task('importCustomCommands').then((result: unknown) => {
    const { filePaths, commandsDirectory } = result as TaskResult;
    filePaths.forEach(filePath => {
      const projectName = Cypress.env('PROJECT') ? `${Cypress.env('PROJECT')}/` : '';
      // This relative file path is extremely particular and for some unknown reason must be exactly this.
      const customCommandObject = require(`../../../${projectName}cypress/commands/${filePath.replace(
        commandsDirectory,
        ''
      )}`);
      const methodNames = Object.keys(customCommandObject);
      methodNames.forEach(methodName => {
        const method = customCommandObject[methodName];
        if (isScopedMethod(methodName)) {
          Cypress.Commands.add(
            methodName as keyof Cypress.Chainable,
            { prevSubject: 'element' },
            method
          );
        } else {
          Cypress.Commands.add(methodName as keyof Cypress.Chainable, method);
        }
      });
    });
  });
});

export { cypressCodegen } from './plugin';
