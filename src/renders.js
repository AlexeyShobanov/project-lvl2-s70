import _ from 'lodash';


const renderDefault = (ast, indent = 0) => {
  const result = _.reduce(ast, (acc, node) => {
    const body = node.child.length === 0 ? node.value : renderDefault(node.child, (indent + 3));
    switch (node.stat) {
      case 'added':
        return acc.concat(`\n${_.pad('', indent + 3)}+ ${node.key}: ${body}`);
      case 'removed':
        return acc.concat(`\n${_.pad('', indent + 3)}- ${node.key}: ${body}`);
      case 'updated':
        return acc.concat(`\n${_.pad('', indent + 3)}+ ${node.key}: ${body[0]}`, `\n${_.pad('', indent + 3)}- ${node.key}: ${body[1]}`);
      default:
        return acc.concat(`\n${_.pad('', indent + 3)}  ${node.key}: ${body}`);
    }
  }, '');
  return `{${result}\n${_.pad('', indent)}}`;
};

const renderPlain = (ast, root = '') => {
  const result = _.reduce(ast, (acc, node) => {
    switch (node.stat) {
      case 'removed':
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat}`);
      case 'added': {
        const body = node.child.length === 0 ? `with value: ${node.value}` : 'with complex value';
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat} ${body}`);
      }
      case 'updated': {
        const body = node.child.length === 0 ? node.value : renderPlain(node.child, `${node.key}.`);
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat}. From ${body[0]} to ${body[1]}`);
      }
      default:
        return node.child.length === 0 ? acc : acc.concat(renderPlain(node.child, node.key));
    }
  }, '');
  return result;
};

export default (format) => {
  switch (format) {
    case 'default':
      return ast => renderDefault(ast);
    case 'plain':
      return ast => renderPlain(ast);
    default:
      break;
  }
  return 1;
};
