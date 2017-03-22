import { readConfigFile, parseJson, compareObj } from './commonFile';

export default (path1, path2) => {
  const originStrData1 = readConfigFile(path1);
  const originStrData2 = readConfigFile(path2);
  const objForCompare1 = parseJson(originStrData1);
  const objForCompare2 = parseJson(originStrData2);
  const resultCompare = compareObj(objForCompare1, objForCompare2);
  return resultCompare;
};
