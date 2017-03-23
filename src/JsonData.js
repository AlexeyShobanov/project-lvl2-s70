export default class JsonData {
  constructor(data) {
    this.data = data;
  }

  parse() {
    return JSON.parse(this.data);
  }
}
