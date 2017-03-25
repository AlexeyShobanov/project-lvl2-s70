import yaml from 'js-yaml';
import ini from 'ini';

export default (extendFile) => {
  switch (extendFile) {
    case '.yml':
      return data => yaml.safeLoad(data);
    case '.json':
      return data => JSON.parse(data);
    case '.ini':
      return data => ini.parse(data);
    default:
      break;
  }
  return 1;
};
