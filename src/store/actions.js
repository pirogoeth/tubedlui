import filter from 'lodash/filter';

// All action functions are rebound by the StoreProxy at runtime.
// They will be executed in the context of the current state -- ie.,
// `this` refers to the current state object.

export default {
  getEndpointClient() {
    return this.endpointClient;
  },
  setEndpointClient(client) {
    this.endpointClient = client;
  },
  getEndpointHistory() {
    return this.endpointHistory;
  },
  updateEndpointHistory(source) {
    var endpoints = this.endpointHistory;

    let exists = filter(endpoints, (e) => (e.endpointUrl === source.endpointUrl));
    if (exists.length != 0) {
      return;
    }

    endpoints.unshift(source);

    this.endpointHistory = endpoints;
  },
  setNoDebugColor(status) {
    this.noDebugColor = status;
  },
};