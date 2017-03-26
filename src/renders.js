import _ from 'lodash';


const renderDefault = (ast, indent = 0) => {
  const stepOfIndets = indent + 3;
  const result = _.reduce(ast, (acc, node) => {
    const body = node.child.length === 0 ? node.value : renderDefault(node.child, (stepOfIndets));
    switch (node.stat) {
      case 'added':
        return acc.concat(`\n${_.pad('', stepOfIndets)}+ ${node.key}: ${body}`);
      case 'removed':
        return acc.concat(`\n${_.pad('', stepOfIndets)}- ${node.key}: ${node.child.length === 0 ? node.oldValue : renderDefault(node.child, (stepOfIndets))}`);
      case 'updated':
        return acc.concat(`\n${_.pad('', stepOfIndets)}+ ${node.key}: ${node.value}`, `\n${_.pad('', stepOfIndets)}- ${node.key}: ${node.oldValue}`);
      default:
        return acc.concat(`\n${_.pad('', stepOfIndets)}  ${node.key}: ${body}`);
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
        return acc.concat(`\nProperty ${root}${node.key} was ${node.stat}. From ${node.value} to ${node.oldValue}`);
      }
      default:
        return node.child.length === 0 ? acc : acc.concat(renderPlain(node.child, node.key));
    }
  }, '');
  return result;
};

const renderJson = (ast) => {
  const result = _.reduce(ast, (acc, node) => {
    const body = node.child.length === 0 ? node.value : node.child;
    switch (node.stat) {
      case 'removed': {
        return { ...acc, removed: Object.assign({}, acc.removed, { [node.key]: body }) };
      }
      case 'added': {
        return { ...acc, added: Object.assign({}, acc.added, { [node.key]: body }) };
      }
      case 'updated': {
        return { ...acc, updated: Object.assign({}, acc.updated, { [node.key]: body }) };
      }
      default:
        return acc;
    }
  }, { removed: {}, added: {}, updated: {} });
  return result;
};

export default (format) => {
  switch (format) {
    case 'default':
      return ast => renderDefault(ast);
    case 'plain':
      return ast => renderPlain(ast);
    case 'json':
      return ast => renderJson(ast);
    default:
      break;
  }
  return 1;
};
