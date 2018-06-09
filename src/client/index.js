import axios from 'axios';
import includes from 'lodash/includes';

import { Destination } from '@/client/destinations';
import { Job } from '@/client/jobs';
import { Profile } from '@/client/profiles';

export class Client {
  static testEndpoint(endpoint) {
    return axios.get('/health/', {
      baseURL: endpoint,
    });
  }

  static makeForEndpoint(endpoint) {
    if ( !this.endpointClients ) {
      this.endpointClients = {};
    }

    if ( includes(this.endpointClients, endpoint) ) {
      return this.endpointClients[endpoint];
    }

    let newClient = new Client(endpoint);
    this.endpointClients[endpoint] = newClient;

    return newClient;
  }

  constructor(url) {
    this.url = url;
    this.config = {
      baseURL: url,
    };
  }

  get endpointUrl() {
    return this.url;
  }

  get axiosInstance() {
    return axios.create(this.config);
  }

  get destinations() {
    return Destination.using(this.axiosInstance);
  }

  get jobs() {
    return Job.using(this.axiosInstance);
  }

  get profiles() {
    return Profile.using(this.axiosInstance);
  }
}