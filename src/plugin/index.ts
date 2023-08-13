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

import { globSync } from 'glob';
import { sep } from 'path';
import { Options as PrettierConfig } from 'prettier';
import { COMMANDS_DIRECTORY } from '../common';
import { codegen } from './codegen';

export type CypressCodegen = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
  prettierConfigOverride?: PrettierConfig
) => void;

export const cypressCodegen: CypressCodegen = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
  prettierConfigOverride?: PrettierConfig
) => {
  if (config.env.CODEGEN !== 'false') {
    on('before:browser:launch', async (browser, launchOptions) => {
      await codegen(prettierConfigOverride);

      return launchOptions;
    });
  }

  on('task', {
    importCustomCommands: () => {
      return {
        filePaths: globSync(`${COMMANDS_DIRECTORY}/**/*`, { nodir: true }),
        commandsDirectory: `cypress${sep}commands${sep}`
      };
    }
  });

  return config;
};
