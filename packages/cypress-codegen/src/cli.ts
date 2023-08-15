#!/usr/bin/env node

/* eslint-disable no-console */
import * as chalk from 'chalk';
import { codegen } from './codegen';

console.log(chalk.yellowBright('Generating custom command types...'));

codegen()
  .then(() => {
    console.log(chalk.bgGreen('Codegen complete!'));
  })
  .catch(error => {
    console.error(chalk.bgRed('Codegen failed!'));
    console.error(error);
  });
