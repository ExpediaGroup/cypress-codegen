#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { program } from 'commander';
import { codegen } from './codegen';

console.log(chalk.yellowBright('Generating custom command types...'));

program.parse(process.argv);

codegen().then(() => {
  console.log(chalk.bgGreen('Codegen complete!'));
});
