import assert from 'assert';
import { readConfigFile, parseJson } from '../src/commonFile';
import gendiff from '../src/index';

const resultCompare = gendiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json');
let originStrBench = readConfigFile('./__tests__/__fixtures__/result.json');
const objBench = parseJson(originStrBench);
let originStrData1 = readConfigFile('./__tests__/__fixtures__/before.json');
let originStrData2 = readConfigFile('./__tests__/__fixtures__/after.json');

test(`The difference between\n${originStrData1}\nand\n${originStrData2}\nequal\n${originStrBench}`, () => {
  assert.deepEqual(resultCompare, objBench);
});
