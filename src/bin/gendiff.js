#!/usr/bin/env node

import commander from 'commander';

commander
.version('0.0.2')
.description('Compares two configuration files and shows a difference')
.arguments('<first_config> <second_config>')
.option('-f, --format [type]', 'Output format')
.parse(process.argv);
