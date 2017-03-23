import fs from 'fs';
import yaml from 'js-yaml';

const readConfigFile = path => fs.readFileSync(path, 'utf8');

const parseJson = data => JSON.parse(data);

const parseYaml = data => yaml.safeLoad(data);

/* const parseYaml = (data) => {
  const dataAsStrKeyValue = _.split(_.trim(data), '\n');
  const dataAsPair = dataAsStrKeyValue.map((str) => {
    const [key, value] = _.split(str, ':');
    return [_.trim(key), _.trim(value)];
  });
  return _.fromPairs(dataAsPair);
}; */

export { readConfigFile, parseJson, parseYaml };
