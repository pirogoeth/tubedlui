export default class Resource {
  client = null;

  static using(client) {
    this.client = client;
    return this;
  }
}