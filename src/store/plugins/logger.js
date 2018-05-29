import { calculateNextState } from '@/store/utils';

function installLogger(store, actionError, pluginUse, stateChange, stateMutate, stateUpdate) {
  store.hooks.logActionError = actionError;
  store.hooks.logPluginUse = pluginUse;
  store.hooks.logStateChange = stateChange;
  store.hooks.logStateMutate = stateMutate;
  store.hooks.logStateUpdate = stateUpdate;
};

function uninstallLogger(store) {
  delete store.hooks.logActionError;
  delete store.hooks.logPluginUse;
  delete store.hooks.logStateChange;
  delete store.hooks.logStateMutate;
  delete store.hooks.logStateUpdate;
};

export const loggerStubsPlugin = {
  name: 'loggerStubs',
  install(store) {
    let logActionError = (fn, msg) => {};
    let logPluginUse = (plugin) => {};
    let logStateChange = (trigger, previousState, updateState, isUpdate = false) => {};
    let logStateMutate = (trigger, previousState, nextState) => {};
    let logStateUpdate = (trigger, previousState, updateState) => {};

    installLogger(
      store,
      logActionError,
      logPluginUse,
      logStateChange,
      logStateMutate,
      logStateUpdate,
    );
  },
  uninstall(store) {
    uninstallLogger(store);
  },
};

export const loggerPlugin = {
  name: 'logger',
  install(store) {
    uninstallLogger(store);

    let logActionError = (fn, msg) => {
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

    let logPluginUse = (plugin) => {
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

    let logStateMutate = (trigger, previousState, nextState) => {
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

    let logStateUpdate = (trigger, previousState, updateState) => {
      let nextState = calculateNextState(previousState, updateState);

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

    let logStateChange = (trigger, previousState, updateState, isUpdate = false) => {
      if ( !store.debug ) {
        return;
      }

      let actionName = trigger;
      if ( trigger.name !== undefined ) {
        actionName = trigger.name;
      }

      if ( isUpdate ) {
        logStateUpdate(actionName, previousState, updateState);
      } else {
        logStateMutate(actionName, previousState, updateState)
      }
    };

    installLogger(
      store,
      logActionError,
      logPluginUse,
      logStateChange,
      logStateMutate,
      logStateUpdate,
    );
  },
  uninstall(store) {
    uninstallLogger(store);
  },
};