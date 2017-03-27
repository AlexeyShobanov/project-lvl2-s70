import yaml from 'js-yaml';
import ini from 'ini';

const parserType = {
  '.yml': data => yaml.safeLoad(data),
  '.json': data => JSON.parse(data),
  '.ini': data => ini.parse(data),
};

export default extendFile => data => parserType[extendFile](data);
