import assert from 'assert';
import _ from 'lodash';
import gendiff from '../src/';

const result = _.fromPairs([
  [' host', 'hexlet.io'],
  ['+ timeout', 20],
  ['- timeout', 50],
  ['- proxy', '123.234.53.22'],
  ['+ verbose', true],
]);

test('The difference between a couple of files json', () => {
  const pathToBeforJson = './__tests__/__fixtures__/before.json';
  const pathToAfterJson = './__tests__/__fixtures__/after.json';
  assert.deepEqual(gendiff(pathToBeforJson, pathToAfterJson), result);
});

test('The difference between a couple of files yaml', () => {
  const pathToBeforYaml = './__tests__/__fixtures__/before.yml';
  const pathToAfterYaml = './__tests__/__fixtures__/after.yml';
  assert.deepEqual(gendiff(pathToBeforYaml, pathToAfterYaml), result);
});

test('The difference between a couple of files ini', () => {
  const pathToBeforIni = './__tests__/__fixtures__/before.ini';
  const pathToAfterIni = './__tests__/__fixtures__/after.ini';
  assert.deepEqual(gendiff(pathToBeforIni, pathToAfterIni), result);
});
