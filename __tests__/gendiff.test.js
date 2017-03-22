import assert from 'assert';
import { readConfigFile, parseJson } from '../src/commonFile';
import gendiff from '../src/index';

const resultCompare = gendiff('./__tests__/before.json', './__tests__/after.json');
const originStrBench = readConfigFile('./__tests__/result.json');
const objBench = parseJson(originStrBench);
const originStrData1 = readConfigFile('./__tests__/before.json');
const originStrData2 = readConfigFile('./__tests__/after.json');

test(`The difference between\n${originStrData1}\nand\n${originStrData2}\nequal\n${originStrBench}`, () => {
  assert.deepEqual(resultCompare, objBench);
});
