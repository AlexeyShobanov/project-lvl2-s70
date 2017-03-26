#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../';

commander
.version('0.2.2')
.description('Compares two configuration files and shows a difference')
.option('-f, --format [type]', 'Output format')
.arguments('<first_config> <second_config>')
.action((pathFirstFile, pathSecondFile) => {
  console.log(gendiff(pathFirstFile, pathSecondFile, commander.format));
})
.parse(process.argv);
