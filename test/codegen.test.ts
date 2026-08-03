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

import { describe, expect, it, mock } from "bun:test";
import { resolve } from "path";

const resolveConfigMock = mock().mockResolvedValue({ singleQuote: true });
const actualPrettier = await import("prettier");
mock.module("prettier", () => ({
  ...actualPrettier,
  resolveConfig: resolveConfigMock,
}));

const globSyncMock = mock().mockReturnValue(["cypress/commands/foo.ts"]);
mock.module("glob", () => ({
  globSync: globSyncMock,
}));

const actualFs = await import("fs");
mock.module("fs", () => ({
  ...actualFs,
  readFileSync: mock().mockReturnValue("Cypress.Commands.add('foo', () => {});"),
  writeFileSync: mock(),
}));

const { codegen } = await import("../src/codegen");

describe("codegen", () => {
  it("resolves the prettier config from a file inside the project instead of the cwd directory", async () => {
    await codegen({ testingType: "e2e" });

    expect(resolveConfigMock).toHaveBeenCalledWith(
      resolve("cypress/commands/index.ts"),
    );
    expect(resolveConfigMock).not.toHaveBeenCalledWith(process.cwd());
  });
});
