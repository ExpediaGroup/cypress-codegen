#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { program, Option } from 'commander';
import { codegen } from './codegen';

program
  .addOption(
    new Option('--testingType <testingType>', 'Overrides the default Cypress support file.')
      .choices(['component', 'e2e'])
      .default('e2e')
  )
  .parse(process.argv);

const { testingType } = program.opts();

console.log(chalk.yellowBright(`Generating custom command types for ${testingType} tests...`));

codegen({ testingType })
  .then(() => {
    console.log(chalk.bgGreen('Codegen complete!'));
  })
  .catch(error => {
    console.error(chalk.bgRed('Codegen failed!'));
    console.error(error);
  });
