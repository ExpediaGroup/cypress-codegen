import { globSync } from 'glob';
import { resolveConfig } from 'prettier';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { appendCommandImports } from './append-command-imports';

export const codegen = async (config: Cypress.ConfigOptions) => {
  const indexTsFile = 'cypress/commands/index.ts';
  const filePaths = globSync('cypress/commands/**/*', { nodir: true, ignore: indexTsFile });
  const prettierConfig = (await resolveConfig(process.cwd())) ?? {};

  const { component, e2e } = config;
  if (component?.supportFile === false || e2e?.supportFile === false) {
    throw new Error('The supportFile config option cannot be disabled when using cypress-codegen.');
  }
  const componentFilePath = resolve(component?.supportFile ?? 'cypress/support/component.ts');
  const e2eFilePath = resolve(e2e?.supportFile ?? 'cypress/support/e2e.ts');

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
      writeFileSync(path, fileContentsWithImports);
    })
  ]);
};
