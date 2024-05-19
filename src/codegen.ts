import { globSync } from "glob";
import { resolveConfig } from "prettier";
import { generateContentWithExports } from "./generate-content-with-exports";
import { generateContentsWithInterface } from "./generate-contents-with-interface";
import { generateContentWithImports } from "./generate-content-with-imports";
import { writeFileSync } from "fs";
import { resolve } from "path";

export const cypressCodegen = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on("before:browser:launch", async (browser, launchOptions) => {
    await codegen(config);

    return launchOptions;
  });

  return config;
};

export const codegen = async (config: Partial<Cypress.PluginConfigOptions>) => {
  const indexTsFile = "cypress/commands/index.ts";
  const filePaths = globSync("cypress/commands/**/*", {
    nodir: true,
    ignore: indexTsFile,
  });
  const prettierConfig = (await resolveConfig(process.cwd())) ?? {};

  const commandsIndexPath = "cypress/commands/index.ts";
  const exportFileContents = await generateContentWithExports(
    filePaths,
    prettierConfig,
  );
  writeFileSync(resolve(commandsIndexPath), exportFileContents);

  const supportFile =
    config.supportFile || `cypress/support/${config.testingType}.ts`;
  const fileContentsWithImports = await generateContentWithImports(
    supportFile,
    prettierConfig,
  );
  writeFileSync(resolve(supportFile), fileContentsWithImports);

  await Promise.all(
    filePaths.map(async (filePath) => {
      const fileContentsWithTypes = await generateContentsWithInterface(
        filePath,
        prettierConfig,
      );
      writeFileSync(resolve(filePath), fileContentsWithTypes);
    }),
  );
};
