#!/usr/bin/env node

import gendiff from '../';
import { parseCommandLine } from '../commonFile';


const optionsAndArgs = parseCommandLine();
const pathFirstConfig = optionsAndArgs[0][0];
const pathSecondConfig = optionsAndArgs[0][1];
  // const format = optionsAndArgs[1];

gendiff(pathFirstConfig, pathSecondConfig);

export default gendiff;
