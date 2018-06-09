import { cloneState } from './index';

export const register = (storeProxy) => {
  let emitter = storeProxy.emitter;

  // Load endpoint history from localStorage before calls that read or modify it
  emitter.before('getEndpointHistory', (store, prevState) => {
    if ( !prevState.endpointHistory ) {
      let mutation = Object.assign({}, prevState, {
        endpointHistory: JSON.parse(localStorage.getItem('endpoints')) || [],
      });

      store.mutate(mutation, 'getEndpointHistory:load:localStorage');
    }
  });

  emitter.before('updateEndpointHistory', (store, prevState) => {
    if ( !prevState.endpointHistory ) {
      let mutation = Object.assign({}, prevState, {
        endpointHistory: JSON.parse(localStorage.getItem('endpoints')) || [],
      });

      store.mutate(mutation, 'updateEndpointHistory:load:localStorage');
    }
  });

  emitter.after('updateEndpointHistory', (store, nextState) => {
    let history = nextState.endpointHistory || [];
    localStorage.setItem('endpoints', JSON.stringify(history));
  });
};