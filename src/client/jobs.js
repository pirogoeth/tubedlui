import filter from 'lodash/filter';
import axios from 'axios';

import Resource from '@/client/resource';

export class Job extends Resource {
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
    jobs = Job.list();
    return filter(jobs, (item) => (item.id === id));
  }

  static getByName(name) {
    jobs = Job.list();
    return filter(jobs, (item) => (item.name === name));
  }

  static create(name, url) {
    axios.post()
  }
}
