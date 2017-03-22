import assert from 'assert';
import { readConfigFile, parseJson, compareObj } from '../src/commonFile';

const originStrData1 = readConfigFile('/Users/alexey/projects/project-lvl2-s70/__tests__/before.json');
const originStrData2 = readConfigFile('/Users/alexey/projects/project-lvl2-s70/__tests__/after.json');
const objForCompare1 = parseJson(originStrData1);
const objForCompare2 = parseJson(originStrData2);
const resultCompare = compareObj(objForCompare1, objForCompare2);
const originStrBench = readConfigFile('/Users/alexey/projects/project-lvl2-s70/__tests__/result.json');
const objBench = parseJson(originStrBench);

test('', () => {});

test(`The difference between\n${originStrData1}\nand\n${originStrData1}\nequal\n${originStrBench}`, () => {
  assert.deepEqual(resultCompare, objBench);
});
