import { sync } from 'glob';
import { COMMANDS_DIRECTORY } from './common';
import { resolveConfig, Options as PrettierConfig } from 'prettier';
import { generateTypesFromAbstractSyntaxTree } from './generate-types-from-abstract-syntax-tree';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export const codegen = (prettierConfigOverride?: PrettierConfig) => {
  const filePaths = sync(`${COMMANDS_DIRECTORY}/**/*`, { nodir: true });
  const prettierConfig = prettierConfigOverride ?? resolveConfig.sync(process.cwd()) ?? {};

  filePaths.forEach(filePath => {
    const fileContentsWithTypes = generateTypesFromAbstractSyntaxTree(filePath, prettierConfig);
    writeFileSync(resolve(filePath), fileContentsWithTypes);
  });
};
