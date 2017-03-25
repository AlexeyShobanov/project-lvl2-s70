import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import getParser from './parsers';

const compareStr = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const result = _.reduce(sumKeys, (acc, key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return acc.concat(`  ${key}: ${inputObj1[key]}`);
      }
      return acc.concat(`+ ${key}: ${inputObj2[key]}`, `- ${key}: ${inputObj1[key]}`);
    } else if (_.has(inputObj1, key)) {
      return acc.concat(`- ${key}: ${inputObj1[key]}`);
    }
    return acc.concat(`+ ${key}: ${inputObj2[key]}`);
  }, []);
  return `{\n\t${_.join(result, '\n\t')}\n}`;
};

const readConfigFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export default (pathToFile1, pathToFile2) => {
  const originStrData1 = readConfigFile(pathToFile1);
  const originStrData2 = readConfigFile(pathToFile2);
  const objForCompare1 = getParser(path.extname(pathToFile1))(originStrData1);
  const objForCompare2 = getParser(path.extname(pathToFile2))(originStrData2);
  return compareStr(objForCompare1, objForCompare2);
  // return objForCompare1;
};
