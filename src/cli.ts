#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { program } from 'commander';
import { codegen } from './codegen';

console.log(chalk.yellowBright('Generating custom command types...'));

program
  .option(
    '--prettier-config <prettier>',
    'A JSON-stringified prettier config object to use. Defaults to the prettier config in your project.'
  )
  .parse(process.argv);

const options = program.opts();
let prettierConfig;
if (options.prettierConfig) {
  try {
    prettierConfig = JSON.parse(options.prettierConfig);
  } catch (error) {
    console.error(chalk.red('The provided prettier config was invalid'));
    console.error(error);
    process.exit(1);
  }
}

codegen(prettierConfig);

console.log(chalk.bgGreen('Codegen complete!'));
