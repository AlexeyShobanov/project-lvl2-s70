import yaml from 'js-yaml';

export default class YamlData {
  constructor(data) {
    this.data = data;
  }

  parse() {
    return yaml.safeLoad(this.data);
  }
}
