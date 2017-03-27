import _ from 'lodash';

const getValue = (node) => {
  if (node.children.length === 0) {
    return node.value;
  }
  return _.reduce(node.children, (obj, item) => {
    const value = item.children.length !== 0 ? getValue(item.children) : item.value;
    const newAcc = { ...obj, [item.key]: value };
    // { ...obj, [item.key]: value };
    return newAcc;
  }, {});
};

const makeNodeJson = (node, acc, root) => {
  const newNode = { [node.key]: getValue(node) };
  if (root !== '') {
    if (!_.has(acc[node.type], root)) {
      return { ...acc, [node.type]: { ...acc[node.type], [root]: newNode } };
    }
    const newRootNode = { [root]: { ...acc[node.type][root], ...newNode } };
    const newTypeNode = { [node.type]: { ...acc[node.type], ...newRootNode } };
    return { ...acc, ...newTypeNode };
  }
  return { ...acc, [node.type]: { ...acc[node.type], ...newNode } };
};

const rendererJson = (ast, root = '') => {
  const result = _.reduce(ast, (acc, node) => {
    switch (node.type) {
      case 'removed':
      case 'added':
      case 'updated': {
        return makeNodeJson(node, acc, root);
      }
      default:
        if (node.children.length !== 0) {
          const childrenJson = rendererJson(node.children, node.key);
          const mrgRmv = { ...acc, removed: { ...acc.removed, ...childrenJson.removed } };
          const mrgRmvAdd = { ...mrgRmv, added: { ...acc.added, ...childrenJson.added } };
          const Result = { ...mrgRmvAdd, updated: { ...acc.updated, ...childrenJson.updated } };
          return Result;
        }
        return acc;
    }
  }, { removed: {}, added: {}, updated: {} });
  return result;
};

export default rendererJson;
