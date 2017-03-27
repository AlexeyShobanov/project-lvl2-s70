import yaml from 'js-yaml';
import ini from 'ini';

export default {
  '.yml': data => yaml.safeLoad(data),
  '.json': data => JSON.parse(data),
  '.ini': data => ini.parse(data),
};
