import { globSync } from 'glob';
import { resolveConfig } from 'prettier';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export const codegen = async (commandsDirectory = 'cypress/commands') => {
  const filePaths = globSync(`${commandsDirectory}/**/*`, { nodir: true });
  const prettierConfig = (await resolveConfig(process.cwd())) ?? {};

  return Promise.all(
    filePaths.map(async filePath => {
      const fileContentsWithTypes = await generateTypesFromAbstractSyntaxTree(
        filePath,
        prettierConfig
      );
      writeFileSync(resolve(filePath), fileContentsWithTypes);
    })
  );
};
