#!/usr/bin/env node

import commander from 'commander';
import fs from 'fs';
import compare from '../compare';

let firstConfigPath;
let secondConfigPath;

commander
.version('0.0.2')
.description('Compares two configuration files and shows a difference')
.arguments('<first_config> <second_config>')
.action((first, second) => {
  firstConfigPath = first;
  secondConfigPath = second;
  if (typeof firstConfigPath === 'undefined' && typeof secondConfigPath === 'undefined') {
    console.error('No configuration files to compare!');
  } else if (typeof secondConfigPath === 'undefined') {
    console.error('No configuration file to compare!');
  }
})
.option('-f, --format [type]', 'Output format')
.parse(process.argv);

if (typeof firstConfigPath !== 'undefined' && typeof secondConfigPath !== 'undefined') {
  const data1 = fs.readFile(firstConfigPath, 'utf8');
  const data2 = fs.readFile(firstConfigPath, 'utf8');
  const inputObj1 = JSON.parse(data1);
  const inputObj2 = JSON.parse(data2);
  compare(inputObj1, inputObj2);
}
