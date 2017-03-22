import fs from 'fs';
import _ from 'lodash';

const readConfigFile = path => fs.readFileSync(path, 'utf8');

const parseJson = data => JSON.parse(data);

const compareObj = (inputObj1, inputObj2) => {
  const comparedWithoutUniqObj2 = _.reduce(inputObj1, (acc, value, key) => {
    if (Object.prototype.hasOwnProperty.call(inputObj2, key)) {
      if (_.isEqual(value, inputObj2[key])) {
        const newKey = ` ${key}`;
        return Object.assign({}, acc, _.zipObject([newKey], [value]));
      }
      const plusKey = `+ ${key}`;
      const minusKey = `- ${key}`;
      return Object.assign({}, acc, _.zipObject([plusKey, minusKey], [inputObj2[key], value]));
    }
    const newKey = `- ${key}`;
    return Object.assign({}, acc, _.zipObject([newKey], [value]));
  }, {});
  const comparedUniqObj2 = _.reduce(inputObj2, (acc, value, key) => {
    if (Object.prototype.hasOwnProperty.call(inputObj1, key)) {
      return acc;
    }
    const newKey = `+ ${key}`;
    return Object.assign({}, acc, _.zipObject([newKey], [value]));
  }, {});
  return Object.assign({}, comparedWithoutUniqObj2, comparedUniqObj2);
};

export { readConfigFile, parseJson, compareObj };
