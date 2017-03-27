import rendererPlain from './renderers/rendererPlain';
import rendererJson from './renderers/rendererJson';
import rendererDefault from './renderers/rendererDefault';


const rendererType = {
  default: ast => rendererDefault(ast),
  plain: ast => rendererPlain(ast),
  json: ast => rendererJson(ast),
};

export default format => ast => rendererType[format](ast);
