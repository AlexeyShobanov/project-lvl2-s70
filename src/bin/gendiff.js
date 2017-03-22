#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../';

commander
.version('0.2.2')
.description('Compares two configuration files and shows a difference')
.arguments('<first_config> <second_config>')
.option('-f, --format [type]', 'Output format')
.parse(process.argv);

if (typeof commander.args[0] === 'undefined' && typeof commander.args[1] === 'undefined') {
  console.error('\n\tError: missing required options or arguments');
  commander.outputHelp();
  process.exit(1);
} else if (typeof commander.args[1] === 'undefined') {
  console.error('\n\tError: missing required argument `second_config`');
  commander.outputHelp();
  process.exit(1);
}

const pathFirstConfig = commander.args[0];
const pathSecondConfig = commander.args[1];

gendiff(pathFirstConfig, pathSecondConfig);
