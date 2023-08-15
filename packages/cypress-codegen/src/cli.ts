#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { program } from 'commander';
import { codegen } from './codegen';

console.log(chalk.yellowBright('Generating custom command types...'));

program
  .option('--component', 'Runs cypress-codegen for component tests.')
  .option('--e2e', 'Runs cypress-codegen for e2e tests.')
  .option(
    '--componentSupportFile <file>',
    'Overrides the default Cypress support file for component tests.'
  )
  .option('--e2eSupportFile <file>', 'Overrides the default Cypress support file for e2e tests.')
  .parse(process.argv);

const { component, e2e, componentSupportFile, e2eSupportFile } = program.opts();

const inputs = !component && !e2e ? { component: true, e2e: true } : { component, e2e };

codegen({
  ...inputs,
  componentSupportFile,
  e2eSupportFile
})
  .then(() => {
    console.log(chalk.bgGreen('Codegen complete!'));
  })
  .catch(error => {
    console.error(chalk.bgRed('Codegen failed!'));
    console.error(error);
  });
