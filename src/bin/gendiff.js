#!/usr/bin/env node

import { parseCommandLine, readConfigFile, parseJson, compareObj } from '../commonFile';


const optionsAndArgs = parseCommandLine();
const pathFirstConfig = optionsAndArgs[0][0];
const pathSecondConfig = optionsAndArgs[0][1];
  // const format = optionsAndArgs[1];
const gendiff = (path1, path2) => {
  const originStrData1 = readConfigFile(path1);
  const originStrData2 = readConfigFile(path2);
  const objForCompare1 = parseJson(originStrData1);
  const objForCompare2 = parseJson(originStrData2);
  const resultCompare = compareObj(objForCompare1, objForCompare2);
  return resultCompare;
};

gendiff(pathFirstConfig, pathSecondConfig);

export default gendiff;
