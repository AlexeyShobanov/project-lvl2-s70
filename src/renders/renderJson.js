import _ from 'lodash';

const getValue = (node) => {
  if (node.children.length === 0) {
    return node.value;
  }
  return _.reduce(node.children, (obj, item) => {
    const value = _.has(item, 'children') && item.children.length !== 0 ? getValue(item.children) : item.value;
    const newAcc = _.merge(obj, { [item.key]: value });
    // { ...obj, [item.key]: value };
    return newAcc;
  }, {});
};

const makeNodeJson = (node, acc, root) => {
  const newNode = { [node.key]: getValue(node) };
  if (root !== '') {
    /* if (!_.has(acc[node.type], [root])) {
      return { ...acc, [node.type]: _.merge(acc[node.type], { [root]: newNode }) };
    } */
    return { ...acc, [node.type]: _.merge(acc[node.type], { [root]: newNode }) };
  }
  return { ...acc, [node.type]: _.merge(acc[node.type], newNode) };
};

const renderJson = (ast, root = '') => {
  const result = _.reduce(ast, (acc, node) => {
    switch (node.type) {
      case 'removed':
      case 'added':
      case 'updated': {
        return makeNodeJson(node, acc, root);
      }
      default:
        if (node.children.length !== 0) {
          const childrenJson = renderJson(node.children, node.key);
          return _.merge(acc, childrenJson);
        }
        return acc;
    }
  }, { removed: {}, added: {}, updated: {} });
  return result;
};

export default renderJson;
