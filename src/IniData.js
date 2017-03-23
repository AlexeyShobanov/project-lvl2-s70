import ini from 'ini';

export default class IniData {
  constructor(data) {
    this.data = data;
  }

  parse() {
    return ini.parse(this.data);
  }
}
