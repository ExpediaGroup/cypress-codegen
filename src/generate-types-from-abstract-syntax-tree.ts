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

import { parse } from '@babel/parser';
import type {
  AssignmentPattern,
  ExportNamedDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  Statement,
  VariableDeclaration
} from '@babel/types';
import * as t from '@babel/types';
import generate from '@babel/generator';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format, Options } from 'prettier';
import { isScopedMethod } from './common';

export const generateTypesFromAbstractSyntaxTree = (filePath: string, prettierConfig?: Options) => {
  const contents = readFileSync(resolve(filePath)).toString();
  const ast = parse(contents, { sourceType: 'module', plugins: ['typescript'] });
  const currentNodes = ast.program.body;
  const customCommands = currentNodes
    .filter(
      node =>
        t.isExportNamedDeclaration(node) &&
        (t.isFunctionDeclaration(node.declaration) || t.isVariableDeclaration(node.declaration))
    )
    .map((node: ExportNamedDeclaration) => {
      const declaration = node.declaration as FunctionDeclaration | VariableDeclaration;
      const isVariableDeclaration = t.isVariableDeclaration(declaration);
      const functionIdentifier = isVariableDeclaration
        ? (declaration.declarations[0].id as Identifier)
        : declaration.id;
      const functionParameters = isVariableDeclaration
        ? (declaration.declarations[0].init as FunctionExpression).params
        : declaration.params;
      const parameters = functionParameters.map(parameter => {
        if (t.isAssignmentPattern(parameter)) {
          return generateOptionalParameterFromInitializer(parameter);
        }
        return parameter as Identifier;
      });
      const firstParamOmitted = parameters.slice(1);
      return {
        functionIdentifier,
        parameters: isScopedMethod(functionIdentifier.name) ? firstParamOmitted : parameters
      };
    });
  const newInterface = generateInterface(customCommands);
  const lastNode = currentNodes[currentNodes.length - 1];
  const interfaceExists = t.isTSModuleDeclaration(lastNode) && lastNode.global && lastNode.declare;
  const newNodes = interfaceExists ? currentNodes.slice(0, currentNodes.length - 1) : currentNodes;
  const { code: existingCode } = generate(t.program(newNodes), { retainLines: true });
  const formattedExistingCode = format(existingCode, { parser: 'babel', ...prettierConfig });
  const { code: newCode } = generate(t.program(newInterface));
  return `${formattedExistingCode}\n${newCode}\n`;
};

interface CustomCommand {
  functionIdentifier: Identifier;
  parameters: Identifier[];
}

const generateOptionalParameterFromInitializer = ({ left }: AssignmentPattern): Identifier => ({
  ...(left as Identifier),
  type: 'Identifier',
  optional: true
});

const generateInterface = (customCommands: CustomCommand[]): Statement[] => {
  const interfaceNode = t.tsModuleDeclaration(
    t.identifier('global'),
    t.tsModuleBlock([
      t.tsModuleDeclaration(
        t.identifier('Cypress'),
        t.tsModuleBlock([
          t.tsInterfaceDeclaration(
            t.identifier('Chainable'),
            null,
            null,
            t.tsInterfaceBody(
              customCommands.map(({ functionIdentifier, parameters }) => {
                if (parameters.some(parameter => t.isObjectPattern(parameter))) {
                  throw new Error('Object destructuring in function parameters is not supported.');
                }
                return t.tsMethodSignature(
                  functionIdentifier,
                  null,
                  parameters,
                  t.tsTypeAnnotation(t.tsTypeReference(t.identifier('Chainable')))
                );
              })
            )
          )
        ])
      )
    ])
  );
  interfaceNode.declare = true;
  interfaceNode.global = true;

  return [interfaceNode];
};
