import path from 'path';
import _ from 'lodash';
import JsonData from './JsonData';
import YamlData from './YamlData';
import { readConfigFile } from './commonFile';

const compareObj = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const resultPairArr = _.reduce(sumKeys, (acc, key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return acc.concat([[` ${key}`, inputObj1[key]]]);
      }
      return acc.concat([[`+ ${key}`, inputObj2[key]], [`- ${key}`, inputObj1[key]]]);
    } else if (_.has(inputObj1, key)) {
      return acc.concat([[`- ${key}`, inputObj1[key]]]);
    }
    return acc.concat([[`+ ${key}`, inputObj2[key]]]);
  }, []);
  return _.fromPairs(resultPairArr);
};

const createDataClass = (pathToFile) => {
  const originStrData = readConfigFile(pathToFile);
  const extendFile = path.extname(pathToFile);
  switch (extendFile) {
    case '.yml':
      return new YamlData(originStrData);
    case '.json':
      return new JsonData(originStrData);
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
  return compareObj(objForCompare1, objForCompare2);
};
