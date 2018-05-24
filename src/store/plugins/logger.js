import { calculateNextState } from '../utils';

function uninstallLogger(store) {
  delete store.hooks.logActionError;
  delete store.hooks.logPluginUse;
  delete store.hooks.logStateChange;
  delete store.hooks.logStateMutate;
  delete store.hooks.logStateUpdate;
};

export const loggerStubsPlugin = {
  install(store) {
    console.log('installing stub logger');
    console.log(store.__hooks);
    store.hooks.logActionError = (fn, msg) => {};
    store.hooks.logPluginUse = (plugin) => {};
    store.hooks.logStateChange = (trigger, previousState, updateState, isUpdate = false) => {};
    store.hooks.logStateMutate = (trigger, previousState, nextState) => {};
    store.hooks.logStateUpdate = (trigger, previousState, updateState) => {};
    console.log(store.__hooks);
  },
  uninstall(store) {
    uninstallLogger(store);
  },
};

export const loggerPlugin = {
  install(store) {
    console.log(store.__hooks);
    console.log('uninstalling previous logger');
    uninstallLogger(store);
    console.log(store.__hooks);

    store.hooks.logActionError = (fn, msg) => {
      if ( !store.debug ) {
        return;
      }

      if ( store.noDebugColor ) {
        console.log(
          `could not run action function ${fn}: ${msg}`,
        );
      } else {
        console.log(
          `%ccould not run action function ${fn}: %c${msg}`,
          "color: #51e5ff",
          "color: #ec368d",
        );
      }
    };

    store.hooks.logPluginUse = (plugin) => {
      if ( !store.debug ) {
        return;
      }

      if ( store.noDebugColor ) {
        console.log(
          `store: now using plugin: ${plugin.name}`
        );
      } else {
        console.log(
          `%cstore: %cnow using plugin: %c${plugin.name}`,
          "color: #51e5ff",
          "color: #ffa5a5",
          "color: #b9d2b1",
        );
      }
    };

    store.hooks.logStateChange = (trigger, previousState, updateState, isUpdate = false) => {
      if ( !store.debug ) {
        return;
      }

      let actionName = trigger;
      if ( trigger.name !== undefined ) {
        actionName = trigger.name;
      }

      if ( isUpdate ) {
        this.logStateUpdate(actionName, previousState, updateState);
      } else {
        this.logStateMutate(actionName, previousState, updateState)
      }
    };

    store.hooks.logStateMutate = (trigger, previousState, nextState) => {
      if ( store.noDebugColor ) {
        console.log(
          `mutation: ${trigger}\n` +
          `prevState: ${JSON.stringify(previousState)}\n` +
          `nextState: ${JSON.stringify(nextState)}\n`,
        );
      } else {
        console.log(
          `%cmutation: %c${trigger}\n` +
          `%cprevState: %c${JSON.stringify(previousState)}\n` +
          `%cnextState: %c${JSON.stringify(nextState)}\n`,
          "color: #51e5ff",
          "color: #ffa5a5",
          "color: #ec368d",
          "color: #ffa5a5",
          "color: #b9d2b1",
          "color: #ffa5a5",
        );
      }
    };

    store.hooks.logStateUpdate = (trigger, previousState, updateState) => {
      let nextState = calculateNextState(updateState);

      if ( store.noDebugColor ) {
        console.log(
          `action: ${trigger}\n` +
          `prevState: ${JSON.stringify(previousState)}\n` +
          `update: ${JSON.stringify(updateState)}\n` +
          `nextState: ${JSON.stringify(nextState)}\n`,
        );
      } else {
        console.log(
          `%caction: %c${trigger}\n` +
          `%cprevState: %c${JSON.stringify(previousState)}\n` +
          `%cupdate: %c${JSON.stringify(updateState)}\n` +
          `%cnextState: %c${JSON.stringify(nextState)}\n`,
          "color: #51e5ff",
          "color: #ffa5a5",
          "color: #ec368d",
          "color: #ffa5a5",
          "color: #9cafb7",
          "color: #ffa5a5",
          "color: #b9d2b1",
          "color: #ffa5a5",
        );
      }
    };
  },
  uninstall(store) {
    uninstallLogger(store);
  },
};