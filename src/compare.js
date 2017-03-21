import _ from 'lodash';

const compareObj = (inputObj1, inputObj2) => {
  const comparedWithoutUniqObj2 = _.reduce(inputObj1, (acc, value, key) => {
    if (_.includes(inputObj2, key)) {
      if (_.isEqual(value, inputObj2[key])) {
        const entry = {};
        const newKey = ` ${key}`;
        entry[newKey] = value;
        return Object.assign({}, acc, entry);
      }
      const entries = {};
      const plusKey = `-${key}`;
      const minusKey = `+${key}`;
      entries[minusKey] = inputObj2[key];
      entries[plusKey] = value;
      return Object.assign({}, acc, entries);
    }
    const entry = {};
    const newKey = `-${key}`;
    entry[newKey] = value;
    return Object.assign({}, acc, entry);
  }, {});
  const comparedUniqObj2 = _.reduce(inputObj2, (acc, value, key) => {
    if (_.includes(inputObj1, key)) {
      return acc;
    }
    const entry = {};
    const newKey = `+${key}`;
    entry[newKey] = value;
    return Object.assign({}, acc, entry);
  }, {});
  return Object.assign({}, comparedWithoutUniqObj2, comparedUniqObj2);
};

export default compareObj;
