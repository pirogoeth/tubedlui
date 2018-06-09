import actions from './actions';
import storePlugins from './plugins';
import { StateEmitter } from './emitter';
import { StoreProxy } from './proxy';
import { register as registerReactors } from './reactors';
import { mappersForStore } from './_mapping';

const initialState = {
  debug: process.env.NODE_ENV === 'production' ? false : true,
  endpointClient: null,
  endpointHistory: null,
  noDebugColor: false,
  // state from client resources
  destinations: [],
  jobs: [],
  profiles: [],
};

export const store = new StoreProxy(actions, initialState, new StateEmitter());
export const plugins = storePlugins;
export const mappers = {
  ...mappersForStore(store),
};

export default {
  install(Vue, options) {
    Vue.mixin({
      beforeCreate() {
        this.$store = store;
      },
    });
  },
};

// This registers all reactors onto the global store's emitter
registerReactors(store);