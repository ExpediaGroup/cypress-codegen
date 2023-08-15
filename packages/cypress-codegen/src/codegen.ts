import { globSync } from 'glob';
import { resolveConfig } from 'prettier';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { appendCommandImports } from './append-command-imports';
import { generateExports } from './generate-exports';

type Codegen = {
  component?: boolean;
  e2e?: boolean;
  componentSupportFile?: string;
  e2eSupportFile?: string;
};

export const codegen = async ({
  component,
  e2e,
  componentSupportFile = 'cypress/support/component.ts',
  e2eSupportFile = 'cypress/support/e2e.ts'
}: Codegen) => {
  const indexTsFile = 'cypress/commands/index.ts';
  const filePaths = globSync('cypress/commands/**/*', { nodir: true, ignore: indexTsFile });
  const prettierConfig = (await resolveConfig(process.cwd())) ?? {};

  const commandsIndexPath = 'cypress/commands/index.ts';

  const exportFileContents = await generateExports(filePaths, prettierConfig);
  writeFileSync(resolve(commandsIndexPath), exportFileContents);

  await Promise.all(
    filePaths.map(async filePath => {
      const fileContentsWithTypes = await generateTypesFromAbstractSyntaxTree(
        filePath,
        prettierConfig
      );
      writeFileSync(resolve(filePath), fileContentsWithTypes);
    })
  );

  const supportFiles = [component && componentSupportFile, e2e && e2eSupportFile].filter(Boolean);
  await Promise.all(
    supportFiles.map(async path => {
      const fileContentsWithImports = await appendCommandImports(path, prettierConfig);
      writeFileSync(resolve(path), fileContentsWithImports);
    })
  );
};
