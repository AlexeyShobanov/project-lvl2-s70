#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../';

commander
.version('0.2.2')
.description('Compares two configuration files and shows a difference')
.arguments('<first_config> <second_config>')
.action((pathFirstFile, pathSecondFile) => {
  console.log(gendiff(pathFirstFile, pathSecondFile));
})
.option('-f, --format [type]', 'Output format')
.parse(process.argv);
