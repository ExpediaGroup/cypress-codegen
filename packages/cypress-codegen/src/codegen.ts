import { globSync } from 'glob';
import { resolveConfig } from 'prettier';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { appendCommandImports } from './append-command-imports';
import { generateExports } from './generate-exports';

export const codegen = async (config?: Cypress.ConfigOptions) => {
  const indexTsFile = 'cypress/commands/index.ts';
  const filePaths = globSync('cypress/commands/**/*', { nodir: true, ignore: indexTsFile });
  const prettierConfig = (await resolveConfig(process.cwd())) ?? {};

  const componentFilePath = config?.component?.supportFile || 'cypress/support/component.ts';
  const e2eFilePath = config?.e2e?.supportFile || 'cypress/support/e2e.ts';
  const commandsIndexPath = 'cypress/commands/index.ts';

  const exportFileContents = await generateExports(filePaths, prettierConfig);
  writeFileSync(resolve(commandsIndexPath), exportFileContents);

  return Promise.all([
    ...filePaths.map(async filePath => {
      const fileContentsWithTypes = await generateTypesFromAbstractSyntaxTree(
        filePath,
        prettierConfig
      );
      writeFileSync(resolve(filePath), fileContentsWithTypes);
    }),
    ...[componentFilePath, e2eFilePath].map(async path => {
      const fileContentsWithImports = await appendCommandImports(path, prettierConfig);
      writeFileSync(resolve(path), fileContentsWithImports);
    })
  ]);
};
