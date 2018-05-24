import filter from 'lodash/filter';
import map from 'lodash/map';

import Resource from '@/client/resource';

export class Destination extends Resource {

  constructor(data) {
    super();

    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
  }

  static list() {
    return this.client.get('/destinations/')
      .then(response => {
        return map(response.data, (d) => new Destination(d));
      });
  }

  static getById(id) {
    return Destination.list()
      .then(destinations => {
        return filter(destinations, (item) => (item.id === id));
      });
  }

  static getByName(name) {
    return Destination.list()
      .then(destinations => {
        return filter(destinations, (item) => (item.name === name));
      });
  }

  static create(name, location) {
    return this.client.post('/destinations/', {
        name: name,
        url: location,
      })
      .then(response => {
        return new Destination(response.data.destination);
      });
  }

  delete() {

  }
}