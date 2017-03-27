import renderPlain from './renders/renderPlain';
import renderJson from './renders/renderJson';
import renderDefault from './renders/renderDefault';


export default {
  default: ast => renderDefault(ast),
  plain: ast => renderPlain(ast),
  json: ast => renderJson(ast),
};
