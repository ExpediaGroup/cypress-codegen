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

import { sync } from 'glob';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export const COMMANDS_DIRECTORY = 'cypress/commands';

export const cypressCodegen: Cypress.PluginConfig = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  if (config.env.CODEGEN !== false) {
    on('before:browser:launch', (browser, launchOptions) => {
      const filePaths = sync(`${COMMANDS_DIRECTORY}/**/*`, { nodir: true });

      filePaths.forEach(filePath => {
        const fileContentsWithTypes = generateTypesFromAbstractSyntaxTree(filePath);

        writeFileSync(resolve(filePath), fileContentsWithTypes);
      });

      return launchOptions;
    });
  }

  on('task', {
    importCustomCommands: () => {
      return sync(`${COMMANDS_DIRECTORY}/**/*`, { nodir: true });
    }
  });

  return config;
};
