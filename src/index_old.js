/* import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import JsonData from './JsonData';
import YamlData from './YamlData';
import IniData from './IniData';

 const compareStr = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const result = _.reduce(sumKeys, (acc, key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (inputObj1[key] instanceof Object) {
        return acc.concat(`  ${key}: ${compareStr(inputObj1[key], inputObj2[key])}`);
      } else if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return acc.concat(`  ${key}: ${inputObj1[key]}`);
      }
      return acc.concat(`+ ${key}: ${JSON.stringify(inputObj2[key], null, ' ')}`,
      `- ${key}: ${JSON.stringify(inputObj1[key], null, ' ')}`);
    } else if (_.has(inputObj1, key)) {
      const str = JSON.stringify(inputObj1[key], null, ' ');
      return acc.concat(`- ${key}: ${str}`);
    }
    return acc.concat(`+ ${key}: ${JSON.stringify(inputObj2[key], null, ' ')}`);
  }, []);
  return `{\n\t${_.join(result, '\n\t')}\n}`;
};

const compareStr = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const valueStr = (value) => {
    const str = !(value instanceof Object) ? `${value}` : compareStr(value, value);
    return str;
  };
  const result = _.reduce(sumKeys, (acc, key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (inputObj1[key] instanceof Object) {
        return acc.concat(`  ${key}: ${compareStr(inputObj1[key], inputObj2[key])}`);
      } else if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return acc.concat(`  ${key}: ${inputObj1[key]}`);
      }
      return acc.concat(`+ ${key}: ${valueStr(inputObj2[key])}`,
      `- ${key}: ${valueStr(inputObj1[key])}`);
    } else if (_.has(inputObj1, key)) {
      return acc.concat(`- ${key}: ${valueStr(inputObj1[key])}`);
    }
    return acc.concat(`+ ${key}: ${valueStr(inputObj2[key])}`);
  }, []);
  return `{\n\t${_.join(result, '\n\t')}\n}`;
};

const readConfigFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

const createDataClass = (pathToFile) => {
  const originStrData = readConfigFile(pathToFile);
  const extendFile = path.extname(pathToFile);
  switch (extendFile) {
    case '.yml':
      return new YamlData(originStrData);
    case '.json':
      return new JsonData(originStrData);
    case '.ini':
      return new IniData(originStrData);
    default:
      break;
  }
  return 1;
};

export default (pathToFile1, pathToFile2) => {
  const data1 = createDataClass(pathToFile1);
  const data2 = createDataClass(pathToFile2);
  const objForCompare1 = data1.parse();
  const objForCompare2 = data2.parse();
  return compareStr(objForCompare1, objForCompare2);
  // return objForCompare1;
}; */
