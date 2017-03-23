import assert from 'assert';
import { readConfigFile, parseJson } from '../src/commonFile';
import gendiff from '../src/index';

test('The difference between a couple of files json', () => {
  assert.deepEqual(gendiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json'), parseJson(readConfigFile('./__tests__/__fixtures__/result.json')));
});

/* test('The difference between a couple of files yaml', () => {
 assert.deepEqual
 (gendiff('./__tests__/__fixtures__/before.yml', './__tests__/__fixtures__/after.yml'),
 parseJson(readConfigFile('./__tests__/__fixtures__/result.json')));
 }); */
