import { globSync } from 'glob';
import { COMMANDS_DIRECTORY } from '../common';
import { resolveConfig, Options as PrettierConfig } from 'prettier';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export const codegen = async (prettierConfigOverride?: PrettierConfig) => {
  const filePaths = globSync(`${COMMANDS_DIRECTORY}/**/*`, { nodir: true });
  const prettierConfig = prettierConfigOverride ?? (await resolveConfig(process.cwd())) ?? {};

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
