#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { program } from 'commander';
import { codegen } from './codegen';

console.log(chalk.yellowBright('Generating custom command types...'));

program
  .option('--testingType', 'Overrides the default Cypress support file.', 'e2e')
  .parse(process.argv);

const { testingType } = program.opts();

codegen({ testingType })
  .then(() => {
    console.log(chalk.bgGreen('Codegen complete!'));
  })
  .catch(error => {
    console.error(chalk.bgRed('Codegen failed!'));
    console.error(error);
  });
