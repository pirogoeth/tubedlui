import filter from 'lodash/filter';
import axios from 'axios';

import Resource from '@/client/resource';

export class Profile extends Resource {
  constructor(data) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static list() {
    return [];
  }

  static getById(id) {
    profiles = Profile.list();
    return filter(profiles, (item) => (item.id === id));
  }

  static getByName(name) {
    profiles = Profile.list();
    return filter(profiles, (item) => (item.name === name));
  }

  static create(name, data) {
    axios.post()
  }

  delete() {

  }
}
