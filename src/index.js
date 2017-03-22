import { parseCommandLine, readConfigFile, parseJson, compareObj } from './commonFile';

export default () => {
  const optionsAndArgs = parseCommandLine();
  const pathFirstConfig = optionsAndArgs[0][0];
  const pathSecondConfig = optionsAndArgs[0][1];
  // const format = optionsAndArgs[1];
  const originStrData1 = readConfigFile(pathFirstConfig);
  const originStrData2 = readConfigFile(pathSecondConfig);
  const objForCompare1 = parseJson(originStrData1);
  const objForCompare2 = parseJson(originStrData2);
  const resultCompare = compareObj(objForCompare1, objForCompare2);
  return resultCompare;
};
