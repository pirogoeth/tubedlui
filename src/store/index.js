import actions from './actions';
import { StateEmitter } from './emitter';
import { StoreProxy } from './proxy';
import { register as registerReactors } from './reactors';

const initialState = {
  debug: process.env.NODE_ENV === 'production' ? false : true,
  endpointClient: null,
  endpointHistory: null,
  noDebugColor: false,
};

export const cloneState = (state, ...merge) => {
  return Object.assign({}, state, ...merge);
};

export const store = new StoreProxy(actions, initialState, new StateEmitter());
export default {
  install(Vue, options) {
    Vue.prototype.$store = store;
  },
};

// This registers all reactors onto the global store's emitter
registerReactors(store);
