#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { program } from 'commander';
import { codegen } from './codegen';
import config from '../cypress.config';

console.log(chalk.yellowBright('Generating custom command types...'));

program.parse(process.argv);

codegen(config).then(() => {
  console.log(chalk.bgGreen('Codegen complete!'));
});
