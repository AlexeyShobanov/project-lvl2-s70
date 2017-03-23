import assert from 'assert';
import { readConfigFile, parseJson } from '../src/commonFile';
import gendiff from '../src/index';

test('The difference between a couple of files json', () => {
  const pathToBeforJson = './__tests__/__fixtures__/before.json';
  const pathToAfterJson = './__tests__/__fixtures__/after.json';
  const pathToResul = './__tests__/__fixtures__/result.json';
  const result = parseJson(readConfigFile(pathToResul));
  assert.deepEqual(gendiff(pathToBeforJson, pathToAfterJson), result);
});

/* test('The difference between a couple of files yaml', () => {
 assert.deepEqual
 (gendiff('./__tests__/__fixtures__/before.yml', './__tests__/__fixtures__/after.yml'),
 parseJson(readConfigFile('./__tests__/__fixtures__/result.json')));
 }); */
