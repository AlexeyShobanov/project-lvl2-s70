import fs from 'fs';
import yaml from 'js-yaml';

const readConfigFile = path => fs.readFileSync(path, 'utf8');

const parseJson = data => JSON.parse(data);

const parseYaml = data => yaml.safeLoad(data);

export { readConfigFile, parseJson, parseYaml };
