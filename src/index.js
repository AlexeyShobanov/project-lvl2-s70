import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import getParser from './parsers';

const makeAstForCompare = (inputObj1, inputObj2) => {
  const sumKeys = _.union(_.keys(inputObj1), _.keys(inputObj2));
  const ast = _.reduce(sumKeys, (acc, key) => {
    if (_.has(inputObj1, key) && _.has(inputObj2, key)) {
      if (inputObj1[key] instanceof Object) {
        return [...acc, { stat: ' ', key, value: '', child: makeAstForCompare(inputObj1[key], inputObj2[key]) }];
      } else if (_.isEqual(inputObj1[key], inputObj2[key])) {
        return [...acc, { stat: ' ', key, value: inputObj1[key], child: [] }];
      }
      return [...acc, { stat: '+', key, value: inputObj2[key], child: [] }, { stat: '-', key, value: inputObj1[key], child: [] }];
    } else if (_.has(inputObj1, key)) {
      if (inputObj1[key] instanceof Object) {
        return [...acc, { stat: '-', key, value: '', child: makeAstForCompare(inputObj1[key], inputObj1[key]) }];
      }
      return [...acc, { stat: '-', key, value: inputObj1[key], child: [] }];
    }
    if (inputObj2[key] instanceof Object) {
      return [...acc, { stat: '+', key, value: '', child: makeAstForCompare(inputObj2[key], inputObj2[key]) }];
    }
    return [...acc, { stat: '+', key, value: inputObj2[key], child: [] }];
  }, []);
  return ast;
};

const compareStr = (ast) => {
  const result = _.reduce(ast, (acc, node) => {
    const body = node.child.length === 0 ? node.value : compareStr(node.child);
    return acc.concat(`\n  ${node.stat} ${node.key}: ${body}`);
  }, '');
  return `{${result}\n}`;
};

export const readConfigFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export default (pathToFile1, pathToFile2) => {
  const originStrData1 = readConfigFile(pathToFile1);
  const originStrData2 = readConfigFile(pathToFile2);
  const objForCompare1 = getParser(path.extname(pathToFile1))(originStrData1);
  const objForCompare2 = getParser(path.extname(pathToFile2))(originStrData2);
  // return compareStr(objForCompare1, objForCompare2);
  return compareStr(makeAstForCompare(objForCompare1, objForCompare2));
};
