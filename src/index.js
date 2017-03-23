// import path from 'path';
import { readConfigFile, parseJson, compareObj } from './commonFile';

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
