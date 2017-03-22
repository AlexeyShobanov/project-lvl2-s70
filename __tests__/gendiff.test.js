import assert from 'assert';
import { readConfigFile, parseJson, compareObj } from '../src/commonFile';

const originStrData1 = readConfigFile('./before.json');
const originStrData2 = readConfigFile('./after.json');
const objForCompare1 = parseJson(originStrData1);
const objForCompare2 = parseJson(originStrData2);
const resultCompare = compareObj(objForCompare1, objForCompare2);
const originStrBench = readConfigFile('./result.json');
const objBench = parseJson(originStrBench);

test(`The difference between\n${originStrData1}\nand\n${originStrData2}\nequal\n${originStrBench}`, () => {
  assert.deepEqual(resultCompare, objBench);
});

/* const originStrBench = readConfigFile('./result.json');
const objBench = parseJson(originStrBench);
const resultCompare = gendiff('before.json', 'after.json');
const originStrData1 = readConfigFile('./before.json');
const originStrData2 = readConfigFile('./after.json'); */
