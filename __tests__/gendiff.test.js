import { gendiffAsObj } from '../src/';

const result = {};
result[' host'] = 'hexlet.io';
result['+ timeout'] = 20;
result['- timeout'] = 50;
result['- proxy'] = '123.234.53.22';
result['+ verbose'] = true;

test('The difference between a couple of files json', () => {
  const pathToBeforJson = './__tests__/__fixtures__/before.json';
  const pathToAfterJson = './__tests__/__fixtures__/after.json';
  expect(gendiffAsObj(pathToBeforJson, pathToAfterJson)).toEqual(result);
});

test('The difference between a couple of files yaml', () => {
  const pathToBeforYaml = './__tests__/__fixtures__/before.yml';
  const pathToAfterYaml = './__tests__/__fixtures__/after.yml';
  expect(gendiffAsObj(pathToBeforYaml, pathToAfterYaml)).toEqual(result);
});

/* test('The difference between a couple of files ini', () => {
  const pathToBeforIni = './__tests__/__fixtures__/before.ini';
  const pathToAfterIni = './__tests__/__fixtures__/after.ini';
  expect(gendiff(pathToBeforIni, pathToAfterIni)).toEqual(result);
}); */
