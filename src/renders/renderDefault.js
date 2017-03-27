import _ from 'lodash';

const renderDefault = (ast, initialIndent = 0) => {
  const indent = initialIndent + 3;
  const result = _.reduce(ast, (acc, node) => {
    const body = node.children.length === 0 ? node.value : renderDefault(node.children, indent);
    switch (node.type) {
      case 'added':
        return acc.concat(`\n${_.pad('', indent)}+ ${node.key}: ${body}`);
      case 'removed':
        return acc.concat(`\n${_.pad('', indent)}- ${node.key}: ${body}`);
      case 'updated':
        return acc.concat(`\n${_.pad('', indent)}+ ${node.key}: ${node.value}`, `\n${_.pad('', indent)}- ${node.key}: ${node.oldValue}`);
      default:
        return acc.concat(`\n${_.pad('', indent)}  ${node.key}: ${body}`);
    }
  }, '');
  return `{${result}\n${_.pad('', initialIndent)}}`;
};

export default renderDefault;
