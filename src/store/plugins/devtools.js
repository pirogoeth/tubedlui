// hijacked from vuex :)

import remove from 'lodash/remove';

const devtools = typeof window !== undefined && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

const emitVuexMutation = (store, nextState, metadata) => {
  devtools.emit('vuex:mutation', {
    type: metadata.type,
    payload: nextState,
  }, nextState);
};

const mutateStore = (targetState) => {
  store.mutate(targetState, 'vuex:travel-to-state');
};

export const devtoolsPlugin = {
  name: 'vuexDevtools',
  install(store) {
    if ( !devtools ) {
      return;
    }

    store.__devtools = devtools;

    devtools.emit('vuex:init', store);
    devtools.on('vuex:travel-to-state', mutateStore);
    store.emitter.afterAny(emitVuexMutation);
  },
  uninstall(store) {
    devtools.off('vuex:travel-to-state', mutateStore);
    delete store.__devtools;
    remove(
      store.emitter.__after_any,
      (value, index, array) => value === emitVuexMutation,
    );
  },
};