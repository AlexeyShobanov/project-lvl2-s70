// import path from 'path';
import _ from 'lodash';
import { readConfigFile, parseJson } from './commonFile';

const compareObj = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const resultPairArr = _.reduce(sumKeys, (acc, key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return _.concat(acc, [[` ${key}`, inputObj1[key]]]);
      }
      return _.concat(acc, [[`+ ${key}`, inputObj2[key]], [`- ${key}`, inputObj1[key]]]);
    } else if (_.has(inputObj1, key)) {
      return _.concat(acc, [[`- ${key}`, inputObj1[key]]]);
    }
    return _.concat(acc, [[`+ ${key}`, inputObj2[key]]]);
  }, []);
  return _.fromPairs(resultPairArr);
};

export default (path1, path2) => {
  const originStrData1 = readConfigFile(path1);
  const originStrData2 = readConfigFile(path2);
  // if (path.extname(path1) === '.json' && path.extname(path2) === '.json')
  const objForCompare1 = parseJson(originStrData1);
  const objForCompare2 = parseJson(originStrData2);
  // const objForCompare1 = parseYaml(originStrData1);
  // const objForCompare2 = parseYaml(originStrData2);
  return compareObj(objForCompare1, objForCompare2);
};
