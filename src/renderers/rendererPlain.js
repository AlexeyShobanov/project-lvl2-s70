import _ from 'lodash';

const rendererPlain = (ast, root = '') => {
  const result = _.reduce(ast, (acc, node) => {
    switch (node.type) {
      case 'removed':
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat}`);
      case 'added': {
        const body = node.children.length === 0 ? `with value: ${node.value}` : 'with complex value';
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat} ${body}`);
      }
      case 'updated': {
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat}. From ${node.value} to ${node.oldValue}`);
      }
      default:
        return node.children.length === 0 ? acc : acc.concat(rendererPlain(node.children, `${node.key}.`));
    }
  }, '');
  return result;
};

export default rendererPlain;
