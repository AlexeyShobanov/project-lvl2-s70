import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import getParser from './parsers';
import getRender from './renders';

const makeAstForCompare = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const ast = _.map(sumKeys, (key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (inputObj1[key] instanceof Object) {
        return { type: 'unchanged', key, value: '', oldValue: '', children: makeAstForCompare(inputObj1[key], inputObj2[key]) };
      } else if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return { type: 'unchanged', key, value: inputObj1[key], oldValue: '', children: [] };
      }
      return { type: 'updated', key, value: inputObj2[key], oldValue: inputObj1[key], children: [] };
    } else if (_.has(inputObj1, key)) {
      if (inputObj1[key] instanceof Object) {
        return { type: 'removed', key, value: '', oldValue: '', children: makeAstForCompare(inputObj1[key], inputObj1[key]) };
      }
      return { type: 'removed', key, value: inputObj1[key], oldValue: '', children: [] };
    }
    if (inputObj2[key] instanceof Object) {
      return { type: 'added', key, value: '', oldValue: '', children: makeAstForCompare(inputObj2[key], inputObj2[key]) };
    }
    return { type: 'added', key, value: inputObj2[key], oldValue: '', children: [] };
  });
  return ast;
};

export const readConfigFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export default (pathToFile1, pathToFile2, format = 'default') => {
  const originStrData1 = readConfigFile(pathToFile1);
  const originStrData2 = readConfigFile(pathToFile2);
  const objForCompare1 = getParser[path.extname(pathToFile1)](originStrData1);
  const objForCompare2 = getParser[path.extname(pathToFile2)](originStrData2);
  return getRender[format](makeAstForCompare(objForCompare1, objForCompare2));
};
