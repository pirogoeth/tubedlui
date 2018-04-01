import filter from 'lodash/filter';
import axios from 'axios';

import Resource from '@/client/resource';

export class Destination extends Resource {
  constructor(data) {
    super();

    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
  }

  static list() {
    return [];
  }

  static getById(id) {
    destinations = Destination.list();
    return filter(destinations, (item) => (item.id === id));
  }

  static getByName(name) {
    destinations = Destination.list();
    return filter(destinations, (item) => (item.name === name));
  }

  static create(name, location) {
    axios.post()
  }

  delete() {

  }
}