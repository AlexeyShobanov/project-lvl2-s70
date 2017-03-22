import commander from 'commander';
import fs from 'fs';
import _ from 'lodash';

const parseCommandLine = () => {
  commander
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference')
  .arguments('<first_config> <second_config>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

  if (typeof commander.args[0] === 'undefined' && typeof commander.args[1] === 'undefined') {
    console.error('\n\tError: missing required options or arguments');
    commander.outputHelp();
    process.exit(1);
  } else if (typeof commander.args[1] === 'undefined') {
    console.error('\n\tError: missing required argument `second_config`');
    commander.outputHelp();
    process.exit(1);
  }
  return [commander.args, commander.format];
};

const readConfigFile = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  return data;
};

const parseJson = (data) => {
  const inputObj = JSON.parse(data);
  return inputObj;
};

const compareObj = (inputObj1, inputObj2) => {
  const comparedWithoutUniqObj2 = _.reduce(inputObj1, (acc, value, key) => {
    if (Object.prototype.hasOwnProperty.call(inputObj2, key)) {
      if (_.isEqual(value, inputObj2[key])) {
        const entry = {};
        const newKey = ` ${key}`;
        entry[newKey] = value;
        return Object.assign({}, acc, entry);
      }
      const entries = {};
      const plusKey = `+ ${key}`;
      const minusKey = `- ${key}`;
      entries[plusKey] = inputObj2[key];
      entries[minusKey] = value;
      return Object.assign({}, acc, entries);
    }
    const entry = {};
    const newKey = `- ${key}`;
    entry[newKey] = value;
    return Object.assign({}, acc, entry);
  }, {});
  const comparedUniqObj2 = _.reduce(inputObj2, (acc, value, key) => {
    if (Object.prototype.hasOwnProperty.call(inputObj1, key)) {
      return acc;
    }
    const entry = {};
    const newKey = `+ ${key}`;
    entry[newKey] = value;
    return Object.assign({}, acc, entry);
  }, {});
  return Object.assign({}, comparedWithoutUniqObj2, comparedUniqObj2);
};

export { parseCommandLine, readConfigFile, parseJson, compareObj };
